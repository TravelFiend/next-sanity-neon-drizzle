import type { CardsRes } from '@sanityTypes/derivedTypes';

const cardsMock: CardsRes = [
  {
    _key: '1',
    _type: 'richImage',
    altText: 'A plate of sweets',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 1200,
      public_id: 'samples/dessert-on-a-plate',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1742252285/samples/dessert-on-a-plate.jpg',
      tags: [],
      width: 1200
    }
  },
  {
    _key: '2',
    _type: 'richImage',
    altText: 'Cat in a chair',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 1024,
      public_id: 'samples/animals/cat',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1742252273/samples/animals/cat.jpg',
      tags: [],
      width: 768
    }
  },
  {
    _key: '3',
    _type: 'richImage',
    altText: 'Nicely designed car interior',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 2667,
      public_id: 'samples/ecommerce/car-interior-design',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1742252276/samples/ecommerce/car-interior-design.jpg',
      tags: [],
      width: 2000
    }
  },
  {
    _key: '4',
    _type: 'richImage',
    altText: 'Woman walking outside',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 963,
      public_id: 'samples/outdoor-woman',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1742252284/samples/outdoor-woman.jpg',
      tags: [],
      width: 640
    }
  }
];

export { cardsMock };
