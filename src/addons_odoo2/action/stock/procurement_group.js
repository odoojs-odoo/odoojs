export default {
  procurement_group_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'procurement.group',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_do_view_pickings: {
            _attr: {
              name: 'do_view_pickings',
              string: 'Transfers',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-truck'
            }
          }
        },
        _group: {
          name: {},
          move_type: {}
        }
      }
    }
  }
}
