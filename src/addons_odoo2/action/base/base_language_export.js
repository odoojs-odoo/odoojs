export default {
  wizard_lang_export: {
    _odoo_model: 'ir.ui.view',
    model: 'base.language.export',
    type: 'form',
    arch: {
      sheet: {
        state: {
          invisible: '1'
        },
        name: {
          invisible: '1'
        },
        _group: {
          _attr: {
            string: 'Export Settings'
          },
          lang: {},
          format: {},
          modules: {
            widget: 'many2many_tags',
            no_create: true
          }
        },
        _div: {
          _h2: 'Export Complete',
          _p: {
            _attr: {
              text: 'Here is the exported translation file:'
            },
            data: {}
          },
          _p_241: {
            _attr: {
              text: 'This file was generated using the universal'
            },
            _strong: 'Unicode/UTF-8'
          },
          _p_320: {
            _attr: {
              text: 'The next step depends on the file format:'
            },
            _ul: {
              _li: 'CSV format: you may edit it directly with your favorite spreadsheet software,\n                                the rightmost column (value) contains the translations',
              _li_225: {
                _attr: {
                  text: 'PO(T) format: you should edit it with a PO editor such as'
                },
                _a: 'POEdit'
              },
              _li_317: 'TGZ format: bundles multiple PO(T) files as a single archive'
            }
          },
          _p_975: {
            _attr: {
              text: 'For more details about translating Odoo in your language, please refer to the'
            },
            _a: 'documentation'
          }
        },
        _footer: {
          _button_act_getfile: {
            _attr: {
              name: 'act_getfile',
              string: 'Export',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary',
              type: 'object'
            }
          }
        },
        _footer_523: {
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn-primary',
              type: 'object'
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
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
