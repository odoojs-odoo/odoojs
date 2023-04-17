export default {
  view_account_analytic_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {},
        name: {},
        code: {},
        partner_id: {},
        plan_id: {},
        debit: {},
        credit: {},
        balance: {},
        active: {}
      }
    }
  },

  view_account_analytic_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: 1 },

        _div_button_box: {
          _button_account_analytic_line_action: {
            _attr: {
              type: 'action',
              name: 'account_analytic_line_action',
              icon: 'fa-usd'
            },
            balance: { widget: 'monetary', string: 'Gross Margin' }
          }
        },

        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: ({ record }) => {
              // 'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _div_title: {
          _h1: { name: { placeholder: 'e.g. Project XYZ' } }
        },

        _div_project: {},
        _group_main: {
          _group_name: {
            active: { invisible: '1' },
            partner_id: {},
            code: {}
          },

          _group_balance: {
            // debit: {},
            // credit: {},
            //
            plan_id: {},
            company_id: { groups: 'base.group_multi_company' },
            currency_id: { groups: 'base.group_multi_currency' }
          }
        }
      }
    }
  },

  view_account_analytic_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Analytic Account',

          filter_domain: self => {
            // ['|', ('name', 'ilike', self), ('code', 'ilike', self)]
            return ['|', ['name', 'ilike', self], ['code', '=like', self]]
          }
        },
        partner_id: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_account_analytic_account_form: {
    _odoo_model: 'ir.actions',
    name: '分析科目',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.account',
    search_view_id: 'view_account_analytic_account_search',
    domain: [],
    context: { search_default_active: 1 },
    views: {
      tree: 'view_account_analytic_account_list',
      form: 'view_account_analytic_account_form'
    }
  }
}
