export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',

    arch: {
      sheet: {
        logo: { widget: 'image' },

        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. My Company' }
          }
        },

        _notebook: {
          _page_general_info: {
            _attr: { name: 'general_info', string: 'General Information' },
            _group: {
              _group: {
                partner_id: {},
                _label_street: { for: 'street', string: 'Address' },

                _div: {
                  street: {},
                  street2: {},
                  city: {},
                  state_id: {},
                  zip: {},
                  country_id: {}
                },
                vat: {},
                company_registry: {},
                currency_id: {}
              },

              _group_2: {
                phone: {},
                mobile: {},
                email: {},
                website: { widget: 'url' },
                parent_id: {},
                sequence: { invisible: 1 },
                favicon: { widget: 'image', size: 'small' }
              },
              _group_social_media: { _attr: { name: 'social_media' } }
            }
          }
        }
      }
    }
  },
  view_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        partner_id: {}
      }
    }
  },

  action_res_company_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Companies',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    domain: [],
    context: {},
    views: {
      tree: 'view_company_tree',
      form: 'view_company_form'
    }
  }
}
