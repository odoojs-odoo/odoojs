export default {
  view_account_analytic_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'tree',
    buttons: { create: false, edit: true, delete: false },

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
    buttons: { create: false, edit: false, delete: false },

    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          _span: 2,
          name: {}
        },

        _group_button_box: {
          invoice_count: { widget: 'statinfo' },
          vendor_bill_count: { widget: 'statinfo' }
        }
      }
    }
  },

  action_account_analytic_account_form: {
    _odoo_model: 'ir.actions',
    name: '分析科目',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.account',
    search_view_id: 'analytic.view_account_analytic_account_search',
    domain: [],
    context: { search_default_active: 1 },
    views: {
      tree: 'view_account_analytic_account_list',
      form: 'view_account_analytic_account_form'
    }
  }
}
