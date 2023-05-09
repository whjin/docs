document.oncontextmenu = function (e) {
    return false;
};
document.onselectstart = function (e) {
    return false;
};
document.oncopy = function (e) {
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
// 远程会见
previewImage(remoteList, ".project-wrapper", ".remote-section", "top");
// 远程会见后台管理
previewImage(meetingList, ".project-wrapper", ".meeting-section", "top");
// 行为分析
previewImage(behaviorList, ".project-wrapper", ".behavior-section", "top");
// 排班系统
previewImage(scheduleList, ".project-wrapper", ".schedule-section", "top");
// 西域游
previewImage(xiyuyouList, ".project-wrapper", ".xiyuyou-section", "top");

// 查看项目详情
toggleDetails();

function previewImage (list, mainClass, sectionClass, position) {
    const section = document.querySelector(sectionClass);

    list.forEach(imageData => {
        const canvas = drawImageToCanvas(imageData, 96, 54);
        canvas.style.borderRadius = '4px';
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
                width = document.documentElement.clientWidth * 9 / 10;
                height = width * 9 / 16;
            } else if (userAgent.includes('Windows')) {
                if (document.documentElement.clientWidth <= 960) {
                    width = document.documentElement.clientWidth * 9 / 10;
                    height = width * 9 / 16;
                }
            }
            const canvas = drawImageToCanvas(imageData, width, height);
            const container = document.querySelector(mainClass);
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
    canvas.style.border = '1px solid #c1c1c1';
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

function toggleDetails () {
    const sectionNodes = document.querySelectorAll('section');
    sectionNodes.forEach(node => {
        const parent = node.parentNode;
        const aside = document.createElement("aside");
        let className = node.classList.value;
        detailList.forEach(detail => {
            if (detail.className == className) {
                aside.innerHTML = detail.detailText;
                parent.insertBefore(aside, node);
            }
        });
    });

    const headerNodes = document.querySelectorAll('header');
    headerNodes.forEach(node => {
        node.title = "点击查看项目详情，Ctrl+U查看源代码";
        node.onclick = function (e) {
            const target = e.target;
            const asideNode = target.nextElementSibling;
            asideNode.classList.toggle('show');
        };
    });
}

