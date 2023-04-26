document.oncontextmenu = function (e) {
    return false;
};
document.ondragstart = function (e) {
    return false;
};

let isF12 = false;
document.onkeydown = function (e) {
    if (e.key == "F12") {
        return isF12;
    }

};
document.onkeyup = function (e) {
    if (e.key == "O") {
        isF12 = true;
    }
    if (e.key == "L") {
        isF12 = false;
    }
};

// 管控主机
previewImage(controlList, ".control-section", ".control-section canvas");
// 仓内屏
previewImage(terminalList, ".terminal-section", ".terminal-section canvas");

function previewImage (list, sectionEle, canvasEle) {
    const section = document.querySelector(sectionEle);

    list.forEach(imageData => {
        const canvas = drawImageToCanvas(imageData, 192, 108);
        section.appendChild(canvas);
    });

    const childNodes = [...section.childNodes];
    childNodes.forEach((node) => {
        node.onclick = function (e) {
            let target = e.target;
            let src = target.getAttribute("src");
            let alt = target.getAttribute("alt");
            let title = target.getAttribute("title");
            const imageData = { src, alt, title };
            const canvas = drawImageToCanvas(imageData, 768, 432);
            const canvasNodes = document.querySelectorAll(canvasEle);
            let lastChild = canvasNodes[canvasNodes.length - 1];
            canvas.classList.add("preview");
            if (lastChild.classList.contains("preview")) {
                if (lastChild.getAttribute("alt") == alt) {
                    section.removeChild(lastChild);
                } else {
                    section.replaceChild(canvas, lastChild);
                }
            } else {
                section.appendChild(canvas);
            }
            canvas.onclick = function () {
                section.removeChild(canvas);
            };
        };
    });
}

function drawImageToCanvas (imageData, width, height) {
    const { src, alt, title } = imageData;
    const img = new Image();
    img.src = src;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("src", src);
    canvas.setAttribute("alt", alt);
    canvas.setAttribute("title", title);
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, width, height);
    ctx.stroke();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, width, height);
    };
    return canvas;
}