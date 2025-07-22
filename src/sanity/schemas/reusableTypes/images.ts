import { defineType, defineField, type ValidationContext } from 'sanity';

// https://www.sanity.io/plugins/sanity-plugin-cloudinary
export const RichImage = defineType({
  name: 'richImage',
  title: 'Rich Image',
  type: 'object',
  description: 'This asset is served from Cloudinary',
  fields: [
    defineField({
      name: 'imageAsset',
      title: 'Image Asset',
      type: 'cloudinary.asset',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        '(ADA) A short description of the image. Should describe the visual contents of the image, i.e. "Medusa eating nachos", and not be used as cta-type text.',
      validation: Rule =>
        Rule.custom((value: unknown, context: ValidationContext) => {
          const parent = context.parent as {
            imageAsset: unknown;
          };

          if (!parent?.imageAsset && value) {
            return 'Cannot have alt text without an image';
          }
          if (parent?.imageAsset && !value) {
            return 'Alt text is required for images';
          }
          return true;
        })
    })
  ],
  preview: {
    select: {
      title: 'altText',
      media: 'imageAsset'
    }
  }
});
