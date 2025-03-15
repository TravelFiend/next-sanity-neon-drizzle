const textBlockFragment = `
  title,
  subtitle,
  body
`;

const contentBlocksFragment = `
  _key,
  _type == "textBlock" => {
    ${textBlockFragment}
  }
`;

export { textBlockFragment, contentBlocksFragment };
