export default {
  view_model_menu_create: {
    _odoo_model: 'ir.ui.view',
    model: 'wizard.ir.model.menu.create',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          menu_id: {}
        },
        _footer: {
          _button_menu_create: {
            _attr: {
              name: 'menu_create',
              string: 'Create Menu',
              class: 'btn-primary',
              type: 'object'
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

  act_menu_create: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create Menu',
    res_model: 'wizard.ir.model.menu.create',
    context: {
      todo: "{'model_id': active_id}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
