const ModelFields = {
  activity_exception_decoration: {},
  backorder_id: {},
  company_id: { groups: 'base.group_multi_company' },
  date_deadline: {},
  date_done: { string: 'Effective Date' },
  group_id: { groups: 'base.group_no_one' },
  has_packages: {},
  has_scrap_move: {},
  has_tracking: {},
  hide_picking_type: {},
  id: {},
  immediate_transfer: {},
  is_locked: {},
  is_signed: {
    string: 'Signed',
    groups: 'stock.group_stock_sign_delivery'
  },

  json_popover: {},
  location_dest_id: {
    groups: '===todo==',
    string: 'To'
  },

  location_dest_id_$_form_$$_148: { groups: 'stock.group_stock_multi_locations' },
  location_dest_id_$_form_$$_549: { groups: '!stock.group_stock_multi_locations' },
  location_dest_id_$_tree: { groups: 'stock.group_stock_multi_locations' },
  location_id: {
    groups: '===todo==',
    string: 'From'
  },

  location_id_$_form_$$_128: { groups: 'stock.group_stock_multi_locations' },
  location_id_$_form_$$_969: { groups: '!stock.group_stock_multi_locations' },
  location_id_$_tree: { groups: 'stock.group_stock_multi_locations' },
  move_ids_without_package: {
    readonly: ['&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'default_company_id': company_id, 'default_date': scheduled_date, 'default_date_deadline': date_deadline, 'picking_type_code': picking_type_code, 'default_picking_id': id, 'form_view_ref':'stock.view_move_form', 'address_in_id': partner_id, 'default_picking_type_id': picking_type_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_partner_id': partner_id}" }
  },

  move_line_exist: {},
  move_line_ids_without_package: {
    readonly: ['|', '|', ['show_operations', '=', false], ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
  },

  move_line_nosuggest_ids: {
    readonly: ['|', '|', ['show_operations', '=', false], ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree', 'default_picking_id': id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
  },

  move_type: {},
  name: {},
  note: {
    string: 'Note',
    placeholder: 'Add an internal note that will be printed on the Picking Operations sheet'
  },

  origin: { placeholder: 'e.g. PO0032' },
  owner_id: { groups: 'stock.group_tracking_owner' },
  package_level_ids: {
    readonly: [['state', '=', 'done']],
    context: { todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
  },

  package_level_ids_details: {
    readonly: [['state', '=', 'done']],
    context: { todo_ctx: "{'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}" }
  },

  partner_id: {},
  picking_type_code: {},
  picking_type_entire_packs: {},
  picking_type_id: { readonly: [['state', '!=', 'draft']] },
  priority: {},
  products_availability: {},
  products_availability_state: {},
  scheduled_date: { required: [['id', '!=', false]] },
  show_allocation: {},
  show_check_availability: {},
  show_clear_qty_button: {},
  show_lots_text: {},
  show_mark_as_todo: {},
  show_operations: { readonly: '1' },
  show_reserved: { readonly: '1' },
  show_set_qty_button: {},
  show_validate: {},
  state: {},
  use_create_lots: {},
  user_id: { domain: [['share', '=', false]] }
}

const AddonsFields = {
  'stock.picking': ModelFields
}

export default AddonsFields

