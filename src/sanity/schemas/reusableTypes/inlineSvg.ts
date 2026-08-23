import { defineType } from 'sanity';

export default defineType({
  name: 'inlineSvg',
  title: 'Inline SVG',
  type: 'text',
  description:
    'Inline SVG markup, e.g. <svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>'
});
