const ModelFields = {
  activity_exception_decoration: {},
  activity_ids: { string: 'Next Activity' },
  bom_id: {
    readonly: '===todo==',
    context: { todo_ctx: "{'default_product_tmpl_id': product_tmpl_id}" }
  },

  bom_id_$_form: { readonly: [['state', '!=', 'draft']] },
  bom_id_$_tree: { readonly: '1' },
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '===todo=='
  },

  company_id_$_form_$$_222: { readonly: [['state', '!=', 'draft']] },
  company_id_$_tree_$$_363: { readonly: '1' },
  components_availability: {},
  components_availability_state: {},
  consumption: {},
  date_deadline: {},
  date_planned_finished: {},
  date_planned_start: { readonly: [['state', 'in', ['close', 'cancel']]] },
  delay_alert_date: {},
  delivery_count: { string: 'Transfers' },
  forecasted_issue: {},
  id: {},
  is_locked: {},
  is_planned: {},
  json_popover: {},
  location_dest_id: {
    groups: '===todo==',
    readonly: [['state', '!=', 'draft']]
  },

  location_dest_id_$_form_$$_821: { groups: '!stock.group_stock_multi_locations' },
  location_dest_id_$_form_$$_895: { groups: 'stock.group_stock_multi_locations' },
  location_src_id: {
    groups: '===todo==',
    readonly: [['state', '!=', 'draft']]
  },

  location_src_id_$_form_$$_117: { groups: 'stock.group_stock_multi_locations' },
  location_src_id_$_form_$$_183: { groups: '!stock.group_stock_multi_locations' },
  lot_producing_id: {
    context: { todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}" }
  },

  message_needaction: {},
  move_byproduct_ids: {
    readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'default_date': date_planned_finished, 'default_date_deadline': date_deadline, 'default_location_id': production_location_id, 'default_location_dest_id': location_dest_id, 'default_state': 'draft', 'default_production_id': id, 'default_picking_type_id': picking_type_id, 'default_company_id': company_id}" }
  },

  move_finished_ids: { readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]] },
  move_raw_ids: {
    readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'default_date': date_planned_start, 'default_date_deadline': date_planned_start, 'default_location_id': location_src_id, 'default_location_dest_id': production_location_id,                                 'default_warehouse_id': warehouse_id, 'default_state': 'draft', 'default_raw_material_production_id': id, 'default_picking_type_id': picking_type_id, 'default_company_id': company_id}" }
  },

  mrp_production_backorder_count: {},
  mrp_production_child_count: {},
  mrp_production_source_count: {},
  name: { placeholder: 'Manufacturing Reference' },
  origin: {},
  picking_type_id: { readonly: [['state', '!=', 'draft']] },
  priority: {},
  product_description_variants: { readonly: [['state', '!=', 'draft']] },
  product_id: {
    readonly: '===todo==',
    context: { default_detailed_type: 'product' }
  },

  product_id_$_form: { readonly: [['state', '!=', 'draft']] },
  product_id_$_tree: { readonly: '1' },
  product_qty: {
    readonly: '===todo==',
    string: 'Quantity'
  },

  product_qty_$_form_$$_292: { readonly: [['state', '!=', 'draft']] },
  product_qty_$_form_$$_407: { readonly: [['state', '!=', 'draft']] },
  product_qty_$_tree: { readonly: '1' },
  product_tmpl_id: {},
  product_tracking: {},
  product_uom_category_id: {},
  product_uom_id: {
    groups: '===todo==',
    readonly: '===todo==',
    string: 'UoM'
  },

  product_uom_id_$_form_$$_621: {
    groups: 'uom.group_uom',
    readonly: [['state', '!=', 'draft']]
  },

  product_uom_id_$_form_$$_813: { groups: '!uom.group_uom' },
  product_uom_id_$_tree: {
    groups: 'uom.group_uom',
    readonly: '1'
  },

  production_duration_expected: { groups: 'mrp.group_mrp_routings' },
  production_location_id: { readonly: '1' },
  production_real_duration: { groups: 'mrp.group_mrp_routings' },
  qty_produced: {},
  qty_producing: { readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]] },
  reservation_state: {},
  reserve_visible: {},
  scrap_count: {},
  show_allocation: {},
  show_final_lots: {},
  show_lot_ids: {},
  state: {},
  unbuild_count: {},
  unreserve_visible: {},
  use_create_components_lots: {},
  user_id: { domain: [['share', '=', false]] },
  warehouse_id: {},
  workorder_ids: {
    readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
    context: { todo_ctx: "{'tree_view_ref': 'mrp.mrp_production_workorder_tree_editable_view', 'default_product_uom_id': product_uom_id, 'from_manufacturing_order': True}" }
  }
}

const AddonsFields = {
  'mrp.production': ModelFields
}

export default AddonsFields

