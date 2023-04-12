export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',

    arch: {
      sheet: {
        logo: { widget: 'image' },

        _div_title: {
          _attr: { for: 'name' },
          _h1: { name: { placeholder: 'e.g. My Company' } }
        },

        _notebook: {
          _page_general_info: {
            _attr: { string: 'General Information' },
            _group: {
              _group: {
                partner_id: {
                  string: 'Contact',
                  readonly: '1',
                  required: 0,
                  groups: 'base.group_no_one'
                },
                _label: { for: 'street', string: 'Address' },
                _div: {
                  street: { nolabel: 1, placeholder: 'Street...' },
                  street2: { nolabel: 1, placeholder: 'Street 2...' },
                  city: { nolabel: 1, placeholder: 'City' },
                  state_id: { nolabel: 1, placeholder: 'State' },
                  zip: { nolabel: 1, placeholder: 'ZIP' },
                  country_id: { nolabel: 1, placeholder: 'Country' }
                },
                vat: {},
                company_registry: {},
                currency_id: {}
              },

              _group_2: {
                phone: {},
                mobile: {},
                email: {},
                website: {
                  string: 'Website',
                  widget: 'url',
                  placeholder: 'e.g. https://www.odoo.com'
                },
                parent_id: { groups: 'base.group_multi_company' },
                sequence: { invisible: 1 },
                favicon: { widget: 'image', groups: 'base.group_no_one' }
              },
              _group_social_media: {}
            }
          }
        }
      }
    },

    fields: {}
  },
  view_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'tree',
    arch: {
      sheet: {
        // sequence: {},
        name: {},
        partner_id: {}
      }
    }
  },

  action_res_company_form: {
    _odoo_model: 'ir.actions',
    name: '公司',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    domain: [],
    context: {},
    views: {
      tree: 'view_company_tree',
      form: 'view_company_form'
    }
  },

  menu_action_res_company_form: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_res_company_form',
    parent: 'menu_users',
    name: '公司',
    sequence: 1
  }
}
