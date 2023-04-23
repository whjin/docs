window.onload = function () {
    const images = document.querySelectorAll(".control-section img");
    images.forEach((image) => {
        image.onclick = function (e) {
            let target = e.target;
            if (target.classList.contains("large")) {
                target.classList.remove("large");
            } else {
                target.classList.add("large");
            }
            images.forEach(item => {
                if (item !== target) {
                    item.classList.remove("large");
                }
            });
        };
    });
};