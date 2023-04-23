export default {
  view_users_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    arch: {
      sheet: {
        active_partner: { invisible: '1' },
        avatar_128: { invisible: '1' },
        // image_1920: { widget: 'image', preview_image: 'avatar_128' },
        _div_title: {
          _h1: {
            name: { nolabel: 0, required: '1', placeholder: 'e.g. John Doe' }
          }
        },

        _group: {
          _group: {
            _h2: {
              login: { nolabel: 0, placeholder: 'e.g. email@yourcompany.com' }
            },
            email: { invisible: '1' },
            partner_id: { nolabel: 0, readonly: '1' }
          },
          _div: {
            lang: { required: '1' },
            login_date: {}

            // share: { invisible: '1' }
          }
        }
      }
    }
  },

  view_users_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        login: {},
        // lang: {},
        login_date: {}
        // company_id: {}
      }
    }
  },

  view_users_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'User',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['login', 'ilike', self],
              ['email', 'ilike', self]
            ]
          }
        }
      },

      filters: {
        group_active: {
          inactive: {
            name: 'Inactive',
            string: 'Inactive Users',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_users: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Users',
    type: 'ir.actions.act_window',
    res_model: 'res.users',
    search_view_id: 'view_users_search',
    domain: [],
    context: {
      search_default_no_share: 1
    },
    views: {
      tree: 'view_users_tree',
      form: 'view_users_form'
    }
  }
}
