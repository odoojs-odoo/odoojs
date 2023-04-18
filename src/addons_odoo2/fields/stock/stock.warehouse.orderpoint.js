const ModelFields = {
  active: {},
  allowed_location_ids: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  group_id: {
    groups: 'stock.group_adv_location'
  },

  location_id: {
    groups: 'stock.group_stock_multi_locations',
    domain: {
      todo_ctx: "[('id', 'in', allowed_location_ids)]"
    }
  },

  name: {},
  product_category_id: {},
  product_id: {
    readonly: [['product_id', '!=', false]]
  },

  product_max_qty: {},
  product_min_qty: {},
  product_tmpl_id: {},
  product_uom_name: {
    string: 'UoM',
    groups: 'uom.group_uom'
  },

  qty_forecast: {},
  qty_multiple: {
    string: 'Quantity Multiple'
  },

  qty_on_hand: {},
  qty_to_order: {},
  route_id: {},
  trigger: {},
  visibility_days: {},
  warehouse_id: {
    groups: '===todo=='
  },

  warehouse_id_$_form: {
    groups: 'stock.group_stock_multi_locations'
  },

  warehouse_id_$_tree: {
    groups: 'stock.group_stock_multi_warehouses'
  }
}

const AddonsFields = {
  'stock.warehouse.orderpoint': ModelFields
}

export default AddonsFields

