export const getDefaultDocumentNode = S => {
  return S.document().views([
    // Gives all documents the JSON preview,
    // as well as the default form view
    S.view.form()
  ]);
};

const structure = S =>
  S.list()
    .title('Base')
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
        .title('Settings')
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Metadata')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Site Colors')
                .child(S.document().schemaType('colors').documentId('colors')),
              S.listItem()
                .title('Main Navigation')
                .child(S.document().schemaType('mainNav').documentId('mainNav'))
            ])
        ),
      ...S.documentTypeListItems().filter(
        listItem =>
          ![
            'siteSettings',
            'mainNav',
            'colors',
            'parentProduct',
            'productVariant'
          ].includes(listItem.getId())
      )
    ]);

export default structure;
