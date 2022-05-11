import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { render } from '@testing-library/react';

export default function Gallery(props) {
  this.imageBox = (image, index) => {
    let mark = "";
    if (index % 2) {
      mark = "-horizontal"
    }
    let size = "-normal";
    const speed = Math.floor(5 * Math.random())
    const n = speed % 3;
    if (n === 1) {
      size = "-big"
    } else if (n === 2) {
      size = "-small"
    }
    const className = `item ${size} ${mark}`;
    return (
      <div
        className={className}
        data-scroll data-scroll-speed={speed}
      >
        <img className='image' src={image.url} alt={image.alt} />
      </div>
    )
  }

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className="pswp-gallery" id={props.galleryID}>
      {props.images.map((image, index) => (
        <a
          href={image.url}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={props.galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
        >
          {this.imageBox(image, index)}
        </a>
      ))}
    </div>
  );
}
