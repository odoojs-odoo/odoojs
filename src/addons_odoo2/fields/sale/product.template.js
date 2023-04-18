const ModelFields = {
  detailed_type: {},
  product_tooltip: {},
  product_variant_count: {},
  sale_line_warn: {
    string: 'Warning'
  },

  sale_line_warn_msg: {
    string: 'Message',
    required: [['sale_line_warn', '!=', 'no-message']],
    readonly: [['sale_line_warn', '=', 'no-message']],
    placeholder: 'Type a message...'
  },

  sales_count: {},
  uom_name: {}
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

