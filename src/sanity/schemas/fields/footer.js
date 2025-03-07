import { defineField } from 'sanity';

const GROUPS = [
  {
    name: 'textLinks',
    title: 'Text Links'
  },
  {
    name: 'iconLinks',
    title: 'Icon Links'
  },
  {
    name: 'branding',
    title: 'Branding'
  }
];

export default defineField({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [{ type: 'basicLink' }],
      group: 'textLinks'
    }),
    defineField({
      name: 'siteLinks',
      title: 'Site Links',
      type: 'array',
      of: [{ type: 'basicLink' }],
      group: 'textLinks'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'linkWithIcon' }],
      group: 'iconLinks'
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      description: 'No need to include copyright icon',
      type: 'string'
    })
  ]
});
