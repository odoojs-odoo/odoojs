export default {
  view_account_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'tree',
    arch: {
      sheet: {
        code_prefix_start: {},
        code_prefix_end: {},
        name: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  view_account_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          name: {},
          code_prefix_start: {},
          code_prefix_end: {},
          company_id: { groups: 'base.group_multi_company' }
        }
      }
    }
  },

  view_account_group_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain(self) {
            // "['|', ('code_prefix_start', '=like', self + '%'), ('name', 'ilike', self)]"
            return [
              '|',
              ['code_prefix_start', '=like', `${self}%`],
              ['name', 'ilike', self]
            ]
          }
        }
      },

      filters: {}
    }
  },

  action_account_group_action: {
    _odoo_model: 'ir.actions',
    name: 'Account Groups',
    type: 'ir.actions.act_window',
    res_model: 'account.group',
    search_view_id: 'view_account_group_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_group_tree',
      form: 'view_account_group_form'
    }
  }
}
