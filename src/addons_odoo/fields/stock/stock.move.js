const ModelFields = {
  product_id: {
    required: '1',
    readonly({ record }) {
      // 'readonly': [
      // '|', '&amp;',
      // ('state', '!=', 'draft'),
      // ('additional', '=', False),
      // ('move_lines_count', '&gt;', 0)]}"/>
      //
      const { state, additional, move_lines_count } = record
      return (state !== 'draft' && !additional) || move_lines_count > 0
    },
    context: { default_detailed_type: 'product' }
  },
  description_picking: { string: 'Description' },
  product_packaging_id: { groups: 'product.group_stock_packaging' },
  product_uom_qty: {
    readonly({ record }) {
      // 'readonly': [('is_initial_demand_editable', '=', False)]

      // 'readonly': ['|', ('is_initial_demand_editable', '=', False),
      // '&amp;', '&amp;', ('show_operations', '=', True),
      // ('is_locked', '=', True),
      // ('is_initial_demand_editable', '=', False)]

      const { is_initial_demand_editable, show_operations, is_locked } = record
      return (
        !is_initial_demand_editable ||
        (show_operations && is_locked && !is_initial_demand_editable)
      )
    }
  },
  forecast_availability: {},
  reserved_availability: {},
  quantity_done: {
    readonly({ record }) {
      // to check
      // for tree view. 'readonly': [('product_id', '=', False)],
      // for form view. 'readonly': [('is_quantity_done_editable', '=', False)]

      const { product_id, is_quantity_done_editable } = record
      return !product_id || !is_quantity_done_editable
    }
  },

  product_uom: {
    string: 'Unit of Measure',
    groups: 'uom.group_uom',
    readonly({ record }) {
      // to check
      // for tree view. 'readonly': [('state', '!=', 'draft'), ('additional', '=', False)]
      // for form view. 'readonly': [('state', '!=', 'draft'), ('id', '!=', False)]
      const { state, id: res_id } = record
      return state !== 'draft' && !res_id
    }
  },
  lot_ids: {
    groups: 'stock.group_production_lot',
    domain({ record }) {
      // domain="[('product_id','=',product_id)]"
      const { product_id } = record
      return [['product_id', '=', product_id]]
    },

    context({ record }) {
      //  context="{
      // 'default_company_id': company_id,
      // 'default_product_id': product_id,
      // 'active_picking_id': parent.id
      // }"

      const { company_id, product_id, parent: prt } = record
      return {
        default_company_id: company_id,
        default_product_id: product_id,
        active_picking_id: prt.id
      }
    }
  }
}

const AddonsFields = {
  'stock.move': ModelFields
}

export default AddonsFields
