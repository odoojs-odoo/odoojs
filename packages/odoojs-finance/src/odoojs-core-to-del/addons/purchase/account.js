export default {
  models: {
    'account.invoice': {
      fields: [
        'purchase_id',
        //  'vendor_bill_purchase_id',
      ],
    },

    'account.invoice.line': {
      fields: ['purchase_line_id', 'purchase_id'],
    },
  },
};
