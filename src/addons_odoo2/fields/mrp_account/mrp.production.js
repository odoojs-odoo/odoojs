const ModelFields = {
  analytic_account_id: { groups: 'analytic.group_analytic_accounting' },
  name: {},
  show_valuation: { groups: 'stock.group_stock_manager' }
}

const AddonsFields = {
  'mrp.production': ModelFields
}

export default AddonsFields

