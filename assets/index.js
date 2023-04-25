document.addEventListener("DOMContentLoaded", () => {
    document.oncontextmenu = function (e) {
        return false;
    };
    document.ondragstart = function (e) {
        return false;
    };

    let isF12 = false;
    document.onkeydown = function (e) {
        if (e.code == "F12") {
            // return isF12;
        }

    };
    document.onkeyup = function (e) {
        if (e.key == "MediaTrackPrevious") {
            isF12 = false;
        }
        if (e.key == "MediaTrackNext") {
            isF12 = true;
        }
    };

    const list = controlList;

    // 管控主机
    previewImage(".control-section", ".control-section canvas");
    // 仓内屏
    // previewImage(".terminal-section", ".terminal-section img");

    function previewImage (sectionEle, canvasEle) {
        const section = document.querySelector(sectionEle);

        list.forEach(image => {
            getBase64Image("render", section, canvasEle, image, 96, 54);
        });

        window.onload = function () {
            const childNodes = [...section.childNodes];
            childNodes.forEach((node) => {
                node.onclick = function (e) {
                    let target = e.target;
                    let src = target.getAttribute("src");
                    let alt = target.getAttribute("alt");
                    let title = target.getAttribute("title");
                    getBase64Image("preview", section, canvasEle, { src, alt, title }, 768, 432);
                };
            });
        };
    }

    function getBase64Image (type, section, canvasEle, image, width, height) {
        const { src, alt, title } = image;
        const img = new Image();
        img.src = src;
        img.onload = function () {
            const canvas = convertImageToCanvas(img, width, height);
            canvas.setAttribute("src", src);
            canvas.setAttribute("alt", alt);
            canvas.setAttribute("title", title);
            switch (type) {
                case "render":
                    section.appendChild(canvas);
                    break;
                case "preview":
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
                    break;
            }
        };
    }

    function convertImageToCanvas (image, width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        return canvas;
    }
});