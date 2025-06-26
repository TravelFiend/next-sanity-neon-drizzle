import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string'
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string'
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    })
  ]
});
