import { defineType, defineField } from 'sanity';

// TODO: Get rid of the title field if we don't need it
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
