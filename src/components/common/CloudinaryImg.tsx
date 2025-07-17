'use client';

import { CldImage } from 'next-cloudinary';

type CloudinaryImgProps = {
  src: string | null | undefined;
  alt: string | null | undefined;
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
  if (!src || !alt) return null;

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
