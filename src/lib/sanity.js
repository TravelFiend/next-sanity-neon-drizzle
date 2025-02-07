import client from '../sanity/config/client-config';
import imageUrlBuilder from '@sanity/image-url';

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const urlFor = source => {
  return builder.image(source);
};

export { urlFor };
