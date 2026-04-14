### 一、自适应码率调整（`ABR`）：根据网络状况动态调整编码码率

**核心思路：** 通过 `WebRTC` 的 `getStats()` `API` 实时获取网络状态（丢包率、`RTT`、可用带宽等），动态调整视频编码器的输出码率，避免因网络拥塞导致的卡顿。

1. **实现步骤**
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
