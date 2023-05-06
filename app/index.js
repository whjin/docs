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
previewImage(controlList, ".project-wrapper", ".control-section", "bottom");
// 仓内屏
previewImage(terminalList, ".project-wrapper", ".terminal-section", "bottom");
// 仓外屏
previewImage(managerList, ".project-wrapper", ".manager-section", "bottom");
// 智能终端后台管理
previewImage(systemList, ".project-wrapper", ".system-section", "bottom");
// 排班系统
previewImage(scheduleList, ".project-wrapper", ".schedule-section", "top");
// 远程会见
previewImage(remoteList, ".project-wrapper", ".remote-section", "top");
// 远程会见后台管理
previewImage(meetingList, ".project-wrapper", ".meeting-section", "top");
// 行为分析
previewImage(behaviorList, ".project-wrapper", ".behavior-section", "top");

function previewImage (list, mainEle, sectionEle, position) {
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
            let width = 960, height = 540;
            const userAgent = navigator.userAgent;
            if ((userAgent.includes('iPhone') || userAgent.includes('Android')) && userAgent.includes('Mobile')) {
                width = document.documentElement.clientWidth;
                height = width * 9 / 16;
            } else if (userAgent.includes('iPad')) {
                width = document.documentElement.clientWidth * 4 / 5;
                height = width * 9 / 16;
            }
            const canvas = drawImageToCanvas(imageData, width, height);
            const container = document.querySelector(mainEle);
            const lastChild = container.lastElementChild;
            const footerEle = document.querySelector("footer");
            canvas.classList.add("preview");
            switch (position) {
                case "bottom":
                    canvas.classList.remove("top");
                    canvas.classList.add("bottom");
                    footerEle.classList.add("hidden");
                    break;
                case "top":
                    canvas.classList.remove("bottom");
                    canvas.classList.add("top");
                    footerEle.classList.remove("hidden");
                    break;
            }
            if (lastChild.classList.contains("preview")) {
                if (lastChild.getAttribute("alt") == alt) {
                    container.removeChild(lastChild);
                    footerEle.classList.remove("hidden");
                } else {
                    container.replaceChild(canvas, lastChild);
                }
            } else {
                container.appendChild(canvas);
            }
            canvas.onclick = function () {
                container.removeChild(canvas);
                footerEle.classList.remove("hidden");
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