export default {
  view_res_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group_bank_details: {
          _attr: { name: 'bank_details' },
          name: {},
          bic: {}
        },
        _group: {
          _group_address_details: {
            _attr: { name: 'address_details' },
            _label_street: {
              for: 'street',
              string: 'Bank Address'
            },
            _div: {
              _attr: { class: 'o_address_format' },
              street: {
                class: 'o_address_street',
                placeholder: 'Street...'
              },
              street2: {
                class: 'o_address_street',
                placeholder: 'Street 2...'
              },
              city: {
                class: 'o_address_city',
                placeholder: 'City'
              },
              state: {
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true
              },
              zip: {
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              country: {
                class: 'o_address_country',
                placeholder: 'Country',
                no_open: true,
                no_create: true
              }
            }
          },
          _group_communication_details: {
            _attr: { name: 'communication_details' },
            phone: { class: 'o_force_ltr' },
            email: { widget: 'email' },
            active: { invisible: '1' }
          }
        }
      }
    }
  },

  view_res_bank_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        bic: {},
        country: {}
      }
    }
  },

  res_bank_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'search',
    arch: {
      name: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_res_bank_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Banks',
    res_model: 'res.bank',
    search_view_id: 'res_bank_view_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
