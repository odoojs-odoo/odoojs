export default {
  res_users_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form',
    arch: {
      header: {
        buttons: {
          _button_action_create_employee: {
            _attr: {
              name: 'action_create_employee',
              type: 'object',
              string: 'Create employee'
              //   invisible: [
              //     '|',
              //     '|',
              //     ['id', '=', false],
              //     ['share', '=', true],
              //     ['employee_id', '!=', false]
              //   ]
            }
          }
        }
      },
      sheet: {
        share: { invisible: '1' },
        employee_ids: { invisible: '1' },
        employee_id: { invisible: '1' },

        _div_button_box: {
          _button_hr_employee_action_from_user: {
            _attr: {
              name: 'hr_employee_action_from_user',
              type: 'action',
              icon: 'fa-users',
              //   invisible: [['employee_count', '=', 0]],
              context: { active_test: false },
              class: 'oe_stat_button'
            },
            employee_count: {
              string: 'Employee(s)',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
