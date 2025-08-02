import { CTAButtonRes } from '@/sanity/types/derivedTypes';

type NonNullCtaLinkRes = NonNullable<CTAButtonRes['link']>;

const internalLinkMock: NonNullCtaLinkRes['internalLink'] = {
  _type: null,
  linkText: 'Internal',
  slug: {
    current: 'music'
  }
};

const externalLinkMock: NonNullCtaLinkRes['externalLink'] = {
  _type: null,
  linkText: 'External',
  url: 'https://www.memedroid.com/'
};

export { internalLinkMock, externalLinkMock };
