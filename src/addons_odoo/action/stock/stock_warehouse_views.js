// ok
export default {
  view_warehouse: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    type: 'form',
    fields: {
      sequence: {},
      active: {},
      name: {},
      code: {},
      company_id: {},
      partner_id: {},

      reception_steps: {},
      delivery_steps: {},
      resupply_wh_ids: {
        domain: ({ record }) => {
          return [['id', '!=', record.id]]
        },
        widget: 'many2many_checkboxes'
      },
      view_location_id: { readonly2: 1 },
      lot_stock_id: { readonly2: 1 },
      wh_input_stock_loc_id: { readonly2: 1 },
      wh_qc_stock_loc_id: { readonly2: 1 },
      wh_pack_stock_loc_id: { readonly2: 1 },
      wh_output_stock_loc_id: { readonly2: 1 },
      in_type_id: { readonly2: 1 },
      int_type_id: { readonly2: 1 },
      pick_type_id: { readonly2: 1 },
      pack_type_id: { readonly2: 1 },
      out_type_id: { readonly2: 1 }
    }
  },

  view_warehouse_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      active: {},
      lot_stock_id: {},
      partner_id: {},
      company_id: {}
    }
  },

  stock_warehouse_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_warehouse_form: {
    _odoo_model: 'ir.actions',
    name: '仓库',
    type: 'ir.actions.act_window',
    res_model: 'stock.warehouse',
    domain: [],
    context: {}
  },

  menu_action_warehouse_form: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_warehouse_config',
    name: '仓库',
    action: 'action_warehouse_form',
    sequence: 1
  }
}
