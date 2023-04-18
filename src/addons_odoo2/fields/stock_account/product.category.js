const ModelFields = {
  property_cost_method: {},
  property_stock_account_input_categ_id: {
    required: [['property_valuation', '=', 'real_time']]
  },

  property_stock_account_output_categ_id: {
    required: [['property_valuation', '=', 'real_time']]
  },

  property_stock_journal: {
    required: [['property_valuation', '=', 'real_time']]
  },

  property_stock_valuation_account_id: {
    required: [['property_valuation', '=', 'real_time']]
  },

  property_valuation: {
    groups: 'account.group_account_readonly,stock.group_stock_manager'
  }
}

const AddonsFields = {
  'product.category': ModelFields
}

export default AddonsFields

