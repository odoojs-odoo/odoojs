const ModelFields = {
  allow_workorder_dependencies: {},
  blocked_by_workorder_ids: {},
  company_id: {},
  consumption: {},
  date_finished: { readonly: '1' },
  date_planned_finished: { required: [['is_planned', '=', true]] },
  date_planned_start: { required: [['is_planned', '=', true]] },
  date_start: { readonly: '1' },
  duration: { readonly: [['is_user_working', '=', true]] },
  duration_expected: {},
  finished_lot_id: { string: 'Lot/Serial' },
  is_planned: {},
  is_produced: {},
  is_user_working: {},
  json_popover: { string: ' ' },
  move_raw_ids: { readonly: '1' },
  name: { string: 'Operation' },
  operation_id: {
    domain: { todo_ctx: "['|', ('bom_id', '=', production_bom_id), ('bom_id', '=', False)]" },
    context: { todo_ctx: "{'default_workcenter_id': workcenter_id, 'default_company_id': company_id}" }
  },

  operation_note: {},
  product_id: {},
  product_tracking: {},
  product_uom_id: { readonly: '0' },
  production_bom_id: {},
  production_id: {},
  production_state: {},
  qty_producing: {},
  qty_remaining: { string: 'Quantity' },
  scrap_count: {},
  show_json_popover: {},
  state: {},
  time_ids: {
    context: { todo_ctx: "{'default_workcenter_id': workcenter_id, 'default_workorder_id': id}" }
  },

  workcenter_id: {},
  working_state: {},
  worksheet: {},
  worksheet_google_slide: {},
  worksheet_type: {}
}

const AddonsFields = {
  'mrp.workorder': ModelFields
}

export default AddonsFields

