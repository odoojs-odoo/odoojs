const ModelFields = {
  account_id: { required: [['property_valuation', '=', 'real_time']] },
  account_journal_id: { required: [['property_valuation', '=', 'real_time']] },
  added_value: {},
  company_id: {},
  currency_id: {},
  current_quantity_svl: {},
  current_value_svl: {},
  date: {},
  new_value: {},
  new_value_by_qty: {},
  product_id: {},
  product_uom_name: {},
  property_valuation: {},
  reason: {}
}

const AddonsFields = {
  'stock.valuation.layer.revaluation': ModelFields
}

export default AddonsFields

