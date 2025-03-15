import { defineArrayMember, defineField, defineType } from 'sanity';

const ContentBlocks = defineType({
  name: 'contentBlocks',
  title: 'Page Content',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'textBlock',
      type: 'textBlock'
    })
  ]
});

export const TextBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'string'
    })
  ]
});

export { ContentBlocks, TextBlock };
