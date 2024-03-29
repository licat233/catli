import React, { Component, ReactNode, useEffect, useRef, useState } from 'react';
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import LocomotiveScroll from 'locomotive-scroll';
import { BaseResponse, ImageInfo } from '../typings';
require("./gallery.css");

export default function Gallery(): JSX.Element {
    const [images, setImages] = useState<ImageInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scroll = useRef<any>(null);

    async function requestImages() {
        if (isLoading) return
        setIsLoading(true);
        const res = await new Promise((resolve: (value: ImageInfo[]) => void, reject: (reason?: any) => void) => {
            fetch("//img.catli.net/api/v1/share").then(resp => resp.json())
                .then((res: BaseResponse) => {
                    if (res.status) {
                        resolve(res.data.images.data);
                    } else {
                        reject(res);
                    }
                }).catch(err => {
                    reject(err);
                });
        });
        setImages([...images, ...res]);
        setIsLoading(false);
    }

    function newScroll(): any {
        return new LocomotiveScroll({
            el: document.querySelector('.scroll-animations-container'),
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
    }

    function resetAllEvent() {
        const totalImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('.image');
        [].forEach.call(totalImages, (image: HTMLImageElement) => {
            image.addEventListener('click', () => {
                image.classList.add('-clicked');
                hideAllImages(totalImages);
            });
        });
        setTimeout(() => {
            showAllImages(totalImages);
        }, 1000);
    }

    useEffect(() => {
        if (!isLoading) {
            requestImages().finally(() => {
                resetAllEvent();
                scroll.current.update();
            })
        }

        if (!scroll.current) {
            scroll.current = newScroll();
            scroll.current.init();
            document.getElementById("home")?.addEventListener("click", () => {
                scroll.current?.scrollTo(0);
            })
            document.getElementById("start")?.addEventListener("click", () => {
                const target = document.querySelector(".scrollsection")?.firstElementChild
                target && scroll.current?.scrollTo(target)
            })
            document.getElementById("end")?.addEventListener("click", () => {
                const target = document.querySelector(".scrollsection")?.lastElementChild
                target && scroll.current?.scrollTo(target)
            })
        }

        return () => {
            scroll.current.destroy();
            scroll.current = null;
        };
    }, []);

    function showAllImages(totalImages: NodeListOf<HTMLImageElement>) {
        [].forEach.call(totalImages, (image: HTMLImageElement) => {
            image.classList.remove('-clicked');
            image.classList.add('-active');
        });
    }

    function hideAllImages(totalImages: NodeListOf<HTMLImageElement>) {
        [].forEach.call(totalImages, (image: HTMLImageElement) => {
            image.classList.remove('-active');
        });

        setTimeout(() => {
            showAllImages(totalImages);
        }, 2000);
    }
    function clickImage(e: any) {
        const totalImages = document.querySelectorAll(".image");
        hideAllImages(totalImages as NodeListOf<HTMLImageElement>)
    }
    function Item(image: ImageInfo, index: number) {
        let mark = "";
        if (index % 2) {
            mark = "-horizontal";
        }
        let size = "-normal";
        const speed = Math.floor(4 * Math.random());
        const n = speed % 3;
        if (n === 1) {
            size = "-big";
        } else if (n === 2) {
            size = "-small";
        }
        const className = `item ${size} ${mark}`;
        return (
            <div
                className={className}
                data-scroll
                data-scroll-speed={speed}
                key={index}
            >
                <img
                    src={image.url}
                    className="image"
                    key={index}
                    title={image.name}
                    onClick={clickImage}
                    alt={image.alt}
                />
            </div>
        );
    }

    return (
        <>
            <div className='scroll-animations-container' data-scroll-container>
                <div className='scrollsection' data-scroll-section>
                    {images.map(Item)}
                </div>
            </div>
            <div className='fake-ui'>
                <div className='logo'>
                    <div className="logo-box">
                        <img src="https://img.alicdn.com/imgextra/i2/917298378/O1CN010hGXaf2BlAzexJ8cM_!!917298378.png" alt="" />
                    </div>
                </div>
                <div className='nav'>
                    <span className='item' id="home">HOME</span>
                    <span className='item' id="start">START</span>
                    <span className='item' id="end">END</span>
                </div>
                <div className='footer'>
                    <a href="//beian.miit.gov.cn" rel="noreferrer" target="_blank">备案号：黔ICP备20005208号-1</a>
                </div>
            </div>
        </>
    )
}