const ModelFields = {
  available_quantity: {
    string: 'Available Quantity'
  },

  company_id: {
    groups: 'base.group_multi_company'
  },

  create_date: {},
  cyclic_inventory_frequency: {},
  id: {},
  inventory_date: {},
  inventory_diff_quantity: {
    string: 'Difference'
  },

  inventory_quantity: {},
  inventory_quantity_auto_apply: {
    string: 'On Hand Quantity'
  },

  inventory_quantity_set: {},
  is_outdated: {},
  last_count_date: {},
  location_id: {
    domain: [['usage', 'in', ['internal', 'transit']]],
    readonly: [['id', '!=', false]]
  },

  lot_id: {
    groups: 'stock.group_production_lot',
    readonly: '===todo==',
    required: [['tracking', '!=', 'none']],
    context: {
      todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}"
    }
  },

  lot_id_$_form: {
    readonly: [['tracking', 'not in', ['serial', 'lot']]]
  },

  lot_id_$_tree_$$_151: {
    readonly: ['|', ['id', '!=', false], ['tracking', 'not in', ['serial', 'lot']]]
  },

  lot_id_$_tree_$$_383: {
    readonly: ['|', ['tracking', 'not in', ['serial', 'lot']], '&', ['id', '!=', false], '|', ['lot_id', '!=', false], ['quantity', '!=', 0]]
  },

  owner_id: {
    groups: 'stock.group_tracking_owner',
    readonly: [['id', '!=', false]]
  },

  package_id: {
    groups: 'stock.group_tracking_lot',
    readonly: [['id', '!=', false]]
  },

  priority: {},
  product_categ_id: {},
  product_id: {
    readonly: [['id', '!=', false]]
  },

  product_uom_id: {
    groups: 'uom.group_uom',
    string: '===todo=='
  },

  product_uom_id_$_tree_$$_695: {
    string: 'Unit'
  },

  product_uom_id_$_tree_$$_879: {
    string: 'UoM'
  },

  quantity: {
    string: 'On Hand Quantity'
  },

  reserved_quantity: {},
  sn_duplicated: {},
  storage_category_id: {
    groups: 'stock.group_stock_storage_categories'
  },

  tracking: {},
  user_id: {
    string: 'User'
  },

  write_date: {}
}

const AddonsFields = {
  'stock.quant': ModelFields
}

export default AddonsFields

