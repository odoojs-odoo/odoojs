export default {
  view_base_module_update: {
    _odoo_model: 'ir.ui.view',
    model: 'base.module.update',
    type: 'form',
    arch: {
      sheet: {
        state: { invisible: '1' },
        _separator: {
          _attr: {
            string: 'Module Update Result',
            states: 'done'
          }
        },
        _group: {
          _attr: { states: 'init' },
          _span: {
            _attr: {
              class: 'o_form_label',
              text: 'Click on Update below to start the process...'
            }
          }
        },
        _group_341: {
          _attr: { states: 'done' },
          updated: {},
          added: {}
        },
        _footer: {
          _div: {
            _attr: { states: 'init' },
            _button_update_module: {
              _attr: {
                name: 'update_module',
                type: 'object',
                string: 'Update',
                class: 'btn-primary'
              }
            },
            _button: {
              _attr: {
                string: 'Cancel',
                class: 'btn-secondary'
              }
            }
          },
          _div_460: {
            _attr: { states: 'done' },
            _button_action_module_open: {
              _attr: {
                name: 'action_module_open',
                type: 'object',
                string: 'Open Apps',
                class: 'btn-primary'
              }
            },
            _button: {
              _attr: {
                string: 'Close',
                class: 'btn-secondary'
              }
            }
          }
        }
      }
    }
  },

  action_view_base_module_update: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Module Update',
    type: 'ir.actions.act_window',
    res_model: 'base.module.update',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
