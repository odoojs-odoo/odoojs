export default {
  view_base_import_language: {
    _odoo_model: 'ir.ui.view',
    model: 'base.language.import',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {
            placeholder: 'e.g. English'
          },
          code: {
            string: 'Code',
            placeholder: 'e.g. en_US'
          },
          data: {},
          filename: {
            invisible: '1'
          },
          overwrite: {
            groups: 'base.group_no_one'
          }
        },
        _footer: {
          _button_import_lang: {
            _attr: {
              name: 'import_lang',
              type: 'object',
              string: 'Import',
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

  action_view_base_import_language: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Import Translation',
    type: 'ir.actions.act_window',
    res_model: 'base.language.import',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
