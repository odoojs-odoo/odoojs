const ModelFields = {
  stock_move_sms_validation: {},
  stock_sms_confirmation_template_id: {
    required: [['stock_move_sms_validation', '=', true]],
    context: { default_model: 'stock.picking' }
  }
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

