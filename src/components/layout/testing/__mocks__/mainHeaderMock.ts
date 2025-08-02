import type {
  NotNullMainNavRes,
  NavTabsRes,
  NotNullSecondLevelLinksRes,
  ThirdLevelLinkRes
} from '@sanityTypes/derivedTypes';

const thirdLevelLinksMock: ThirdLevelLinkRes = [
  {
    _key: '39fd7fe2416f',
    _type: 'basicLink',
    internalLink: {
      linkText: 'Serigraphy',
      slug: {
        _type: 'slug',
        current: 'serigraphy'
      }
    },
    externalLink: null
  },
  {
    _key: 'ab4379f9cc92',
    _type: 'basicLink',
    internalLink: {
      linkText: 'Lithography',
      slug: {
        _type: 'slug',
        current: 'lithography'
      }
    },
    externalLink: null
  }
];

const secondLevelLinksMock: NotNullSecondLevelLinksRes = [
  {
    _key: '2db255e04ec1',
    _type: 'secondLevelLinks',
    secondLevelLink: {
      _type: 'basicLink',
      internalLink: {
        linkText: 'Printmaking',
        slug: {
          _type: 'slug',
          current: 'printmaking'
        }
      },
      externalLink: null
    },
    thirdLevelLinks: thirdLevelLinksMock
  }
];

const navTabsMock: NavTabsRes = [
  {
    _key: '12fa18f18fea',
    _type: 'navTab',
    link: {
      _type: 'basicLink',
      internalLink: {
        linkText: 'Art',
        slug: {
          _type: 'slug',
          current: 'art'
        }
      },
      externalLink: null
    },
    secondLevelLinks: secondLevelLinksMock
  },
  {
    _key: 'bb61b20c2137',
    _type: 'navTab',
    link: {
      _type: 'basicLink',
      internalLink: {
        linkText: 'Music',
        slug: {
          _type: 'slug',
          current: 'music'
        }
      },
      externalLink: null
    },
    secondLevelLinks: [
      {
        _key: '554c3481ea68',
        _type: 'secondLevelLinks',
        secondLevelLink: {
          _type: 'basicLink',
          internalLink: {
            linkText: 'Electronic',
            slug: {
              _type: 'slug',
              current: 'electronic'
            }
          },
          externalLink: null
        },
        thirdLevelLinks: null
      }
    ]
  },
  {
    _key: '827c64e21251',
    _type: 'navTab',
    link: {
      _type: 'basicLink',
      internalLink: {
        linkText: 'About',
        slug: {
          _type: 'slug',
          current: 'about'
        }
      },
      externalLink: null
    },
    secondLevelLinks: null
  }
];

const mainHeaderMock: NotNullMainNavRes = {
  _type: 'mainNav',
  companyLogo:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chart-radar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l9.5 7l-3.5 11h-12l-3.5 -11z" /><path d="M12 7.5l5.5 4l-2.5 5.5h-6.5l-2 -5.5z" /><path d="M2.5 10l9.5 3l9.5 -3" /><path d="M12 3v10l6 8" /><path d="M6 21l6 -8" /></svg>',
  navTabs: navTabsMock
};

export {
  thirdLevelLinksMock,
  secondLevelLinksMock,
  navTabsMock,
  mainHeaderMock
};
