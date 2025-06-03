import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImageIcon, TextIcon, PanelLeftIcon } from '@sanity/icons';

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
    }),
    defineArrayMember({
      name: 'carouselBlock',
      type: 'carouselBlock'
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
      type: 'siteColorsSelector',
      description: 'Background color seen when hero is not full width',
      hidden: ({ parent }) => parent?.isFullWidth
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
      name: 'textColor',
      title: 'Text Color',
      type: 'siteColorsSelector'
    }),
    defineField({
      name: 'showTextOutline',
      title: 'Show Text Outline',
      type: 'boolean'
    }),
    defineField({
      name: 'textOutlineColor',
      title: 'Text Outline Color',
      type: 'siteColorsSelector',
      hidden: ({ parent }) => !parent?.showTextOutline
    }),
    defineField({
      name: 'textOutlineSize',
      title: 'Text Outline Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' }
        ]
      },
      hidden: ({ parent }) => !parent?.showTextOutline
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
          type: 'siteColorsSelector',
          hidden: ({ parent }) =>
            !parent?.coverage || parent?.coverage === 'none'
        }),
        defineField({
          name: 'opacity',
          title: 'Opacity',
          type: 'number',
          description: '0 = transparent, 100 = opaque',
          options: {
            list: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
          },
          hidden: ({ parent }) =>
            !parent?.coverage || parent?.coverage === 'none'
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

const ImageTextBlock = defineType({
  name: 'imageTextBlock',
  title: 'Image/Text Block',
  type: 'object',
  icon: PanelLeftIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'richImage'
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'textBlock'
    }),
    defineField({
      name: 'imageAlignment',
      title: 'Image Alignment',
      type: 'string',
      description:
        'Aligns the image to the left or to the right within the block',
      initialValue: 'left',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    })
  ],
  preview: {
    select: {
      title: 'text.title',
      subtitle: 'text.subtitle',
      image: 'image'
    },
    prepare({ title, subtitle, image }) {
      return {
        title: title || 'Untitled Image/Text Block',
        subtitle: subtitle || 'No subtitle provided',
        media: image
      };
    }
  }
});

/* TODO: Update to array of references when we have artists/musicians schemas
  https://www.sanity.io/docs/studio/array-type#r7awwxtw */

const CarouselBlock = defineType({
  name: 'carouselBlock',
  title: 'Carousel Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'richImage' }],
      validation: Rule => Rule.required().min(3)
    }),
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      initialValue: 'horizontal',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'direction'
    },
    prepare({ title }) {
      return {
        title: `Carousel Block - ${title.charAt(0).toUpperCase() + title.slice(1)}`
      };
    }
  }
});

export { ContentBlocks, HeroBlock, TextBlock, ImageTextBlock, CarouselBlock };
