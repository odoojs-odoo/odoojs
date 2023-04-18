const ModelFields = {
  property_payment_term_id: {},
  property_supplier_payment_term_id: {},
  sale_order_count: {
    string: 'Sales'
  },

  sale_warn: {
    required: '1'
  },

  sale_warn_msg: {
    string: 'Message',
    required: [['sale_warn', '!=', false], ['sale_warn', '!=', 'no-message']],
    placeholder: 'Type a message...'
  }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

