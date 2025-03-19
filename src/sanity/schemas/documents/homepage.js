import { defineType, defineField } from 'sanity';

const Homepage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'contentBlocks'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    })
  ]
});

export default Homepage;
