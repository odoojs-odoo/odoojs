const ModelFields = {
  company_id: {},
  date_planned: {},
  product_has_variants: {},
  product_id: {
    domain: {
      todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
    },
    readonly: [['product_has_variants', '=', false]]
  },

  product_tmpl_id: {},
  product_uom_category_id: {},
  product_uom_id: {
    groups: 'uom.group_uom',
    domain: {
      todo_ctx: "[('category_id', '=', product_uom_category_id)]"
    }
  },

  quantity: {},
  route_ids: {},
  warehouse_id: {
    groups: 'stock.group_stock_multi_warehouses'
  }
}

const AddonsFields = {
  'product.replenish': ModelFields
}

export default AddonsFields

