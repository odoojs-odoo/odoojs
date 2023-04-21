const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  create_date: {},
  delivery_count: {},
  display_complete: {},
  last_delivery_partner_id: { string: 'Transfer to' },
  name: { placeholder: 'e.g. LOT/0001/20121' },
  note: {},
  product_id: {
    context: {
      default_detailed_type: 'product',
      default_tracking: 'lot'
    },
    readonly: '===todo=='
  },

  product_id_$_form: { readonly: "context.get['set_product_readonly', False]" },
  product_id_$_tree: { readonly: '1' },
  product_qty: {},
  product_uom_id: { groups: 'uom.group_uom' },
  ref: {}
}

const AddonsFields = {
  'stock.lot': ModelFields
}

export default AddonsFields

