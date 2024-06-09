const imageList = [
  "https://img.picgo.net/2024/06/09/122-540x72034385326cd5bfc55.jpg",
  "https://img.picgo.net/2024/06/09/188-540x72063a831f73954962f.jpg",
  "https://img.picgo.net/2024/06/09/249-540x720700d274635e8fa17.jpg",
  "https://img.picgo.net/2024/06/09/257-540x7201a858cc12577607b.jpg",
  "https://img.picgo.net/2024/06/09/259-540x720e234cc6fc01467f1.jpg",
  "https://img.picgo.net/2024/06/09/283-540x7208b68b2fcac91052c.jpg",
  "https://img.picgo.net/2024/06/09/288-540x720c0f65275f1bba254.jpg",
  "https://img.picgo.net/2024/06/09/299-540x72088d6557780941d1f.jpg",
  "https://img.picgo.net/2024/06/09/1067-540x7202571c032b89d401d.jpg"
];

const slidesEl = document.querySelector(".slides");
for (let i = 0; i < imageList.length; i++) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = imageList[i];
  let alt = imageList[i].slice(imageList[i].search(/\d+x/g));
  img.setAttribute("title", alt);
  img.setAttribute("alt", alt);
  div.appendChild(img);
  slidesEl.appendChild(div);
}