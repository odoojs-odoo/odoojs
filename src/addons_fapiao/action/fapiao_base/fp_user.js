export default {
  view_users_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.users',
    type: 'tree',
    priority: 2,
    fields: {
      company_id: {},
      name: {},
      login: {},
      payee_name: {},
      checker_name: {},
      drawer_name: {},
      taxmachine_id: {},
      taxmachine_code: {}
    }
  },

  view_users_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.users',
    type: 'form',

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          company_id: {},
          user_id: {},
          name: {},
          login: {}
        },
        _group_taxmachine: {
          payee_name: {},
          checker_name: {},
          drawer_name: {},
          taxmachine_id: {
            // domain="[('company_id', '=', company_id)]"
            domain({ record }) {
              const { company_id } = record
              return [['company_id', '=', company_id]]
            }
          },
          taxmachine_code: {}
        }
      }
    },
    fields: {}
  },

  action_users: {
    _odoo_model: 'ir.actions',
    name: '用户开票设置',
    type: 'ir.actions.act_window',
    res_model: 'fp.users',
    // search_view_id: '',
    domain: [],
    context: {},
    views: {
      tree: 'view_users_tree',
      form: 'view_users_form'
    }
  }
}
