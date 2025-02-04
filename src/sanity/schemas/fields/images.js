import { defineField } from 'sanity';

export const RichImage = defineField({
  name: 'richImage',
  title: 'Rich Image',
  type: 'image',
  fields: [
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        '(ADA) A short description of the image. Should describe the visual contents of the image, i.e. "Medusa eating nachos", and not be used as cta-type text.',
      validation: rule =>
        rule.custom((value, context) => {
          if (!context.parent?.asset && value) {
            return 'Cannot not have alt without an image';
          }
          if (context.parent?.asset && !value) {
            return 'Required';
          }
          return true;
        })
    })
  ]
});
