export default {
  view_account_analytic_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        product_uom_category_id: { invisible: '1' },
        date: { optional: 'show' },
        name: {},
        account_id: {},
        plan_id: {},
        currency_id: { invisible: '1' },
        unit_amount: { sum: 'Quantity', optional: 'hide' },
        product_uom_id: { optional: 'hide' },
        partner_id: { optional: 'hide' },
        company_id: { groups: 'base.group_multi_company' },
        amount: { sum: 'Total', optional: 'show' }
      }
    }
  },

  view_account_analytic_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_analytic_item: {
            _attr: { name: 'analytic_item', string: 'Analytic Item' },
            name: {},
            account_id: {},
            date: {},
            company_id: { groups: 'base.group_multi_company' }
          },

          _group_amount: {
            _attr: { name: 'amount', string: 'Amount' },
            amount: {},
            product_uom_category_id: { invisible: '1' },
            product_uom_id: {},
            currency_id: { invisible: '1' }
          }
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
    _odoo_model: 'ir.actions.act_window',
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
