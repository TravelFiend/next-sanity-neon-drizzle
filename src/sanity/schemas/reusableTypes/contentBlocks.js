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
      name: 'isFullWidth',
      title: 'Full Width Hero?',
      type: 'boolean'
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'siteColorsSelector'
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
          name: 'color',
          title: 'Overlay Color',
          type: 'color'
        }),
        defineField({
          name: 'opacity',
          title: 'Opacity',
          type: 'number',
          description: '0 = transparent, 100 = opaque',
          options: {
            list: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
          }
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
