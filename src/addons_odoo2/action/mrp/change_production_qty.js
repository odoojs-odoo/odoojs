export default {
  view_change_production_qty_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'change.production.qty',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          product_qty: {},
          mo_id: { invisible: '1' }
        },
        _footer: {
          _button_change_prod_qty: {
            _attr: {
              name: 'change_prod_qty',
              type: 'object',
              string: 'Approve',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_change_production_qty: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Change Quantity To Produce',
    type: 'ir.actions.act_window',
    res_model: 'change.production.qty',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
