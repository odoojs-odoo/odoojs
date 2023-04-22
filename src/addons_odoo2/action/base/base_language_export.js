export default {
  wizard_lang_export: {
    _odoo_model: 'ir.ui.view',
    model: 'base.language.export',
    type: 'form',
    arch: {
      sheet: {
        state: { invisible: '1' },
        name: { invisible: '1' },
        _group: {
          _attr: {
            string: 'Export Settings',
            states: 'choose'
          },
          lang: {},
          format: {},
          modules: {
            widget: 'many2many_tags',
            no_create: true
          }
        },
        _div: {
          _attr: { states: 'get' },
          _h2: 'Export Complete',
          _p: {
            _attr: { text: 'Here is the exported translation file:' },
            data: { readonly: '1' }
          },
          _p_145: {
            _attr: { text: ['This file was generated using the universal', 'file encoding, please be sure to view and edit\n                           using the same encoding.'] },
            _strong: 'Unicode/UTF-8'
          },
          _p_155: {
            _attr: { text: 'The next step depends on the file format:' },
            _ul: {
              _li: 'CSV format: you may edit it directly with your favorite spreadsheet software,\n                                the rightmost column (value) contains the translations',
              _li_737: {
                _attr: { text: ['PO(T) format: you should edit it with a PO editor such as', ', or your preferred text editor'] },
                _a: 'POEdit'
              },
              _li_133: 'TGZ format: bundles multiple PO(T) files as a single archive'
            }
          },
          _p_451: {
            _attr: { text: ['For more details about translating Odoo in your language, please refer to the', '.'] },
            _a: 'documentation'
          }
        },
        _footer: {
          _attr: { states: 'choose' },
          _button_act_getfile: {
            _attr: {
              name: 'act_getfile',
              type: 'object',
              string: 'Export',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              type: 'object',
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        },
        _footer_344: {
          _attr: { states: 'get' },
          _button: {
            _attr: {
              type: 'object',
              string: 'Close',
              class: 'btn-primary'
            }
          }
        }
      }
    }
  },

  action_wizard_lang_export: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Export Translation',
    type: 'ir.actions.act_window',
    res_model: 'base.language.export',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
