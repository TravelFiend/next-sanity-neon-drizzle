import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'mainNavigation',
  title: 'Main Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'companyLogo',
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
          name: 'navLink',
          title: 'Nav Link',
          type: 'object',
          fields: [
            defineField({
              name: 'linkText',
              title: 'Link Text',
              type: 'string'
            }),
            defineField({
              name: 'href',
              title: 'href',
              type: 'string'
            })
          ]
        })
      ]
    })
  ]
});
