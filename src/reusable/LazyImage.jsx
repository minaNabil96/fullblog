import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ image, rimage }) => {
  console.log(image);
  return (
    <LazyLoadImage
      alt={image.alt}
      effect="blur"
      src={image.src}
      placeholderSrc={rimage.src}
      width={image.width}
      height={image.height}
    />
  );
};

export default LazyImage;
