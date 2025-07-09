'use client';

import { CldImage } from 'next-cloudinary';

// TODO: Add more CldImage props as needed: https://next.cloudinary.dev/cldimage/configuration

type CloudinaryImgProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  height?: number;
  width?: number;
  sizes?: string;
};

const CloudinaryImg: React.FC<CloudinaryImgProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  height,
  width,
  sizes = ''
}) => {
  if (!src) return null;

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
