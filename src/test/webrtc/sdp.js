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
