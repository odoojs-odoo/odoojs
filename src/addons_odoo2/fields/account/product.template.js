const ModelFields = {
  activity_exception_decoration: {},
  default_code: {},
  list_price: {},
  name: {},
  property_account_expense_id: { groups: 'account.group_account_readonly' },
  property_account_income_id: { groups: 'account.group_account_readonly' },
  supplier_taxes_id: {
    context: {
      default_type_tax_use: 'purchase',
      search_default_purchase: 1,
      search_default_service: false,
      search_default_goods: false
    }
  },

  tax_string: {},
  taxes_id: {
    context: {
      default_type_tax_use: 'sale',
      search_default_sale: 1,
      search_default_service: false,
      search_default_goods: false
    }
  }
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

