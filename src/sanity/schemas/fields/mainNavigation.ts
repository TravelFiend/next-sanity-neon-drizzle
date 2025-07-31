import { defineArrayMember, defineField, defineType } from 'sanity';
import type { BasicLink, SecondLevelLinks } from '@sanityTypes/generatedTypes';

const nestedLinksPreview = (
  nestedLinks?: SecondLevelLinks[] | BasicLink[]
): string => {
  if (!nestedLinks || nestedLinks.length === 0) return '';

  const allChildren = nestedLinks.map(link => {
    const isSecondLevel = 'secondLevelLink' in link;
    const data = isSecondLevel
      ? (link as SecondLevelLinks).secondLevelLink
      : (link as BasicLink);

    const internalText = data?.internalLink?.linkText;
    const externalText = data?.externalLink?.linkText;

    return internalText ?? externalText ?? '';
  });

  return allChildren.join(' : ');
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
      of: [defineArrayMember({ type: 'basicLink' })]
    })
  ],
  preview: {
    select: {
      internalLinkText: 'secondLevelLink.internalLink.linkText',
      externalLinkText: 'secondLevelLink.externalLink.linkText',
      externalLinkURL: 'secondLevelLink.externalLink.url',
      childLinks: 'thirdLevelLinks'
    },
    prepare(selection: Record<string, unknown>) {
      const internalLinkText = selection.internalLinkText as string | undefined;
      const externalLinkText = selection.externalLinkText as string | undefined;
      const externalLinkURL = selection.externalLinkURL as string | undefined;
      const childLinks = selection.childLinks as BasicLink[] | undefined;

      const displayTitle =
        internalLinkText || externalLinkText || externalLinkURL || 'Untitled';

      return {
        title: displayTitle,
        subtitle: nestedLinksPreview(childLinks)
      };
    }
  }
});

const isUniqueWithinArray = (
  links: SecondLevelLinks[] | undefined
): boolean => {
  if (!links) return true;

  const slugs = new Set<string>();
  return !links.some(linkObj => {
    const slug = linkObj.secondLevelLink.internalLink?.slug.current;
    if (!slug) return false;
    if (slugs.has(slug)) return true;
    slugs.add(slug);
    return false;
  });
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
      of: [defineArrayMember({ type: 'secondLevelLinks' })],
      validation: Rule =>
        Rule.custom((secondLevelLinks: unknown) => {
          return isUniqueWithinArray(
            secondLevelLinks as SecondLevelLinks[] | undefined
          )
            ? true
            : 'Second-level link slugs must be unique within the tab.';
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
    prepare(selection: Record<string, unknown>) {
      const internalLinkText = selection.internalLinkText as string | undefined;
      const externalLinkText = selection.externalLinkText as string | undefined;
      const externalLinkURL = selection.externalLinkURL as string | undefined;
      const childLinks = selection.childLinks as SecondLevelLinks[] | undefined;

      const displayTitle =
        internalLinkText || externalLinkText || externalLinkURL || 'Untitled';

      return {
        title: displayTitle,
        subtitle: nestedLinksPreview(childLinks!)
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
      of: [defineArrayMember({ type: 'navTab' })]
    })
  ]
});

export { NavTab, MainNav, SecondLevelLinks };
