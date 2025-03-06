import { defineField, defineType } from 'sanity';

const BasicLink = defineType({
  name: 'basicLink',
  type: 'object',
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
  ]
});

const LinkWithIcon = defineType({
  name: 'linkWithIcon',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'inlineSvg'
    }),
    defineField({
      name: 'basicLink',
      title: 'Link',
      type: 'basicLink'
    })
  ]
});

export { BasicLink, LinkWithIcon };
