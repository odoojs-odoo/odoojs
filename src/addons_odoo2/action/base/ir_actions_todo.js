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
        state: {
          readonly: '1'
        },
        _button_action_launch: {
          _attr: {
            name: 'action_launch',
            type: 'object',
            string: 'Launch',
            icon: 'fa-cogs',
            help: 'Launch Configuration Wizard',
            states: 'open'
          }
        },
        _button_action_open: {
          _attr: {
            name: 'action_open',
            type: 'object',
            string: 'Todo',
            icon: 'fa-exchange',
            help: 'Set as Todo',
            states: 'done'
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
      header: {
        _button_action_launch: {
          _attr: {
            name: 'action_launch',
            type: 'object',
            string: 'Launch',
            icon: 'fa-cogs',
            help: 'Launch Configuration Wizard',
            states: 'open',
            class: 'oe_highlight'
          }
        },
        _button_action_open: {
          _attr: {
            name: 'action_open',
            type: 'object',
            string: 'Set as Todo',
            icon: 'fa-exchange',
            states: 'done',
            class: 'oe_highlight'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'open,done',
          readonly: '1'
        }
      },
      sheet: {
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
          help: 'Wizards to be Launched',
          domain: [['state', '=', 'open']]
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
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'ir_actions_todo_tree',
      form: '=======todo=========='
    }
  }
}
