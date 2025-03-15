const textBlockFragment = `
  _type,
  title,
  subtitle,
  body,
  alignment
`;

const contentBlocksFragment = `
  _key,
  _type == "textBlock" => {
    ${textBlockFragment}
  }
`;

export { textBlockFragment, contentBlocksFragment };
