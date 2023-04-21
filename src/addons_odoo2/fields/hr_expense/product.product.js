const ModelFields = {
  active: {},
  barcode: {},
  can_be_expensed: {},
  company_id: { groups: 'base.group_multi_company' },
  default_code: { readonly: '1' },
  description: {
    placeholder: 'This note will be shown to users when they select this expense product.',
    string: 'Internal Note',
    readonly: '1'
  },

  detailed_type: {},
  id: {},
  image_1920: {},
  lst_price: { string: 'Sales Price' },
  name: {
    placeholder: 'e.g. Lunch',
    readonly: '1'
  },

  product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
  product_variant_count: {},
  property_account_expense_id: { groups: 'account.group_account_readonly' },
  standard_price: {},
  supplier_taxes_id: {
    context: {
      default_type_tax_use: 'purchase',
      default_price_include: 1
    }
  },

  type: {},
  uom_id: { groups: 'uom.group_uom' },
  uom_po_id: {}
}

const AddonsFields = {
  'product.product': ModelFields
}

export default AddonsFields

