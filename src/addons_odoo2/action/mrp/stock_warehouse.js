export default {
  view_warehouse_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse',
    inherit_id: 'stock.view_warehouse',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='resupply_wh_ids']",
            position: 'before'
          },
          manufacture_to_resupply: {},
          manufacture_steps: {
            widget: 'radio',
            groups: 'stock.group_adv_location',
            invisible: [['manufacture_to_resupply', '=', false]]
          }
        },
        _xpath_806: {
          _attr: {
            expr: "//field[@name='out_type_id']",
            position: 'after'
          },
          manu_type_id: { readonly: 'True' }
        },
        _xpath_751: {
          _attr: {
            expr: "//group[@name='group_resupply']",
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'stock.group_adv_location,stock.group_stock_multi_warehouses',
              groups: 'stock.group_adv_location,stock.group_stock_multi_warehouses'
            }
          }
        },
        _xpath_547: {
          _attr: {
            expr: "//field[@name='wh_output_stock_loc_id']",
            position: 'after'
          },
          sam_loc_id: {},
          pbm_loc_id: {}
        },
        _xpath_626: {
          _attr: {
            expr: "//field[@name='out_type_id']",
            position: 'after'
          },
          sam_type_id: {},
          pbm_type_id: {}
        }
      }
    }
  }
}
