window.addEventListener("DOMContentLoaded", e => {
    document.oncontextmenu = function (e) {
        // return false;
    };
    document.ondragstart = function (e) {
        return false;
    };

    let isF12 = false;
    document.onkeydown = function (e) {
        if (e.code == "F12") {
            return isF12;
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

    // 管控主机
    previewImage(".control-section", ".control-section canvas");
    // 仓内屏
    // previewImage(".terminal-section", ".terminal-section canvas");

    function previewImage (sectionEle, canvasEle) {
        const section = document.querySelector(sectionEle);

        controlList.forEach(imageItem => {
            getBase64Image("render", section, canvasEle, imageItem, 192, 108);
        });

        window.onload = function () {
            const childNodes = [...section.childNodes];
            childNodes.forEach((node) => {
                node.onclick = function (e) {
                    let target = e.target;
                    let src = target.getAttribute("src");
                    let alt = target.getAttribute("alt");
                    let title = target.getAttribute("title");
                    const imageItem = { src, alt, title };
                    getBase64Image("preview", section, canvasEle, imageItem, 768, 432);
                };
            });
        };
    }

    function getBase64Image (type, section, canvasEle, data, width, height) {
        const { src, alt, title } = data;
        pathToBase64(src).then(base64 => {
            const img = document.createElement('img');
            img.width = width;
            img.height = height;
            img.src = base64;
            img.onload = function () {
                const canvas = convertImageToCanvas(img);
                canvas.setAttribute("alt", alt);
                canvas.setAttribute("title", title);
                canvas.setAttribute("src", src);
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
        });
    }

    function convertImageToCanvas (image) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        return canvas;
    }

    function pathToBase64 (path) {
        return new Promise((resolve, reject) => {
            if (typeof window === 'object' && 'document' in window) {
                if (typeof FileReader === 'function') {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', path, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        if (this.status === 200) {
                            let reader = new FileReader();
                            reader.onload = function (e) {
                                resolve(e.target.result);
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(this.response);
                        }
                    };
                    xhr.onerror = reject;
                    xhr.send();
                    return;
                }
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                let img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL());
                    canvas.height = canvas.width = 0;
                };
                img.onerror = reject;
                img.src = path;
                return;
            }
            if (typeof plus === 'object') {
                plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
                    entry.file(function (file) {
                        let reader = new plus.io.FileReader();
                        reader.onload = function (e) {
                            resolve(e.target.resolve);
                        };
                        reader.onerror = function (error) {
                            reject(error);
                        };
                        reader.readAsDataURL(file);
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    reject(error);
                });
                return;
            }
            if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
                wx.getFileSystemManager().readFile({
                    filePath: path,
                    encoding: 'base64',
                    success: function (res) {
                        resolve('data:image/png;base64,' + res.data);
                    },
                    fail: function (error) {
                        reject(error);
                    }
                });
                return;
            }
            reject(new Error("not support"));
        });
    }
});