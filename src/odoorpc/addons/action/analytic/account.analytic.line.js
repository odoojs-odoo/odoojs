export default {
  view_account_analytic_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'tree',
    fields: {
      // company_id: { invisible: '1' },
      product_uom_category_id: { invisible: '1' },
      date: {},
      name: {},
      account_id: {},
      plan_id: {},
      currency_id: { invisible: '1' },
      unit_amount: {},
      product_uom_id: {},
      partner_id: {},
      company_id: {},
      amount: {}
    }
  },

  view_account_analytic_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
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
          _span: 2,
          name: {},
          account_id: {},
          date: {},
          company_id: {}
        },

        _group_amount: {
          _span: 2,
          amount: {},
          product_uom_category_id: { invisible: '1' },
          product_uom_id: {},
          currency_id: { invisible: '1' }
        }
      }
    }
  },

  view_account_analytic_line_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'search',
    arch: {
      fields: {
        name: {},
        account_id: {},
        plan_id: {}
      },

      filters: {
        group_date: {
          date: { string: '日期', date: 'date' }
        }
      }
    }
  },

  account_analytic_line_action_entries: {
    _odoo_model: 'ir.actions',
    name: 'Analytic Items',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.line',
    search_view_id: 'analytic.view_account_analytic_line_filter',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_analytic_line_tree',
      form: 'view_account_analytic_line_form'
    }
  }
}
