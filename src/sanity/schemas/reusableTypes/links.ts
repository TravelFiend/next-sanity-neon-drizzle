import {
  defineField,
  defineType,
  type ValidationContext,
  type ObjectRule
} from 'sanity';
import { LinkIcon } from '@sanity/icons';

const linkFields = [
  defineField({
    name: 'linkText',
    title: 'Link Text',
    type: 'string',
    description:
      'Either the text to be displayed for a link, or the accessible label for an icon link. This is required for both internal and external links.',
    validation: Rule => Rule.required()
  })
];

const internalLinkFields = [
  ...linkFields,
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: (doc, context) => {
        const parent = context.parent as { linkText?: string };
        return parent?.linkText ?? '';
      },
      maxLength: 96,
      isUnique: (slug, context) => context.defaultIsUnique(slug, context)
    },
    validation: Rule => Rule.required()
  })
];

const externalLinkFields = [
  ...linkFields,
  defineField({
    name: 'url',
    title: 'URL',
    type: 'url',
    validation: Rule => Rule.required()
  })
];

const linkValidation = (Rule: ObjectRule) =>
  Rule.custom((value: unknown, context: ValidationContext) => {
    const parent = context.parent as {
      internalLink?: unknown;
      externalLink?: unknown;
    };

    if (!parent?.internalLink && !parent?.externalLink) {
      return 'Required: You must provide either an internal link or external URL.';
    }
    if (parent?.internalLink && parent?.externalLink) {
      return 'You must provide either an internal link or external URL, but not both.';
    }
    return true;
  });

const prepareLinkPreview = ({
  internalLinkText,
  externalLinkText,
  externalLinkURL
}: {
  internalLinkText: string;
  externalLinkText: string;
  externalLinkURL: string;
}) => {
  const displayTitle =
    internalLinkText || externalLinkText || externalLinkURL || 'Link (empty)';
  const displaySubtitle = internalLinkText
    ? 'Internal Link'
    : externalLinkText || externalLinkURL
      ? 'External URL'
      : 'Link';

  return {
    title: displayTitle,
    subtitle: displaySubtitle,
    media: LinkIcon
  };
};

const BasicLink = defineType({
  name: 'basicLink',
  type: 'object',
  fields: [
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      description: 'This should be just the final part of a url, e.g. "/about"',
      type: 'object',
      options: { collapsed: false },
      fields: internalLinkFields,
      validation: linkValidation
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'object',
      fields: externalLinkFields,
      validation: linkValidation
    })
  ],
  preview: {
    select: {
      internalLinkText: 'internalLink.linkText',
      externalLinkText: 'externalLink.linkText',
      externalLinkURL: 'externalLink.url'
    },
    prepare: prepareLinkPreview
  }
});

const LinkWithIcon = defineType({
  name: 'linkWithIcon',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'inlineSvg',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'basicLink',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      internalLinkText: 'link.internalLink.linkText',
      externalLinkText: 'link.externalLink.linkText',
      externalLinkURL: 'link.externalLink.url'
    },
    prepare: prepareLinkPreview
  }
});

export { BasicLink, LinkWithIcon };
