export default {
  res_partner_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_open_employees: {
            _attr: {
              name: 'action_open_employees',
              type: 'object',
              icon: 'fa-id-card-o',
              groups: 'hr.group_hr_user',
              invisible: [['employees_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                employees_count: {}
              },
              _span_174: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Employee(s)'
                }
              }
            }
          }
        }
      }
    }
  }
}
