import { HeroBlockRes } from '@/sanity/types/derivedTypes';

const heroDataMock: HeroBlockRes = {
  _key: '123',
  _type: 'heroBlock',
  bgColor: 'accent',
  ctaButton: {
    _type: 'ctaButton',
    isDark: true,
    link: {
      externalLink: {
        _type: null,
        linkText: 'External Link stupid',
        url: 'https://www.memedroid.com/'
      },
      internalLink: null
    }
  },
  image: {
    _key: null,
    _type: 'richImage',
    altText: 'Rocks probably from Mars',
    imageAsset: {
      _key: null,
      _type: 'cloudinary.asset',
      _version: null,
      duration: null,
      height: 3072,
      public_id: 'PXL_20241129_084949099_ai4cwx',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/dz03hfmuq/image/upload/v1748343021/PXL_20241129_084949099_ai4cwx.jpg',
      tags: [],
      width: 4080
    }
  },
  isFullWidth: false,
  overlay: {
    color: 'accent',
    coverage: null,
    opacity: 30
  },
  showTextOutline: null,
  subtitle: 'Test title, testtitle, testitle, testicle',
  textAlignment: 'left',
  textBlockAlignment: {
    horizontalAlign: 'left',
    verticalAlign: 'top'
  },
  textColor: 'white',
  textOutlineColor: null,
  textOutlineSize: null,
  title: 'Test Title'
};

export { heroDataMock };
