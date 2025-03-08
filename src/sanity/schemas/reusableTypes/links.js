import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

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
      fields: [
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string'
        }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: (doc, { parent }) => parent?.linkText,
            maxLength: 96,
            isUnique: (slug, context) => context.defaultIsUnique(slug, context)
          },
          validation: Rule => Rule.required()
        })
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          if (!context.parent?.internalLink && !context.parent?.externalLink) {
            return 'Required: You must provide either an internal link or external URL.';
          }
          if (context.parent?.internalLink && context.parent?.externalLink) {
            return 'You must provide either an internal link or external URL, but not both.';
          }
          return true;
        })
    }),
    defineField({
      // TODO: Make this field an object and add linkText as a second field
      name: 'externalLink',
      title: 'External Link',
      type: 'object',
      fields: [
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string'
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: Rule => Rule.required()
        })
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          if (!context.parent?.internalLink && !context.parent?.externalLink) {
            return 'Required: You must provide either an internal link or external URL.';
          }
          if (context.parent?.internalLink && context.parent?.externalLink) {
            return 'You must provide either an internal link or external URL, but not both.';
          }
          return true;
        })
    })
  ],
  preview: {
    select: {
      internalLinkText: 'internalLink.linkText',
      externalLinkText: 'externalLink.linkText',
      externalLinkURL: 'externalLink.url'
    },
    prepare({ internalLinkText, externalLinkText, externalLinkURL }) {
      const displayTitle =
        internalLinkText ||
        externalLinkText ||
        externalLinkURL ||
        'Link (empty)';
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
    }
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
    prepare({ internalLinkText, externalLinkText, externalLinkURL }) {
      const displayTitle =
        internalLinkText ||
        externalLinkText ||
        externalLinkURL ||
        'Link (empty)';
      const displaySubtitle = internalLinkText
        ? 'Internal Link'
        : externalLinkText || externalLinkURL
          ? 'External URL'
          : 'Link';

      return {
        title: displayTitle,
        subtitle: displaySubtitle
      };
    }
  }
});

export { BasicLink, LinkWithIcon };
