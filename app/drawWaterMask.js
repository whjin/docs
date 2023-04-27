function setCard (userInfo) {
  let can = document.createElement('canvas');
  can.width = document.documentElement.clientWidth - 100;
  can.height = 140;

  let cans = can.getContext('2d');
  cans.beginPath();
  cans.rotate(-10 * Math.PI / 180);
  cans.font = '18px Arial';
  cans.fillStyle = '#b9b9b9';
  cans.setFillStyle = "#b9b9b9";
  cans.fillText(userInfo.Name, 50, 50);
  cans.fillText(userInfo.WWID, 50, 80);
  cans.fillText("内部使用，不得外传", 50, 110);
  cans.fill();
  // cans.closePath();
  let div = document.createElement('div');
  div.style.pointerEvents = 'none';
  div.style.top = '30px';
  div.style.left = '0px';
  div.style.position = 'fixed';
  div.style.zIndex = '499';
  div.style.textAlign = 'center';
  div.style.width = document.documentElement.clientWidth - 100 + 'px';
  div.style.height = document.documentElement.clientHeight - 100 + 'px';
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  div.style.opacity = '.5';
  document.body.appendChild(div);
}