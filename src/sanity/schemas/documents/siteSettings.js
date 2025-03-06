import { defineField, defineType } from 'sanity';

const GROUPS = [
  {
    name: 'mainNav',
    title: 'Main Navigation'
  },
  {
    name: 'footer',
    title: 'Footer'
  },
  {
    name: 'branding',
    title: 'Branding'
  },
  {
    name: 'seo',
    title: 'SEO'
  }
];

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: GROUPS,
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'mainNav',
      group: 'mainNav'
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer'
    }),
    defineField({
      name: 'fonts',
      title: 'Fonts',
      type: 'object',
      group: 'branding',
      fields: [
        defineField({
          name: 'headingFont',
          title: 'Heading Font',
          type: 'font'
        }),
        defineField({
          name: 'bodyFont',
          title: 'Body Font',
          type: 'font'
        }),
        defineField({
          name: 'captionFont',
          title: 'Caption Font',
          type: 'font'
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lightThemeColors',
      title: 'Light Theme Colors',
      type: 'colors',
      group: 'branding'
    }),
    defineField({
      name: 'darkThemeColors',
      title: 'Dark Theme Colors',
      type: 'colors',
      group: 'branding'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription'
    }
  }
});
