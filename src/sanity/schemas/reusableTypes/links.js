import { defineArrayMember, defineField, defineType } from 'sanity';

export const NavLinks = defineType({
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
});

export const LinkWithIcon = defineType({
  name: 'linkWithIcon',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      // TODO: change to custom icon type
      type: 'string'
    }),
    defineField({
      name: 'href',
      title: 'href',
      type: 'string'
    })
  ]
});
