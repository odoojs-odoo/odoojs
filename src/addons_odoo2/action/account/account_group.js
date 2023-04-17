export default {
  view_account_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          _label_code_prefix_start: {
            for: 'code_prefix_start',
            string: 'Code Prefix'
          },
          _div: {
            _attr: {
              text: 'From'
            },
            code_prefix_start: {
              class: 'oe_inline'
            },
            code_prefix_end: {
              class: 'oe_inline'
            }
          },
          company_id: {
            groups: 'base.group_multi_company',
            no_create: true
          }
        }
      }
    }
  },

  view_account_group_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'search',
    arch: {
      name: {
        string: 'Account group'
      }
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
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  }
}
