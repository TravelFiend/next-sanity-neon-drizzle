import { ImageTextBlockRes } from '@/sanity/types/derivedTypes';

const textBlockMock: ImageTextBlockRes['text'] = {
  _type: 'textBlock',
  alignment: 'left',
  body: 'A bunch of bodily words',
  subtitle: 'Subtitle',
  title: 'Title'
};

export { textBlockMock };
