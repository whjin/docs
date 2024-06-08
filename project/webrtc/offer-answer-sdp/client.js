const localVideo = document.querySelector("video#localvideo");
const remoteVideo = document.querySelector("video#remotevideo");

const btnStart = document.querySelector("button#start");
const btnCall = document.querySelector("button#call");
const btnHangup = document.querySelector("button#hangup");

const offerSdp = document.querySelector("textarea#offer");
const answerSdp = document.querySelector("textarea#answer");

btnStart.onclick = start;
btnCall.onclick = call;
btnHangup.onclick = hangup;

let localStream;
let pc1;
let pc2;

function start() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Your browser is not support method getUserMedia!");
  }
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      localVideo.srcObject = stream;
      localStream = stream;
    })
    .catch((err) => {
      console.error("Falied to get media stream:", err);
    });

  btnStart.disabled = true;
  btnCall.disabled = false;
  btnHangup.disabled = true;
}

function call() {
  pc1 = new RTCPeerConnection();
  pc2 = new RTCPeerConnection();

  pc1.onicecandidate = (e) => {
    pc2.addIceCandidate(e.candidate);
  };
  pc2.onicecandidate = (e) => {
    pc1.addIceCandidate(e.candidate);
  };

  pc2.ontrack = (e) => {
    remoteVideo.srcObject = e.streams[0];
  };
  localStream.getTracks().forEach((track) => {
    pc1.addTrack(track, localStream);
  });

  pc1
    .createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: true,
    })
    .then((offer) => {
      pc1.setLocalDescription(offer);
      offerSdp.value = offer.sdp;
      pc2.setRemoteDescription(offer);
      pc2
        .createAnswer()
        .then((answer) => {
          pc2.setLocalDescription(answer);
          answerSdp.value = answer.sdp;
          pc1.setRemoteDescription(answer);
        })
        .catch((err) => {
          console.error("Failed to create answer:", err);
        });
    })
    .catch((err) => {
      console.error("Failed to create offer:", err);
    });

  btnStart.disabled = true;
  btnCall.disabled = true;
  btnHangup.disabled = false;
}

function hangup() {
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  });

  localVideo.srcObject = null;
  remoteVideo.srcObject = null;

  btnStart.disabled = false;
  btnCall.disabled = true;
  btnHangup.disabled = true;
}
