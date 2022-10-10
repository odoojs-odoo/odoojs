export default {
  view_users_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    fields: {
      // active_partner: { readonly: 1, invisible: '1' },
      // display_name: {},

      image_1920: { widget: 'image' },
      name: { required: '1' },
      login: {},
      partner_id: { readonly2: '1' },
      company_ids: { widget: 'many2many_tags' },
      company_id: {},
      groups_id: {},

      lang: {},

      tz: {},
      action_id: {}
      // signature: {}
      // login_date: {}
    }
  },

  view_users_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'tree',
    fields: {
      name: {},
      login: {},
      lang: {},
      login_date: {},
      company_id: {}
    }
  },

  view_users_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['login', 'ilike', self],
              ['email', 'ilike', self]
            ]
          }
        },

        company_ids: {}
      },

      filters: {
        group1: {
          no_share: { string: '内部用户', domain: [['share', '=', false]] }
        },
        group2: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_users: {
    _odoo_model: 'ir.actions',
    name: '用户',
    type: 'ir.actions.act_window',
    res_model: 'res.users',
    search_view_id: 'view_users_search',
    domain: [],
    context: { search_default_no_share: 1 },
    views: {
      tree: 'view_users_tree',
      form: 'view_users_form'
    }
  },

  menu_action_res_users: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_res_users',
    parent: 'menu_users',
    name: '用户',
    sequence: 0
  }
}
