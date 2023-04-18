const ModelFields = {
  additional: {},
  company_id: {},
  date: {},
  date_deadline: {},
  description_picking: {
    string: 'Description'
  },

  display_assign_serial: {},
  forecast_availability: {
    string: 'Reserved'
  },

  forecast_expected_date: {},
  has_tracking: {},
  is_initial_demand_editable: {},
  is_locked: {},
  is_quantity_done_editable: {},
  location_dest_id: {},
  location_id: {},
  lot_ids: {
    groups: 'stock.group_production_lot',
    domain: {
      todo_ctx: "[('product_id','=',product_id)]"
    },
    context: {
      todo_ctx: "{'default_company_id': company_id, 'default_product_id': product_id, 'active_picking_id': parent.id}"
    }
  },

  move_lines_count: {},
  name: {},
  partner_id: {},
  picking_code: {},
  picking_type_id: {},
  product_id: {
    readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]],
    context: {
      default_detailed_type: 'product'
    }
  },

  product_packaging_id: {
    groups: 'product.group_stock_packaging'
  },

  product_qty: {},
  product_type: {},
  product_uom: {
    string: 'Unit of Measure',
    groups: 'uom.group_uom',
    readonly: '===todo=='
  },

  product_uom_$_form: {
    readonly: [['state', '!=', 'draft'], ['id', '!=', false]]
  },

  product_uom_$_tree: {
    readonly: [['state', '!=', 'draft'], ['additional', '=', false]]
  },

  product_uom_category_id: {},
  product_uom_qty: {
    readonly: '===todo==',
    string: 'Demand'
  },

  product_uom_qty_$_form: {
    readonly: [['is_initial_demand_editable', '=', false]]
  },

  product_uom_qty_$_tree: {
    readonly: ['|', ['is_initial_demand_editable', '=', false], '&', '&', ['show_operations', '=', true], ['is_locked', '=', true], ['is_initial_demand_editable', '=', false]]
  },

  quantity_done: {
    string: 'Done',
    readonly: '===todo=='
  },

  quantity_done_$_form: {
    readonly: [['is_quantity_done_editable', '=', false]]
  },

  quantity_done_$_tree: {
    readonly: [['product_id', '=', false]]
  },

  reserved_availability: {
    string: 'Reserved'
  },

  scrapped: {},
  show_details_visible: {},
  show_operations: {},
  show_reserved_availability: {},
  state: {}
}

const AddonsFields = {
  'stock.picking.move_ids_without_package': ModelFields
}

export default AddonsFields

