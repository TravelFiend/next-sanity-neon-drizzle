import ColorPreviewRadio from '../../studioUI/Colors';
import { defineType } from 'sanity';

const SiteColorsSelector = defineType({
  name: 'siteColorsSelector',
  title: 'Site Colors',
  type: 'string',
  options: {
    list: [
      { title: 'White', value: 'white' },
      { title: 'Primary', value: 'primary' },
      { title: 'Secondary', value: 'secondary' },
      { title: 'Tertiary', value: 'tertiary' },
      { title: 'Accent', value: 'accent' },
      { title: 'Highlight', value: 'highlight' },
      { title: 'Black', value: 'black' }
    ],
    layout: 'radio'
  },
  components: {
    input: ColorPreviewRadio
  }
});

export default SiteColorsSelector;
