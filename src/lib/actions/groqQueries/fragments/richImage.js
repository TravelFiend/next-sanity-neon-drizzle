// https://www.sanity.io/plugins/sanity-plugin-cloudinary
const richImageFragment = `
  imageAsset{
    _type,
    _version,
    public_id,
    resource_type,
    type,
    format,
    version,
    url,
    secure_url,
    width,
    height,
    bytes,
    duration,
    tags,
    created_at,
    access_mode
  },
  altText
`;

export { richImageFragment };
