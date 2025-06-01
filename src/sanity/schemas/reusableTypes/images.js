import { defineType, defineField } from 'sanity';

// https://www.sanity.io/plugins/sanity-plugin-cloudinary
export const RichImage = defineType({
  name: 'richImage',
  title: 'Rich Image',
  type: 'object',
  description: 'This asset is served from Cloudinary',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image Asset',
      type: 'cloudinary.asset'
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        '(ADA) A short description of the image. Should describe the visual contents of the image, i.e. "Medusa eating nachos", and not be used as cta-type text.',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (!context.parent?.asset && value) {
            return 'Cannot have alt text without an image';
          }
          if (context.parent?.asset && !value) {
            return 'Required';
          }
          return true;
        })
    })
  ],
  preview: {
    select: {
      title: 'altText',
      media: 'asset'
    }
  }
});
