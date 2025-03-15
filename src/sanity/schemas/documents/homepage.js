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
    })
  ]
});

export default Homepage;
