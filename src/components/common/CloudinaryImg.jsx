'use client';

import { CldImage } from 'next-cloudinary';

// TODO: Add more CldImage props as needed: https://next.cloudinary.dev/cldimage/configuration

const CloudinaryImg = ({
  src,
  alt,
  className = '',
  priority = false,
  height,
  width,
  sizes = ''
}) => {
  if (!src) {
    return null;
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      {...(height && width ? { height, width } : { fill: true, sizes })}
    />
  );
};

export default CloudinaryImg;
