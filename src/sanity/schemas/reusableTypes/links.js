import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

const BasicLink = defineType({
  name: 'basicLink',
  type: 'object',
  fields: [
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      description: 'This should be just the final part if a url, e.g. "/about"',
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
          if (!context.parent?.internalLink && !context.parent?.externalUrl) {
            return 'Required: You must provide either an internal link or external URL.';
          }
          if (context.parent?.internalLink && context.parent?.externalUrl) {
            return 'You must provide either an internal link or external URL, but not both.';
          }
          return true;
        })
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (!context.parent?.internalLink && !context.parent?.externalUrl) {
            return 'Required: You must provide either an internal link or external URL.';
          }
          if (context.parent?.internalLink && context.parent?.externalUrl) {
            return 'You must provide either an internal link or external URL, but not both.';
          }
          return true;
        })
    })
  ],
  preview: {
    select: {
      internalLinkText: 'internalLink.linkText',
      externalUrl: 'externalUrl'
    },
    prepare({ internalLinkText, externalUrl }) {
      if (internalLinkText) {
        return {
          title: internalLinkText,
          subtitle: 'Internal Link',
          media: LinkIcon
        };
      }
      if (externalUrl) {
        return {
          title: externalUrl,
          subtitle: 'External URL',
          media: LinkIcon
        };
      }
      return {
        title: 'Link (Empty)',
        subtitle: 'No link selected'
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
      title: 'link.internalLink.linkText',
      subtitle: 'link.externalUrl',
      svgIcon: 'icon'
    },
    prepare({ title, subtitle, svgIcon }) {
      const displayTitle = title || subtitle || 'Link';
      const displaySubtitle = title
        ? 'Internal Link'
        : subtitle
          ? 'External URL'
          : 'Link';

      return {
        title: displayTitle,
        subtitle: displaySubtitle,
        media: () => {
          return <div dangerouslySetInnerHTML={{ __html: svgIcon }} />;
        }
      };
    }
  }
});

export { BasicLink, LinkWithIcon };
