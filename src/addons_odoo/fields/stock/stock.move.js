const ModelFields = {
  product_id: {
    //required="1"
    // context="{'default_detailed_type': 'product'}"
    // attrs="{
    // 'readonly': ['|', '&amp;',
    // ('state', '!=', 'draft'),
    // ('additional', '=', False),
    // ('move_lines_count', '&gt;', 0)]}"/
  },
  description_picking: { string: 'Description' },
  product_packaging_id: {
    groups: 'product.group_stock_packaging'
  },
  product_uom_qty: {
    string: 'Demand'
    // 'readonly': ['|', ('is_initial_demand_editable', '=', False),
    // '&amp;', '&amp;', ('show_operations', '=', True),
    // ('is_locked', '=', True),
    // ('is_initial_demand_editable', '=', False)]
  },
  forecast_availability: {},
  reserved_availability: {},
  quantity_done: {
    // 'readonly': [('product_id', '=', False)],
  },

  product_uom: {
    // string="Unit of Measure" groups="uom.group_uom"
    // 'readonly': [('state', '!=', 'draft'), ('additional', '=', False)]
  },
  lot_ids: {
    //  groups="stock.group_production_lot"
    //  domain="[('product_id','=',product_id)]"
    //  context="{'default_company_id': company_id, 'default_product_id': product_id, 'active_picking_id': parent.id}"
  }
}

const AddonsFields = {
  'stock.move': ModelFields
}

export default AddonsFields
