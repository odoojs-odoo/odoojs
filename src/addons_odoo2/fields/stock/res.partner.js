const ModelFields = {
  picking_warn: { required: '1' },
  picking_warn_msg: {
    required: [['picking_warn', '!=', false], ['picking_warn', '!=', 'no-message']],
    placeholder: 'Type a message...'
  },

  property_stock_customer: {},
  property_stock_supplier: {}
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

