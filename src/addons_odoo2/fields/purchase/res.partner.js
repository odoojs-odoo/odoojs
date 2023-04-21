const ModelFields = {
  property_purchase_currency_id: { groups: 'base.group_multi_currency' },
  purchase_order_count: { string: 'Purchases' },
  purchase_warn: { required: '1' },
  purchase_warn_msg: {
    required: [['purchase_warn', '!=', false], ['purchase_warn', '!=', 'no-message']],
    placeholder: 'Type a message...'
  },

  receipt_reminder_email: {},
  reminder_date_before_receipt: {},
  supplier_invoice_count: { string: 'Vendor Bills' }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

