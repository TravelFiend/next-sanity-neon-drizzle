'use client';

import { CldImage } from 'next-cloudinary';

const CloudinaryImg = ({ src, alt, classes, priority, height, width }) => {
  return (
    <>
      {!height || !width ? (
        <CldImage
          src={src}
          fill
          alt={alt}
          className={classes || ''}
          priority={priority}
        />
      ) : (
        <CldImage
          src={src}
          height={height}
          width={width}
          alt={alt}
          className={classes || ''}
          priority={priority}
        />
      )}
    </>
  );
};

export default CloudinaryImg;
