import { CTAButtonRes } from '@/sanity/types/derivedTypes';

const ctaButtonMock: CTAButtonRes = {
  _type: 'ctaButton',
  isDark: false,
  link: {
    externalLink: {
      _type: null,
      linkText: 'External',
      url: 'https://www.memedroid.com/'
    },
    internalLink: {
      _type: null,
      linkText: 'Internal',
      slug: {
        current: 'music'
      }
    }
  }
};

export { ctaButtonMock };
