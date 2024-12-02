import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'mainNavigation',
  title: 'Main Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'colors' }]
        })
      ]
    })
  ]
});
