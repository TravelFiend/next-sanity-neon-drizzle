import { defineField } from 'sanity';

const HorizontalAlign = defineField({
  name: 'horizontalAlign',
  title: 'Horizontal Align',
  type: 'string',
  options: {
    list: [
      { title: 'Left Align', value: 'left' },
      { title: 'Center Align', value: 'center' },
      { title: 'Right Align', value: 'right' }
    ],
    layout: 'radio',
    direction: 'horizontal'
  }
});

const VerticalAlign = defineField({
  name: 'verticalAlign',
  title: 'Vertical Align',
  type: 'string',
  options: {
    list: [
      { title: 'Top', value: 'top' },
      { title: 'Center', value: 'center' },
      { title: 'Bottom', value: 'bottom' }
    ],
    layout: 'radio',
    direction: 'horizontal'
  }
});

const ContentAlign = defineField({
  name: 'contentAlign',
  title: 'Content Align',
  type: 'object',
  fields: [HorizontalAlign, VerticalAlign],
  preview: {
    select: {
      horizontalAlign: 'horizontalAlign',
      verticalAlign: 'verticalAlign'
    },
    prepare({ horizontalAlign, verticalAlign }) {
      return {
        title: `Horizontal Align: ${horizontalAlign}, Vertical Align: ${verticalAlign}`
      };
    }
  }
});

export { ContentAlign, HorizontalAlign, VerticalAlign };
