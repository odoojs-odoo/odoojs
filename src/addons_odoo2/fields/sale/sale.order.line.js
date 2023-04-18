const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
  },

  currency_id: {},
  discount: {
    groups: 'product.group_discount_per_so_line'
  },

  display_name: {},
  display_type: {},
  name: {},
  order_id: {},
  order_partner_id: {},
  price_subtotal: {},
  price_tax: {},
  price_total: {},
  price_unit: {},
  product_id: {},
  product_uom: {
    string: 'Unit of Measure',
    groups: 'uom.group_uom'
  },

  product_uom_qty: {
    string: 'Qty'
  },

  product_updatable: {},
  qty_delivered: {},
  qty_invoiced: {},
  qty_to_invoice: {},
  salesman_id: {},
  tax_id: {}
}

const AddonsFields = {
  'sale.order.line': ModelFields
}

export default AddonsFields

