window.onload = function () {
    document.oncontextmenu = function (e) {
        return false;
    };
    document.ondragstart = function (e) {
        return false;
    };

    document.onkeydown = function (e) {
        if (e.code == "F12") {
            return false;
        }
    };

    // 管控主机
    previewImg(".control-section", ".control-section img");
    // 仓内屏
    previewImg(".terminal-section", ".terminal-section img");

    function previewImg (sectionEle, imgEle) {
        const section = document.querySelector(sectionEle);
        const images = document.querySelectorAll(imgEle);
        images.forEach((image) => {
            image.onclick = function (e) {
                let target = e.target;
                const imgNodes = document.querySelectorAll(imgEle);
                let lastChild = imgNodes[imgNodes.length - 1];
                const { src, alt, title } = target;
                let img = document.createElement("img");
                img.src = src;
                img.alt = alt;
                img.title = title;
                img.classList.add("preview");
                if (lastChild.classList.contains("preview")) {
                    if (lastChild.alt == target.alt) {
                        section.removeChild(lastChild);
                    } else {
                        section.replaceChild(img, lastChild);
                    }
                } else {
                    section.appendChild(img);
                }
                img.onclick = function () {
                    section.removeChild(img);
                };
            };
        });
    }
};