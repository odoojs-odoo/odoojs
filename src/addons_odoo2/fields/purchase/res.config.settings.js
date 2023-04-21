const ModelFields = {
  company_currency_id: {},
  default_purchase_method: {},
  group_product_variant: {},
  group_send_reminder: {},
  group_stock_packaging: {},
  group_warning_purchase: {},
  lock_confirmed_po: {},
  module_account_3way_match: { string: '3-way matching' },
  module_purchase_product_matrix: {},
  module_purchase_requisition: {},
  po_double_validation: {},
  po_double_validation_amount: {},
  po_lock: {},
  po_order_approval: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

