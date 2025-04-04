import client from '../sanity/client-config';
import imageUrlBuilder from '@sanity/image-url';

// docs with listed methods for this package are here: https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);

const urlFor = source => {
  return builder.image(source);
};

export { urlFor };
