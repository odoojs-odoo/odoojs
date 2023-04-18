const ModelFields = {
  account_move_id: {
    groups: 'account.group_account_invoice'
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  cost_method: {},
  create_date: {
    string: 'Date'
  },

  currency_id: {},
  description: {},
  product_id: {},
  quantity: {
    string: 'Moved Quantity'
  },

  quantity_svl: {},
  reference: {},
  remaining_qty: {},
  stock_move_id: {},
  stock_valuation_layer_id: {},
  unit_cost: {},
  uom_id: {
    groups: 'uom.group_uom'
  },

  value: {}
}

const AddonsFields = {
  'stock.valuation.layer': ModelFields
}

export default AddonsFields

