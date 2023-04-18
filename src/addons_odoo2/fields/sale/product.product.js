const ModelFields = {
  sale_line_warn: {},
  sale_line_warn_msg: {
    required: [['sale_line_warn', '!=', 'no-message']],
    readonly: [['sale_line_warn', '=', 'no-message']],
    placeholder: 'Type a message...'
  },

  sales_count: {},
  uom_name: {}
}

const AddonsFields = {
  'product.product': ModelFields
}

export default AddonsFields

