import { defineField, defineType } from 'sanity';

const nestedLinksPreview = nestedLinks => {
  const allChildren = nestedLinks?.map(nestedLink => {
    return nestedLink.secondLevelLink
      ? nestedLink.secondLevelLink.linkText
      : nestedLink.linkText;
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
      type: 'basicLink'
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
      title: 'secondLevelLink.linkText',
      childLinks: 'thirdLevelLinks'
    },
    prepare(selection) {
      const { title, childLinks } = selection;

      return {
        title,
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
      title: 'link.linkText',
      childLinks: 'secondLevelLinks'
    },
    prepare(selection) {
      const { title, childLinks } = selection;

      return {
        title,
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
