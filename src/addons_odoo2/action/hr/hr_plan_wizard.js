export default {
  plan_wizard: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.plan.wizard',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_action_launch: {
            _attr: {
              name: 'action_launch',
              type: 'object',
              string: 'Launch Plan',
              groups: 'hr.group_hr_user',
              invisible: [['warning', '!=', false]],
              class: 'oe_highlight'
            }
          },
          _button_action_launch_211: {
            _attr: {
              name: 'action_launch',
              type: 'object',
              string: 'Launch Plan',
              groups: 'hr.group_hr_user',
              invisible: [['warning', '=', false]],
              class: 'oe_highlight disabled'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        },
        _group: {
          department_id: {},
          plan_id: {},
          employee_ids: { invisible: '1' },
          company_id: { invisible: '1' }
        },
        _div: {
          _attr: {
            invisible: [['warning', '=', false]],
            class: 'alert alert-danger mb8'
          },
          warning: {}
        }
      }
    }
  },

  plan_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Launch Plan',
    res_model: 'hr.plan.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
