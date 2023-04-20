export default {
  base_language_install_view_form_lang_switch: {
    _odoo_model: 'ir.ui.view',
    model: 'base.language.install',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _strong: {
            first_lang_id: {
              readonly: 'True',
              no_open: true
            }
          }
        },
        _footer: {
          _button_reload: {
            _attr: {
              name: 'reload',
              type: 'object',
              string: 'Close',
              class: 'btn-primary'
            }
          },
          _button_switch_lang: {
            _attr: {
              name: 'switch_lang',
              type: 'object',
              class: 'btn-primary ms-1',
              text: 'Switch to'
            },
            first_lang_id: {
              readonly: 'True',
              no_open: true
            }
          }
        }
      }
    }
  },

  view_base_language_install: {
    _odoo_model: 'ir.ui.view',
    model: 'base.language.install',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          lang_ids: {
            widget: 'many2many_tags',
            context: {
              active_test: false
            },
            no_quick_create: true,
            no_create_edit: true
          },
          overwrite: {
            groups: 'base.group_no_one'
          }
        },
        _footer: {
          _button_lang_install: {
            _attr: {
              name: 'lang_install',
              type: 'object',
              string: 'Add',
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

  action_view_base_language_install: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Add Languages',
    type: 'ir.actions.act_window',
    res_model: 'base.language.install',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
