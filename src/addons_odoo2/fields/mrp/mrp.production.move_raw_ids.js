const ModelFields = {
  additional: {},
  allowed_operation_ids: {},
  bom_line_id: {},
  company_id: {},
  date: {},
  date_deadline: {},
  forecast_availability: { string: 'Reserved' },
  forecast_expected_date: {},
  group_id: {},
  has_tracking: {},
  is_done: {},
  is_locked: {},
  location_dest_id: {
    domain: { todo_ctx: "[('id', 'child_of', parent.location_dest_id)]" }
  },

  location_id: {
    string: 'From',
    groups: 'stock.group_stock_multi_locations',
    readonly: '1'
  },

  lot_ids: {
    string: 'Lot/Serial Numbers',
    groups: 'stock.group_production_lot',
    domain: { todo_ctx: "[('product_id','=',product_id)]" },
    context: { todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id}" },
    readonly: '1'
  },

  manual_consumption: {},
  move_lines_count: {},
  name: {},
  operation_id: {},
  picking_type_id: {},
  price_unit: {},
  product_id: {
    readonly: ['|', '|', ['move_lines_count', '>', 0], ['state', '=', 'cancel'], '&', ['state', '!=', 'draft'], ['additional', '=', false]],
    context: { default_detailed_type: 'product' },
    required: '1'
  },

  product_qty: { readonly: '1' },
  product_type: {},
  product_uom: {
    groups: 'uom.group_uom',
    readonly: [['state', '!=', 'draft'], ['id', '!=', false]]
  },

  product_uom_category_id: {},
  product_uom_qty: {
    string: 'To Consume',
    readonly: ['&', ['parent.state', '!=', 'draft'], '|', '&', ['parent.state', 'not in', ('confirmed', 'progress', 'to_close')], ['parent.is_planned', '!=', true], ['parent.is_locked', '=', true]]
  },

  propagate_cancel: {},
  quantity_done: {
    string: 'Consumed',
    readonly: [['has_tracking', '!=', 'none']]
  },

  reserved_availability: {},
  sequence: {},
  should_consume_qty: {},
  show_details_visible: {},
  state: {},
  unit_factor: {},
  warehouse_id: {}
}

const AddonsFields = {
  'mrp.production.move_raw_ids': ModelFields
}

export default AddonsFields

