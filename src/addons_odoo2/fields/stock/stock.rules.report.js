const ModelFields = {
  product_has_variants: {},
  product_id: {
    domain: {
      todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
    },
    readonly: [['product_has_variants', '=', false]]
  },

  product_tmpl_id: {},
  warehouse_ids: {
    groups: 'stock.group_stock_multi_warehouses'
  }
}

const AddonsFields = {
  'stock.rules.report': ModelFields
}

export default AddonsFields

