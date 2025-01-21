export const cartSchema = defineType({
    name: 'cart',
    title: 'Cart',
    type: 'document',
    fields: [
      defineField({
        name: 'userId',
        type: 'string',
        title: 'User ID',
      }),
      defineField({
        name: 'items',
        type: 'array',
        title: 'Cart Items',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'productId',
                type: 'reference',
                to: [{ type: 'product' }],
                title: 'Product',
              }),
              defineField({
                name: 'quantity',
                type: 'number',
                title: 'Quantity',
              }),
            ],
          },
        ],
      }),
    ],
  })
  