export default {
  view_account_analytic_default_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.default',
    type: 'tree',
    fields: {
      sequence: {},
      analytic_id: {},
      analytic_tag_ids: { widget: 'many2many_tags' },
      product_id: {},
      partner_id: {},
      user_id: {},
      account_id: {},
      date_start: {},
      date_stop: {},
      company_id: {}
    }
  },

  view_account_analytic_default_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.default',
    type: 'form',
    fields: {
      sequence: {},
      analytic_id: {},
      analytic_tag_ids: { widget: 'many2many_tags' },
      product_id: {},
      partner_id: {},
      user_id: {},
      account_id: {},
      date_start: {},
      date_stop: {},
      company_id: {}
    }
  },

  view_account_analytic_default_form_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.default',
    type: 'search',
    arch: {
      fields: {
        analytic_id: {},
        product_id: {},
        partner_id: {},
        user_id: {},
        company_id: {}
      },

      filters: {}
    }
  },

  action_analytic_default_list: {
    _odoo_model: 'ir.actions',
    name: '分析科目默认规则',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.default',
    search_view_id: 'view_account_analytic_default_form_search',
    domain: [],
    context: {}
  },
  menu_analytic_default_list: {
    _odoo_model: 'ir.ui.menu',
    name: '分析科目默认规则',
    action: 'action_analytic_default_list',
    parent: 'account.menu_analytic_accounting'
  }
}
