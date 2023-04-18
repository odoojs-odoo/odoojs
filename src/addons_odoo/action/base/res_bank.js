export default {
  view_res_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'form',
    buttons: { create: true, edit: true, delete: true },

    arch: {
      header: { buttons: {}, fields: {} },
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _group_bank_details: {
          name: {},
          bic: {}
        },

        _group: {
          _group_address_details: {
            _label: { for: 'street', string: 'Bank Address' },
            street: { nolabel: 1, placeholder: 'Street...' },
            street2: { nolabel: 1, placeholder: 'Street 2...' },
            city: { nolabel: 1, placeholder: 'City' },
            state: { nolabel: 1, placeholder: 'State' },
            zip: { nolabel: 1, placeholder: 'ZIP' },
            country: { placeholder: 'Country' }
          },
          _group_communication_details: {
            phone: {},
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
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: {
            name: 'inactive',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_bank_form: {
    _odoo_model: 'ir.actions',
    name: 'Banks',
    type: 'ir.actions.act_window',
    res_model: 'res.bank',
    search_view_id: 'res_bank_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_res_bank_tree',
      form: 'view_res_bank_form'
    }
  }
}
