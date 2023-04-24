export default {
  view_account_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          name: {},
          _label_code_prefix_start: {
            for: 'code_prefix_start',
            string: 'Code Prefix'
          },
          _div: {
            _attr: { text: ['From', 'to'] },
            code_prefix_start: { class: 'oe_inline' },
            code_prefix_end: { class: 'oe_inline' }
          },
          company_id: {}
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
        string: 'Account group',
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

  view_account_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'tree',
    arch: {
      sheet: {
        code_prefix_start: {},
        code_prefix_end: {},
        name: {},
        company_id: {}
      }
    }
  },

  action_account_group_action: {
    _odoo_model: 'ir.actions.act_window',
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
