import { richImageFragment } from './richImage';

const heroBlockFragment = `
  _type,
  title,
  subtitle,
  image{
    ${richImageFragment}
  }
`;

const textBlockFragment = `
  _type,
  title,
  subtitle,
  body,
  alignment
`;

const contentBlocksFragment = `
  _key,
  _type == "heroBlock" => {
    ${heroBlockFragment}
  },
  _type == "textBlock" => {
    ${textBlockFragment}
  }
`;

export { textBlockFragment, contentBlocksFragment };
