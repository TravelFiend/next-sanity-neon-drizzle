import { defineField, defineType } from 'sanity';

const CTAButton = defineType({
  name: 'ctaButton',
  title: 'Call to Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'basicLink'
    }),
    defineField({
      name: 'alignment',
      title: 'Button Text Alignment',
      type: 'horizontalAlign'
    })
  ]
});

export default CTAButton;
