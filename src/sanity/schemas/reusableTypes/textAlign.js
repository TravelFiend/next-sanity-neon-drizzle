import { defineField } from 'sanity';

const TextAlign = defineField({
  name: 'textAlign',
  title: 'Text Align',
  type: 'string',
  options: {
    list: [
      { title: 'Left Align', value: 'left' },
      { title: 'Center Align', value: 'center' },
      { title: 'Right Align', value: 'right' }
    ],
    layout: 'radio',
    direction: 'horizontal'
  },
  preview: {
    select: {
      horizontalAlign: 'horizontalAlign'
    },
    prepare({ horizontalAlign }) {
      return {
        title: `Horizontal Align: ${horizontalAlign || 'Unset'}`
      };
    }
  }
});

export default TextAlign;
