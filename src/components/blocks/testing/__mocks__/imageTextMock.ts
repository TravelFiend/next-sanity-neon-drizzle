import { textBlockMock } from '@/components/common/testing/__mocks__/textBlockMock';
import { ImageTextBlockRes } from '@/sanity/types/derivedTypes';

const imageTextMock: ImageTextBlockRes = {
  _key: '123',
  _type: 'imageTextBlock',
  image: {
    _key: null,
    _type: 'richImage',
    altText: 'A pair of shoes',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 507,
      public_id: 'samples/ecommerce/car-interior-design',
      resource_type: 'image',
      secure_url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1742252276/samples/ecommerce/car-interior-design.jpg`,
      tags: [],
      width: 587
    }
  },
  imageAlignment: 'left',
  text: textBlockMock
};

export { imageTextMock };
