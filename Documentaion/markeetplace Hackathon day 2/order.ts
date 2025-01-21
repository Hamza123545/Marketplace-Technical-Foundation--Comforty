export const orderSchema = defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      defineField({
        name: 'orderId',
        type: 'string',
        title: 'Order ID',
      }),
      defineField({
        name: 'status',
        type: 'string',
        title: 'Order Status',
      }),
      defineField({
        name: 'total',
        type: 'number',
        title: 'Total Price',
      }),
      defineField({
        name: 'userId',
        type: 'string',
        title: 'User ID',
      }),
    ],
  })
  