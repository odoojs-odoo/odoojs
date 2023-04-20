const ModelFields = {
  additional: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  date: {
    readonly: '1',
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
    string: 'Destination Moves',
    readonly: '1'
  },

  move_line_ids: {
    readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: {
      todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_operation_tree', 'default_product_uom_id': product_uom, 'default_picking_id': picking_id, 'default_move_id': id, 'default_product_id': product_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
    }
  },

  move_lines_count: {},
  move_orig_ids: {
    string: 'Origin Moves',
    readonly: '1'
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
    readonly: '===todo==',
    required: '1'
  },

  product_id_$_form_$$_537: {
    readonly: '1'
  },

  product_id_$_tree_$$_111: {
    readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]]
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging'
  },

  product_type: {},
  product_uom: {
    readonly: '===todo==',
    groups: 'uom.group_uom',
    string: '===todo=='
  },

  product_uom_$_form_$$_296: {
    readonly: '1'
  },

  product_uom_$_form_$$_818: {
    readonly: '1'
  },

  product_uom_$_tree_$$_215: {
    readonly: [['state', '!=', 'draft'], ['id', '!=', false]],
    string: 'Unit of Measure'
  },

  product_uom_$_tree_$$_596: {
    string: 'Unit'
  },

  product_uom_$_tree_$$_945: {
    string: 'Unit of Measure'
  },

  product_uom_category_id: {},
  product_uom_qty: {
    readonly: '===todo==',
    string: '===todo=='
  },

  product_uom_qty_$_form_$$_702: {
    readonly: '1'
  },

  product_uom_qty_$_tree_$$_948: {
    readonly: [['is_initial_demand_editable', '=', false]],
    string: 'Demand'
  },

  product_uom_qty_$_tree_$$_795: {
    string: 'Quantity'
  },

  quantity_done: {
    readonly: '===todo==',
    string: 'Done'
  },

  quantity_done_$_form: {
    readonly: '1'
  },

  quantity_done_$_tree: {
    readonly: [['is_quantity_done_editable', '=', false]]
  },

  reference: {},
  reserved_availability: {
    string: 'Reserved'
  },

  scrapped: {},
  sequence: {},
  show_details_visible: {},
  show_operations: {
    readonly: '1'
  },

  show_reserved_availability: {},
  state: {
    readonly: '0'
  }
}

const AddonsFields = {
  'stock.move': ModelFields
}

export default AddonsFields

