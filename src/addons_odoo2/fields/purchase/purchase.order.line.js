const ModelFields = {
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  company_id: { groups: 'base.group_multi_company' },
  currency_id: {},
  date_approve: {},
  date_order: {},
  date_planned: { readonly: '1' },
  invoice_lines: {},
  name: {},
  order_id: {},
  partner_id: { string: 'Vendor' },
  price_subtotal: {},
  price_unit: {},
  product_id: { readonly: '1' },
  product_qty: { readonly: '1' },
  product_uom: {
    groups: 'uom.group_uom',
    readonly: '1'
  },

  product_uom_qty: {},
  taxes_id: { domain: [['type_tax_use', '=', 'purchase']] }
}

const AddonsFields = {
  'purchase.order.line': ModelFields
}

export default AddonsFields

