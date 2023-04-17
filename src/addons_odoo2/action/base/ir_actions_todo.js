export default {
  ir_actions_todo_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.todo',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        action_id: {},
        state: {},
        _button_action_launch: {
          _attr: {
            name: 'action_launch',
            string: 'Launch',
            type: 'object',
            icon: 'fa-cogs'
          }
        },
        _button_action_open: {
          _attr: {
            name: 'action_open',
            string: 'Todo',
            type: 'object',
            icon: 'fa-exchange'
          }
        }
      }
    }
  },

  config_wizard_step_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.todo',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_action_launch: {
            _attr: {
              name: 'action_launch',
              string: 'Launch',
              class: 'oe_highlight',
              type: 'object',
              icon: 'fa-cogs'
            }
          },
          _button_action_open: {
            _attr: {
              name: 'action_open',
              string: 'Set as Todo',
              class: 'oe_highlight',
              type: 'object',
              icon: 'fa-exchange'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        _group: {
          action_id: {},
          sequence: {}
        }
      }
    }
  },

  config_wizard_step_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.todo',
    type: 'search',
    arch: {
      _filter_todo: {
        _attr: {
          name: 'todo',
          string: 'To Do',
          domain: "[('state', '=', 'open')]"
        }
      },
      action_id: {},
      state: {}
    }
  },

  act_ir_actions_todo_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Configuration Wizards',
    res_model: 'ir.actions.todo',
    views: {
      tree: 'ir_actions_todo_tree',
      form: '=======todo=========='
    }
  }
}
