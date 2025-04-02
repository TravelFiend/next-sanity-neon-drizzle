import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImageIcon, TextIcon } from '@sanity/icons';

const ContentBlocks = defineType({
  name: 'contentBlocks',
  title: 'Page Content',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'heroBlock',
      type: 'heroBlock'
    }),
    defineArrayMember({
      name: 'textBlock',
      type: 'textBlock'
    })
  ]
});

const HeroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'richImage'
    }),
    defineField({
      name: 'paddingX',
      title: 'Padding X',
      type: 'string',
      initialValue: '0',
      options: {
        list: [
          { title: '0px', value: '0' },
          { title: '12px', value: '3' },
          { title: '20px', value: '5' },
          { title: '32px', value: '8' },
          { title: '40px', value: '10' },
          { title: '48px', value: '12' },
          { title: '56px', value: '14' },
          { title: '64px', value: '16' },
          { title: '72px', value: '18' },
          { title: '80px', value: '20' }
        ]
      },
      description: 'Left/right padding from edge of screen.'
    }),
    defineField({
      name: 'paddingY',
      title: 'Padding Y',
      type: 'string',
      initialValue: '0',
      options: {
        list: [
          { title: '0px', value: '0' },
          { title: '12px', value: '3' },
          { title: '20px', value: '5' },
          { title: '32px', value: '8' },
          { title: '40px', value: '10' },
          { title: '48px', value: '12' },
          { title: '56px', value: '14' },
          { title: '64px', value: '16' },
          { title: '72px', value: '18' },
          { title: '80px', value: '20' }
        ]
      },
      description: 'Top/bottom padding.'
    }),
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
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'ctaButton'
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'horizontalAlign',
      description: 'This aligns the text only'
    }),
    defineField({
      name: 'textBlockAlignment',
      title: 'Text Block Alignment',
      type: 'contentAlign',
      description: 'This positions the text element within the hero image.'
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay',
      type: 'object',
      fields: [
        defineField({
          name: 'coverage',
          title: 'Coverage',
          type: 'string',
          initialValue: 'none',
          options: {
            list: [
              { title: 'No Overlay', value: 'none' },
              { title: 'Full Image', value: 'fullImage' },
              { title: 'Text Only', value: 'textOnly' }
            ]
          }
        }),
        defineField({
          name: 'opacity',
          title: 'Opacity',
          type: 'number',
          initialValue: 100,
          description: '0 = transparent, 100 = opaque',
          list: [
            { title: '0', value: 0 },
            { title: '0.1', value: 10 },
            { title: '0.2', value: 20 },
            { title: '0.3', value: 30 },
            { title: '0.4', value: 40 },
            { title: '0.5', value: 50 },
            { title: '0.6', value: 60 },
            { title: '0.7', value: 70 },
            { title: '0.8', value: 80 },
            { title: '0.9', value: 90 },
            { title: '1', value: 100 }
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    }
  }
});

const TextBlock = defineType({
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
      type: 'horizontalAlign'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      body: 'body'
    },
    prepare({ title, subtitle, body }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || body || 'No subtitle or body provided'
      };
    }
  }
});

export { ContentBlocks, HeroBlock, TextBlock };
