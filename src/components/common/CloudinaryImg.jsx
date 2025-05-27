'use client';

import { CldImage } from 'next-cloudinary';

const CloudinaryImg = ({
  src,
  alt,
  className = '',
  priority = false,
  height,
  width,
  sizes
}) => {
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
