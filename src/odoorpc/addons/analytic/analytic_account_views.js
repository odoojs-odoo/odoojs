export default {
  view_account_analytic_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'tree',
    fields: {
      name: {},
      code: {},
      partner_id: {},
      debit: {},
      credit: {},
      balance: {},
      company_id: {},
      active: {}
    }
  },

  action_analytic_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'form',
    fields: {
      name: {},
      code: {},
      partner_id: {},
      group_id: {},
      company_id: {},
      currency_id: {},

      debit: {},
      credit: {},
      balance: {},
      active: {}
    }
  },

  view_account_analytic_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return ['|', ['name', 'ilike', self], ['code', '=like', self]]
          }
        },
        partner_id: {}
      },

      filters: {
        group1: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
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
    context: { search_default_active: 1 }
  },

  account_analytic_group_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.group',
    type: 'tree',
    fields: {
      name: {},
      company_id: {}
    }
  },

  account_analytic_group_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.group',
    type: 'form',
    fields: {
      name: {},
      parent_id: {},
      description: {},
      company_id: {}
    }
  },

  account_analytic_group_action: {
    _odoo_model: 'ir.actions',
    name: '分析科目组',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.group',
    domain: [],
    context: {}
  },

  account_analytic_tag_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.tag',
    type: 'tree',
    fields: {
      name: {},
      company_id: {}
    }
  },

  account_analytic_tag_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.tag',
    type: 'form',
    fields: {
      name: {},
      active_analytic_distribution: {},

      company_id: {},
      active: {},

      analytic_distribution_ids: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              account_id: {},
              percentage: {}
            }
          },
          form: {
            fields: {
              account_id: {},
              percentage: {}
            }
          }
        }
      }
    }
  },

  account_analytic_tag_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.tag',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group1: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  account_analytic_tag_action: {
    _odoo_model: 'ir.actions',
    name: '分析科目标签',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.tag',
    domain: [],
    context: {}
  }
}
