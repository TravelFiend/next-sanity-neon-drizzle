import { defineType } from 'sanity';

export default defineType({
  name: 'font',
  title: 'Font',
  type: 'string',
  options: {
    list: ['serif', 'sans-serif', 'mono'],
    layout: 'dropdown'
  }
});
