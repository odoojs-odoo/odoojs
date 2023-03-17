export default {
  view_account_analytic_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'tree',
    fields: {
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
  },

  view_account_analytic_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
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
          name: {},
          code: {},
          partner_id: {},
          active: {}
        },

        _group_balance: {
          debit: {},
          credit: {},
          balance: {},
          plan_id: {},
          company_id: {},
          currency_id: {}
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
          string: {
            en_US: 'Analytic Account',
            zh_CN: '分析科目',
            zh_HK: '分析科目'
          },

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
            string: { en_US: 'Archived', zh_CN: '已归档', zh_HK: '已归档' },
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
