export default {
  hr_departure_wizard_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.departure.wizard',
    type: 'form',
    arch: {
      sheet: {
        _footer: {
          _button_action_register_departure: {
            _attr: {
              name: 'action_register_departure',
              type: 'object',
              string: 'Apply',
              class: 'oe_highlight'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        },
        _h1: {
          employee_id: {
            readonly: '1',
            no_open: true
          }
        },
        _group: {
          _group: {
            departure_reason_id: {
              no_edit: true,
              no_create: true,
              no_open: true
            },
            departure_date: {}
          },
          _group_208: {
            _div: {
              _attr: {
                invisible: '1',
                class: 'o_td_label'
              },
              _span: {
                _attr: {
                  class: 'o_form_label o_hr_form_label cursor-default',
                  text: 'Close Activities'
                }
              }
            },
            _div_629: {
              _attr: {
                invisible: '1',
                class: 'column'
              }
            },
            _separator: {},
            _div_794: {
              _attr: { class: 'o_td_label' },
              _span: {
                _attr: {
                  class: 'o_form_label o_hr_form_label cursor-default',
                  text: 'HR Info'
                }
              }
            },
            _div_737: {
              _attr: { class: 'column' },
              _div: {
                archive_private_address: {},
                _label_archive_private_address: { for: 'archive_private_address' }
              }
            }
          }
        },
        _group_709: {
          _div: {
            _span: {
              _attr: {
                class: 'o_form_label o_hr_form_label cursor-default',
                text: 'Detailed Reason'
              }
            },
            departure_description: {}
          }
        }
      }
    }
  },

  hr_departure_wizard_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Register Departure',
    res_model: 'hr.departure.wizard',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
