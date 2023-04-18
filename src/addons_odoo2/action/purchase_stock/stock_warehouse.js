export default {
  view_warehouse_inherited: {
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
          buy_to_resupply: {}
        },
        _xpath_473: {
          _attr: {
            expr: "//group[@name='group_resupply']",
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'stock.group_adv_location,stock.group_stock_multi_warehouses'
            }
          }
        }
      }
    }
  }
}
