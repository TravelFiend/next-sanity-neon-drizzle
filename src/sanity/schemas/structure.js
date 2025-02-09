export const getDefaultDocumentNode = S => {
  return S.document().views([]);
};

const structure = S =>
  S.list()
    .title('MJM Admin')
    .items([
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Product Documents')
            .items([
              S.listItem()
                .title('Parent Products')
                .child(
                  S.documentTypeList('parentProduct').defaultOrdering([
                    { field: 'productTitle', direction: 'asc' }
                  ])
                ),
              S.listItem()
                .title('Product Variants')
                .child(
                  S.documentTypeList('productVariant').defaultOrdering([
                    { field: 'variantTitle', direction: 'asc' }
                  ])
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      ...S.documentTypeListItems().filter(
        listItem =>
          !['siteSettings', 'parentProduct', 'productVariant'].includes(
            listItem.getId()
          )
      )
    ]);

export default structure;
