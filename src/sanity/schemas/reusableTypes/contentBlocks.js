import { defineArrayMember, defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

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
  icon: TextIcon,
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
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'textAlign'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle' || 'body' || null
    }
  }
});

export { ContentBlocks, TextBlock };
