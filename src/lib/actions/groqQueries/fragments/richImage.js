// https://www.sanity.io/plugins/sanity-plugin-cloudinary
// TODO: only query needed properties
const richImageFragment = `
  imageAsset{
    _type,
    _key,
    _version,
    public_id,
    resource_type,
    secure_url,
    width,
    height,
    duration,
    tags
  },
  altText
`;

export { richImageFragment };
