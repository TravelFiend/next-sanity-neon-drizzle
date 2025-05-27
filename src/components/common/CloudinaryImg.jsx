'use client';

import { CldImage } from 'next-cloudinary';

const CloudinaryImg = ({
  src,
  alt,
  classes = '',
  priority = false,
  height,
  width
}) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      className={classes}
      priority={priority}
      {...(height && width ? { height, width } : { fill: true })}
    />
  );
};

export default CloudinaryImg;
