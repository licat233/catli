function Catli() {
    let requestImages = () => {
        return new Promise((resolve, reject) => {
            fetch("//pic.catli.net/api/images").then(resp => resp.json())
                .then(res => {
                    if (res.success) {
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
    let insertImages = (images) => {
        let codes = [];
        images.forEach((image, index) => {
            let mark = "";
            if (index % 2) {
                mark = "-horizontal"
            }
            let size = "-normal";
            let speed = Math.floor(5 * Math.random())
            let n = speed % 3;
            if (n === 1) {
                size = "-big"
            } else if (n === 2) {
                size = "-small"
            }
            let temp = `<div class='item ${size} ${mark}' data-scroll data-scroll-speed="${speed}"><img class='image' src='${image.url}'></div>`;
            codes.push(temp)
        });
        let s = codes.join("");
        let c = document.querySelector(".scrollsection");
        c.innerHTML = s;
    }
    this.Init = () => {
        return requestImages().then(res => {
            insertImages(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    let images = null;
    let showImages = () => {
        [].forEach.call(images, (image) => {
            image.classList.remove('-clicked');
            image.classList.add('-active');
        });
    };

    let hideImages = () => {
        [].forEach.call(images, (image) => {
            image.classList.remove('-active');
        });

        setTimeout(showImages, 2000);
    };

    let eleEvent = (scroll) => {
        let home = document.getElementById('home');
        home.addEventListener('click', () => {
            scroll && scroll.scrollTo(0)
        })
        let start = document.getElementById('start');
        start.addEventListener('click', () => {
            let target = document.querySelector(".scrollsection").firstElementChild
            scroll && scroll.scrollTo(target)
        })
        let end = document.getElementById('end');
        end.addEventListener('click', () => {
            let target = document.querySelector(".scrollsection").lastElementChild
            scroll && scroll.scrollTo(target)
        })
    }

    let logic = () => {
        let root = document.querySelector('.scroll-animations-container');
        if (!root) return;
        let scroll = new LocomotiveScroll({
            el: root,
            direction: 'horizontal',
            smooth: true,
            lerp: 0.05,
            tablet: {
                smooth: true,
                direction: "horizontal",
                horizontalGesture: true,
            },
            smartphone: {
                smooth: true,
                direction: "horizontal",
                horizontalGesture: true,
            }
        });
        eleEvent(scroll);
        images = root.querySelectorAll('.image');
        Intense(images);
        // [].forEach.call(images, (image) => {
        //     image.addEventListener('click', () => {
        //         image.classList.add('-clicked');
        //         hideImages();
        //     });
        // });
        setTimeout(showImages, 1000);
    }
    this.Init().finally(() => {
        logic()
    })
}


window.addEventListener('DOMContentLoaded', () => {
    new Catli;
});
