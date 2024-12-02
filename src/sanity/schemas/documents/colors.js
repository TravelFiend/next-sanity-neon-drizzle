import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'colors',
  title: 'Site Default Colors',
  type: 'document',
  fields: [
    defineField({
      name: 'fontColors',
      title: 'Font Colors',
      type: 'fontColors'
    }),
    defineField({
      name: 'themeColors',
      title: 'Theme Colors',
      type: 'themeColors'
    })
  ]
});
