import { defineField, defineType } from 'sanity';

const CTAButton = defineType({
  name: 'ctaButton',
  title: 'Call to Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'CTAButton Text',
      type: 'string'
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'basicLink'
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'horizontalAlign'
    })
  ]
});

export default CTAButton;
