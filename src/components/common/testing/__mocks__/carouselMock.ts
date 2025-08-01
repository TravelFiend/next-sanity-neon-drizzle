import type { CardsRes } from '@sanityTypes/derivedTypes';

const cardsMock: CardsRes = [
  {
    _key: 'd6a35b765729',
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
    _key: 'ef9754996cc2',
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
    _key: '268cd66f027a',
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
    _key: '0ecfb081b0fa',
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
  },
  {
    _key: 'b9742e0a23fe',
    _type: 'richImage',
    altText: 'An assortment of colorful spices',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 2000,
      public_id: 'samples/food/spices',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1742252276/samples/food/spices.jpg',
      tags: [],
      width: 2000
    }
  }
];

export { cardsMock };
