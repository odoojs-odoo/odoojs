const ModelFields = {
  additional: {},
  allowed_operation_ids: {},
  bom_line_id: {},
  company_id: {},
  cost_share: {},
  date: {},
  date_deadline: {},
  has_tracking: {},
  is_done: {},
  is_locked: {},
  location_dest_id: {
    string: 'To',
    groups: 'stock.group_stock_multi_locations',
    readonly: '1'
  },

  location_id: {},
  lot_ids: {
    groups: 'stock.group_production_lot',
    domain: { todo_ctx: "[('product_id','=',product_id)]" },
    context: { todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id}" }
  },

  move_lines_count: {},
  name: {},
  operation_id: {},
  picking_type_id: {},
  product_id: {
    domain: { todo_ctx: "[('id', '!=', parent.product_id)]" },
    context: { default_detailed_type: 'product' },
    required: '1'
  },

  product_uom: { groups: 'uom.group_uom' },
  product_uom_category_id: {},
  product_uom_qty: {
    string: 'To Produce',
    readonly: ['&', ['parent.state', '!=', 'draft'], '|', '&', ['parent.state', 'not in', ('confirmed', 'progress', 'to_close')], ['parent.is_planned', '!=', true], ['parent.is_locked', '=', true]]
  },

  quantity_done: {
    string: 'Produced',
    readonly: [['has_tracking', '=', true]]
  },

  sequence: {},
  show_details_visible: {},
  state: {},
  unit_factor: {},
  warehouse_id: {}
}

const AddonsFields = {
  'mrp.production.move_byproduct_ids': ModelFields
}

export default AddonsFields

