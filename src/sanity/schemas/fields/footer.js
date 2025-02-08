import { defineField } from 'sanity';

export default defineField({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'navLinks'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'linkWithIcon' }]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      description: 'No need to include copyright icon',
      type: 'string'
    })
  ]
});
