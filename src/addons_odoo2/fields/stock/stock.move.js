const ModelFields = {
  additional: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  date: {
    groups: 'base.group_no_one'
  },

  date_deadline: {},
  display_assign_serial: {},
  display_clear_serial: {},
  from_immediate_transfer: {},
  group_id: {},
  is_initial_demand_editable: {},
  is_locked: {},
  is_quantity_done_editable: {},
  location_dest_id: {
    string: 'To'
  },

  location_dest_usage: {},
  location_id: {
    string: 'From'
  },

  location_usage: {},
  move_dest_ids: {
    string: 'Destination Moves'
  },

  move_line_ids: {
    readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: {
      todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_operation_tree', 'default_product_uom_id': product_uom, 'default_picking_id': picking_id, 'default_move_id': id, 'default_product_id': product_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
    }
  },

  move_lines_count: {},
  move_orig_ids: {
    string: 'Origin Moves'
  },

  name: {},
  next_serial: {},
  next_serial_count: {},
  origin: {},
  picking_code: {},
  picking_id: {
    string: 'Reference'
  },

  picking_type_entire_packs: {},
  picking_type_id: {},
  procure_method: {
    groups: 'stock.group_adv_location',
    readonly: [['state', '!=', 'draft']]
  },

  product_id: {
    readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]]
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging'
  },

  product_type: {},
  product_uom: {
    groups: 'uom.group_uom',
    string: '===todo==',
    readonly: [['state', '!=', 'draft'], ['id', '!=', false]]
  },

  product_uom_$_tree_$$_454: {
    string: 'Unit'
  },

  product_uom_$_tree_$$_864: {
    string: 'Unit of Measure'
  },

  product_uom_$_tree_$$_969: {
    string: 'Unit of Measure'
  },

  product_uom_category_id: {},
  product_uom_qty: {
    string: '===todo==',
    readonly: [['is_initial_demand_editable', '=', false]]
  },

  product_uom_qty_$_tree_$$_548: {
    string: 'Demand'
  },

  product_uom_qty_$_tree_$$_728: {
    string: 'Quantity'
  },

  quantity_done: {
    string: 'Done',
    readonly: [['is_quantity_done_editable', '=', false]]
  },

  reference: {},
  reserved_availability: {
    string: 'Reserved'
  },

  scrapped: {},
  sequence: {},
  show_details_visible: {},
  show_operations: {},
  show_reserved_availability: {},
  state: {}
}

const AddonsFields = {
  'stock.move': ModelFields
}

export default AddonsFields

