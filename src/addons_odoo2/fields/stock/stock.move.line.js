const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
  },

  create_uid: {
    string: 'Done By'
  },

  date: {},
  is_initial_demand_editable: {},
  is_locked: {},
  location_dest_id: {
    groups: 'stock.group_stock_multi_locations',
    domain: {
      todo_ctx: "[('id', 'child_of', parent.location_dest_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
    },
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  location_dest_usage: {},
  location_id: {
    groups: 'stock.group_stock_multi_locations',
    domain: {
      todo_ctx: "[('id', 'child_of', parent.location_id), '|', ('company_id', '=', False), ('company_id', '=', company_id), ('usage', '!=', 'view')]"
    },
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  location_usage: {},
  lot_id: {
    groups: 'stock.group_production_lot',
    context: '===todo==',
    domain: {
      todo_ctx: "[('product_id', '=', parent.product_id), ('company_id', '=', company_id)]"
    },
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  lot_id_$_form: {
    context: {
      todo_ctx: "{'default_product_id': product_id, 'active_picking_id': picking_id, 'default_company_id': company_id}"
    }
  },

  lot_id_$_tree_$$_799: {
    context: {
      todo_ctx: "{                             'active_picking_id': picking_id,                             'default_company_id': parent.company_id,                             'default_product_id': parent.product_id,                         }"
    }
  },

  lot_id_$_tree_$$_928: {
    context: {
      todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id, 'active_picking_id': picking_id}"
    }
  },

  lot_name: {
    groups: 'stock.group_production_lot',
    string: 'Lot/Serial Number',
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
    placeholder: 'Write your SN/LN one by one or copy paste a list.',
    context: {
      todo_ctx: "{'default_product_id': product_id}"
    }
  },

  lots_visible: {},
  move_id: {},
  origin: {},
  owner_id: {
    string: 'Owner',
    groups: 'stock.group_tracking_owner',
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  package_id: {
    string: 'Source Package',
    groups: 'stock.group_tracking_lot',
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  package_level_id: {},
  picking_code: {},
  picking_id: {},
  picking_partner_id: {},
  product_id: {
    readonly: ['|', ['state', '=', 'done'], ['move_id', '!=', false]],
    context: {
      default_detailed_type: 'product'
    },
    required: '1'
  },

  product_uom_category_id: {},
  product_uom_id: {
    string: '===todo==',
    groups: 'uom.group_uom',
    readonly: '===todo=='
  },

  product_uom_id_$_form_$$_101: {
    string: 'Unit of Measure'
  },

  product_uom_id_$_form_$$_404: {
    string: 'Unit of Measure'
  },

  product_uom_id_$_tree_$$_609: {
    string: 'Unit of Measure'
  },

  product_uom_id_$_tree_$$_750: {
    string: 'Unit'
  },

  product_uom_id_$_tree_$$_951: {
    string: 'Unit of Measure',
    readonly: ['|', '|', ['reserved_uom_qty', '!=', 0.0], '&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true], '&', ['state', '=', 'done'], ['id', '!=', false]]
  },

  product_uom_id_$_tree_$$_863: {
    readonly: [['state', '!=', 'draft'], ['id', '!=', false]]
  },

  qty_done: {
    string: '===todo==',
    readonly: '===todo=='
  },

  qty_done_$_tree_$$_435: {
    string: 'Quantity'
  },

  qty_done_$_tree_$$_751: {
    string: 'Quantity Done'
  },

  qty_done_$_tree_$$_765: {
    readonly: [['state', 'in', ('done', 'cancel')], ['is_locked', '=', true]]
  },

  qty_done_$_tree_$$_955: {
    readonly: ['|', '&', ['state', '=', 'done'], ['is_locked', '=', true], '&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]]
  },

  reference: {
    string: 'Reference'
  },

  reserved_uom_qty: {
    readonly: '1'
  },

  result_package_id: {
    string: 'Destination Package',
    groups: 'stock.group_tracking_lot',
    readonly: ['&', ['package_level_id', '!=', false], ['parent.picking_type_entire_packs', '=', true]],
    context: {
      todo_ctx: "{'picking_id': picking_id}"
    }
  },

  state: {}
}

const AddonsFields = {
  'stock.move.line': ModelFields
}

export default AddonsFields

