import { defineType, defineField } from 'sanity';

const ProductVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    defineField({
      name: 'variantTitle',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'variantSlug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'variantTitle'
      }
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.precision(2)
    }),
    defineField({
      name: 'variantImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ]
});

export default ProductVariant;
