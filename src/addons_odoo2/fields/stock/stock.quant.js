const ModelFields = {
  available_quantity: { string: 'Available Quantity' },
  company_id: { groups: 'base.group_multi_company' },
  create_date: {},
  cyclic_inventory_frequency: {},
  id: {},
  inventory_date: {},
  inventory_diff_quantity: { string: 'Difference' },
  inventory_quantity: {},
  inventory_quantity_auto_apply: {
    string: 'On Hand Quantity',
    readonly: '0'
  },

  inventory_quantity_set: {},
  is_outdated: {},
  last_count_date: { readonly: '1' },
  location_id: {
    readonly: '===todo==',
    domain: [['usage', 'in', ['internal', 'transit']]]
  },

  location_id_$_form: { readonly: '0' },
  location_id_$_tree_$$_545: { readonly: [['id', '!=', false]] },
  location_id_$_tree_$$_577: { readonly: [['id', '!=', false]] },
  lot_id: {
    groups: 'stock.group_production_lot',
    readonly: '===todo==',
    required: [['tracking', '!=', 'none']],
    context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" }
  },

  lot_id_$_form: { readonly: [['tracking', 'not in', ['serial', 'lot']]] },
  lot_id_$_tree_$$_581: { readonly: ['|', ['id', '!=', false], ['tracking', 'not in', ['serial', 'lot']]] },
  lot_id_$_tree_$$_802: { readonly: ['|', ['tracking', 'not in', ['serial', 'lot']], '&', ['id', '!=', false], '|', ['lot_id', '!=', false], ['quantity', '!=', 0]] },
  owner_id: {
    groups: 'stock.group_tracking_owner',
    readonly: '===todo=='
  },

  owner_id_$_form: { readonly: '0' },
  owner_id_$_tree_$$_298: { readonly: [['id', '!=', false]] },
  owner_id_$_tree_$$_616: { readonly: [['id', '!=', false]] },
  package_id: {
    groups: 'stock.group_tracking_lot',
    readonly: '===todo=='
  },

  package_id_$_form: { readonly: '0' },
  package_id_$_tree_$$_770: { readonly: [['id', '!=', false]] },
  package_id_$_tree_$$_961: { readonly: [['id', '!=', false]] },
  priority: {},
  product_categ_id: {},
  product_id: { readonly: '===todo==' },
  product_id_$_form: { readonly: '0' },
  product_id_$_tree_$$_344: { readonly: "context.get['single_product', False]" },
  product_id_$_tree_$$_473: { readonly: "context.get['single_product', False]" },
  product_uom_id: {
    groups: 'uom.group_uom',
    string: '===todo=='
  },

  product_uom_id_$_tree_$$_613: { string: 'Unit' },
  product_uom_id_$_tree_$$_746: { string: 'UoM' },
  quantity: { string: 'On Hand Quantity' },
  reserved_quantity: {},
  sn_duplicated: {},
  storage_category_id: { groups: 'stock.group_stock_storage_categories' },
  tracking: {},
  user_id: { string: 'User' },
  write_date: {}
}

const AddonsFields = {
  'stock.quant': ModelFields
}

export default AddonsFields

