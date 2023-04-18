export default {
  stock_valuation_layer_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.picking',
    inherit_id: 'stock.view_picking_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_stock_valuation_layers: {
            _attr: {
              name: 'action_view_stock_valuation_layers',
              type: 'object',
              string: 'Valuation',
              icon: 'fa-dollar',
              groups: 'base.group_no_one',
              invisible: [['state', 'not in', ['done']]],
              class: 'oe_stat_button'
            }
          }
        }
      }
    }
  }
}
