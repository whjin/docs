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
