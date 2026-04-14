### 一、自适应码率调整（`ABR`）：根据网络状况动态调整编码码率

**核心思路：** 通过 `WebRTC` 的 `getStats()` `API` 实时获取网络状态（丢包率、`RTT`、可用带宽等），动态调整视频编码器的输出码率，避免因网络拥塞导致的卡顿。

**实现步骤**

- **步骤1：定时获取网络统计数据**  
  通过 `RTCPeerConnection.getStats()` 定时采集发送端（或接收端）的网络指标，重点关注：
  - `packetLost`：丢包数
  - `roundTripTime`：往返时间（`RTT`）
  - `availableOutgotingBitrate`：可用发送带宽（仅发送端）
- **步骤2：分析网络状况，决策码率调整策略**  
  根据丢包率、`RTT`等指标判断网络拥塞程度
  - 轻度拥塞（丢包率 < 5%`，RTT` < 200ms）：适当提高码率，提升画质
  - 中度拥塞（丢包率 5% ~ 15%，`RTT` 200 ~ 500ms）：保持当前码率，或小幅降低
  - 重度拥塞（丢包率 > 15%，`RTT` > 500ms）：大幅降低码率，优先保障保流畅度
- **步骤3：动态修改视频编码器码率**  
  通过 `MediaStreamTrack.applyConstraints()` 实时调整视频轨道的编码参数（如 `maxBitrate`、`minBitrate`）

```javascript
let pc = new RTCPeerConnection();
// 获取视频发送器
let videoSender = pc.getSenders().find((s) => s.track?.kind === 'video');
let lastBritrate = 1000000; // 初始码率 1Mbps
const MIN_BITRATE = 300000; // 最低码率 300kbps
const MAX_BITRATE = 2500000; // 最高码率 2.5Mbps

setInterval(setBitRate, 2000);

async function setBitRate() {
  if (!videoSender) return;

  // 获取发送端统计数据
  const states = await pc.getStats(videoSender);
  let packetsLost = 0;
  let roundTripTime = 0;
  let availableBitrate = 0;

  states.forEach((report) => {
    // 提取视频发送统计（类型为 outbound-rtp）
    if (report.type === 'outbound-rtp' && report.kind === 'video') {
      packetsLost = report.packetsLost || 0;
      // 计算丢包率
      const totalPackets = report.packetsSent || 1;
      const lossRate = (packetsLost / totalPackets) * 100;
    } else if (report.type === 'transport') {
      roundTripTime = report.currentRoundTripTime * 1000;
      availableBitrate = report.availableOutgoingBitrate || 0;
    }
  });

  // 根据网络状况调整码率
  let newBitrate = lastBritrate;
  if (lossRate > 15 || roundTripTime > 500) {
    // 重度拥塞：降码率 30%
    newBitrate = Math.max(lastBritrate * 0.7, MIN_BITRATE);
  } else if (
    lossRate < 3 &&
    roundTripTime < 150 &&
    availableBitrate > lastBritrate
  ) {
    // 网络良好：升码率 10%
    newBitrate = Math.min(lastBritrate * 1.1, MAX_BITRATE);
  }

  // 应用新码率到视频编码器
  if (Math.abs(newBitrate - lastBritrate) > 50000) {
    // 避免频繁调整（差异 > 50kbps 才调整）
    try {
      await videoSender.track.applyConstraints({
        advanced: [
          {
            maxBitrate: newBitrate,
            minBitrate: Math.max(newBitrate * 0.5, MIN_BITRATE),
          },
        ],
      });

      lastBritrate = newBitrate;
    } catch (error) {
      console.error('码率调整失败:', error);
    }
  }
}
```

### 二、丢包重传（`NACK/ARQ`）：通过 `RTCP` 反馈请求重传丢失包

**核心思路**：利用 `WebRTC` 内置的 `NACK(Negative Acknowledgement)` 机制，接收端检测到丢包后，通过 `RTCP` 反馈包向发送端请求重传；同时可结合 `FEC` **（前向纠错）** 进一步提升抗丢包能力。

**实现步骤**

- **步骤1：在 `SDP` 中启用 `NACK` 和 `FEC`**
  在创建 `Offer/Answer` 时，通过修改 `SDP` 配置，明确声明支持 `NACK` （丢包重传）和 `FEC` （前向纠错）。
- **步骤2：（可选）配置重传缓冲区大小**
  调整发送端的重传缓冲器（`rtx`），保留更多已发送的包以便重传。
- **步骤3：结合自适应码率**
  丢包严重时，除了重传，还需配合降低码率，避免网络进一步拥塞。

```javascript
let pc = new RTCPeerConnection();

// 1. 创建 Offer 后修改 SDP，启用 NACK 和 FEC
async function createAndSetOffer() {
  const offer = await pc.createOffer();

  // 修改SDP，为视频媒体流添加 NACK、PLI（关键帧请求）和 FEC 支持
  let modifiedSdp = offer.sdp.replace(
    /a=rtmpap:(\d+) H264\/\d+/g,
    (match, pt) => {
      // 原 H264 映射行后添加 NACK、PLI、FEC 配置
      return `${match}\r\na=rtcp-fb:${pt} 
      nack\r\na=rtcp-fb:${pt} 
      nack pli\r\na=rtcp-fb:${pt} 
      goog-remb\r\na=fmtp:${pt} 
      packetization-mode=1;profile-level-id=42e01f;
      level-asymmetry-allowed=1`;
    },
  );

  // 启用 RTX （重传流）
  modifiedSdp = modifiedSdp.replace(
    /a=fmtp:(\d+) rtx\/\d+/g,
    (match, rtxPt) => {
      return `${match}\r\na=fmtp:${rtxPt} apt=96`; // 假设 H264 的 PT 为 96，需根据实际情况调整
    },
  );

  await pc.setLocalDescription(
    new RTCSessionDescription({ type: 'offer', sdp: modifiedSdp }),
  );
}

// 2. 监听 ICE 连接状态，确保连接建立后 NACK 生效
pc.oniceconnectionstatechange = () => {
  if (pc.iceConnectionState === 'connected') {
    console.log('ICE 连接已建立，NACK/FEC 机制已生效');
  }
};

// 3. （可选）通过 getStates 监控丢包和重传情况
setInterval(async () => {
  const stats = await pc.getStats();
  stats.forEach((report) => {
    if (report.type === 'outbound-rtp' && report.kind === 'video') {
      console.log(
        `接收端丢包：${report.packetsLost}，重传接收：${report.retransmittedPacketsReceived}`,
      );
    }
  });
}, 3000);
```

> 平滑码率调整：避免码率骤升骤降，可通过 “渐进式调整”（每次调整幅度不超过 20%）减少画质波动。
> 结合分辨率调整：重度拥塞时，除了降码率，还可降低视频分辨率（如从 1080p 降到 720p），进一步减少带宽压力。
> 使用 WebRTC 内置拥塞控制：现代浏览器已支持 goog-remb（Receiver Estimated Maximum Bitrate）和 transport-cc（Transport-wide Congestion Control），建议在 SDP 中启用，利用浏览器原生能力优化。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 平滑码率调整：避免码率骤升骤降，可通过 “渐进式调整”（每次调整幅度不超过 20%）减少画质波动。
> 结合分辨率调整：重度拥塞时，除了降码率，还可降低视频分辨率（如从 1080p 降到 720p），进一步减少带宽压力。
> 使用 WebRTC 内置拥塞控制：现代浏览器已支持 goog-remb（Receiver Estimated Maximum Bitrate）和 transport-cc（Transport-wide Congestion Control），建议在 SDP 中启用，利用浏览器原生能力优化。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
> 通过以上方案，可显著提升弱网环境下 WebRTC 音视频通话的稳定性，实现 “流畅优先、画质为辅” 的自适应体验。
