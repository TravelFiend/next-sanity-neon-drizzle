import { defineField } from 'sanity';

export default defineField({
  name: 'mainNav',
  title: 'Main Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'richImage'
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'navLinks'
    })
  ]
});
