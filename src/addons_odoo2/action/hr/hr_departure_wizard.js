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
            _attr: { id: 'info' },
            departure_reason_id: {
              no_edit: true,
              no_create: true,
              no_open: true
            },
            departure_date: {}
          },
          _group_301: {
            _attr: { id: 'action' },
            _div: {
              _attr: {
                id: 'activities_label',
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
            _div_255: {
              _attr: {
                id: 'activities',
                invisible: '1',
                class: 'column'
              }
            },
            _separator: {},
            _div_628: {
              _attr: {
                id: 'label_info',
                class: 'o_td_label'
              },
              _span: {
                _attr: {
                  class: 'o_form_label o_hr_form_label cursor-default',
                  text: 'HR Info'
                }
              }
            },
            _div_162: {
              _attr: {
                id: 'info',
                class: 'column'
              },
              _div: {
                archive_private_address: {},
                _label_archive_private_address: { for: 'archive_private_address' }
              }
            }
          }
        },
        _group_422: {
          _div: {
            _attr: { id: 'detailed_reason' },
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
