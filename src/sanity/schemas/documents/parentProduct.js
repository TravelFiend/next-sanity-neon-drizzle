import { defineArrayMember, defineField, defineType } from 'sanity';

const ParentProduct = defineType({
  name: 'parentProduct',
  title: 'Parent Product',
  type: 'document',
  fields: [
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'number',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productTitle',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productSlug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'productTitle'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().precision(2)
    }),
    defineField({
      name: 'productImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'productVariants',
      title: 'Product Variants',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'productVariants',
          title: 'Variants',
          type: 'reference',
          to: [{ type: 'productVariant' }]
        })
      ]
    })
  ]
});

export default ParentProduct;
