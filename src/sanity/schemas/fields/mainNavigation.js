import { defineField, defineType } from 'sanity';

const nestedLinksPreview = nestedLinks => {
  const allChildren = nestedLinks?.map(nestedLink => {
    if (nestedLink.secondLevelLink) {
      return nestedLink.secondLevelLink.internalLink
        ? nestedLink.secondLevelLink.internalLink.linkText
        : nestedLink.secondLevelLink.externalLink;
    } else {
      return nestedLink.internalLink
        ? nestedLink.internalLink.linkText
        : nestedLink.externalLink;
    }
  });

  return allChildren?.join(' : ');
};

const SecondLevelLinks = defineType({
  name: 'secondLevelLinks',
  type: 'object',
  fields: [
    defineField({
      name: 'secondLevelLink',
      title: 'Second Level Link',
      type: 'basicLink',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thirdLevelLinks',
      title: 'Third Level Links',
      type: 'array',
      of: [{ type: 'basicLink' }]
    })
  ],
  preview: {
    select: {
      internalLinkText: 'secondLevelLink.internalLink.linkText',
      externalLinkText: 'secondLevelLink.externalLink.linkText',
      externalLinkURL: 'secondLevelLink.externalLink.url',
      childLinks: 'thirdLevelLinks'
    },
    prepare({
      internalLinkText,
      externalLinkText,
      externalLinkURL,
      childLinks
    }) {
      const displayTitle =
        internalLinkText || externalLinkText || externalLinkURL;

      return {
        title: displayTitle,
        subtitle: nestedLinksPreview(childLinks)
      };
    }
  }
});

const isUniqueWithinArray = links => {
  if (!links) {
    return true;
  }

  const slugs = [];
  for (const linkObj of links) {
    if (linkObj?.secondLevelLink?.slug?.current) {
      const slug = linkObj.secondLevelLink.slug.current;
      if (slugs.includes(slug)) {
        return false;
      }
      slugs.push(slug);
    }
  }

  return true;
};

const NavTab = defineType({
  name: 'navTab',
  title: 'Navigation Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'basicLink'
    }),
    defineField({
      name: 'secondLevelLinks',
      title: 'Second Level Links',
      type: 'array',
      of: [{ type: 'secondLevelLinks' }],
      validation: Rule =>
        Rule.custom(secondLevelLinks => {
          if (!isUniqueWithinArray(secondLevelLinks)) {
            return 'Second-level link slugs must be unique within the tab.';
          }
          return true;
        })
    })
  ],
  preview: {
    select: {
      internalLinkText: 'link.internalLink.linkText',
      externalLinkText: 'link.externalLink.linkText',
      externalLinkURL: 'link.externalLink.url',
      childLinks: 'secondLevelLinks'
    },
    prepare({
      internalLinkText,
      externalLinkText,
      externalLinkURL,
      childLinks
    }) {
      const displayTitle =
        internalLinkText || externalLinkText || externalLinkURL;

      return {
        title: displayTitle,
        subtitle: nestedLinksPreview(childLinks)
      };
    }
  }
});

const MainNav = defineField({
  name: 'mainNav',
  title: 'Main Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'inlineSvg'
    }),
    defineField({
      name: 'navTabs',
      title: 'Navigation Tabs',
      type: 'array',
      of: [{ type: 'navTab' }]
    })
  ]
});

export { NavTab, MainNav, SecondLevelLinks };
