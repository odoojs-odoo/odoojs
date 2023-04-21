const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  currency_id: {},
  discount: {
    groups: 'product.group_discount_per_so_line',
    readonly: '1'
  },

  display_name: { readonly: '1' },
  display_type: {},
  name: { readonly: '1' },
  order_id: { readonly: '1' },
  order_partner_id: {},
  price_subtotal: {},
  price_tax: {},
  price_total: {},
  price_unit: { readonly: '1' },
  product_id: { readonly: '1' },
  product_uom: {
    readonly: '1',
    string: 'Unit of Measure',
    groups: 'uom.group_uom'
  },

  product_uom_qty: {
    readonly: '1',
    string: 'Qty'
  },

  product_updatable: {},
  qty_delivered: { readonly: '1' },
  qty_invoiced: {},
  qty_to_invoice: {},
  salesman_id: {},
  tax_id: { readonly: '1' }
}

const AddonsFields = {
  'sale.order.line': ModelFields
}

export default AddonsFields

