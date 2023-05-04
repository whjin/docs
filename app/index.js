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
previewImage(controlList, ".project-wrapper", ".control-section");
// 仓内屏
previewImage(terminalList, ".project-wrapper", ".terminal-section");
// 仓外屏
previewImage(managerList, ".project-wrapper", ".manager-section");
// 后台管理
previewImage(systemList, ".project-wrapper", ".system-section");
// 调试工具
previewImage(debugToolList, ".project-wrapper", ".debugTool-section");

function previewImage (list, mainEle, sectionEle) {
    const section = document.querySelector(sectionEle);

    list.forEach(imageData => {
        const canvas = drawImageToCanvas(imageData, 96, 54);
        section.appendChild(canvas);
    });

    const childNodes = [...section.childNodes];
    childNodes.forEach((nodeItem) => {
        nodeItem.onclick = function (e) {
            let target = e.target;
            let src = target.getAttribute("src");
            let alt = target.getAttribute("alt");
            let title = target.getAttribute("title");
            const imageData = { src, alt, title };
            const canvas = drawImageToCanvas(imageData, 960, 540);
            canvas.classList.add("preview");
            const container = document.querySelector(mainEle);
            const lastChild = container.lastElementChild;
            if (lastChild.classList.contains("preview")) {
                if (lastChild.getAttribute("alt") == alt) {
                    container.removeChild(lastChild);
                } else {
                    container.replaceChild(canvas, lastChild);
                }
            } else {
                container.appendChild(canvas);
            }
            canvas.onclick = function () {
                container.removeChild(canvas);
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