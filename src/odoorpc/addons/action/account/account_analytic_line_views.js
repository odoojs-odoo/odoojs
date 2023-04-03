export default {
  view_account_analytic_line_tree_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'tree',
    fields: {
      // company_id: { invisible: '1' },
      product_uom_category_id: { invisible: '1' },
      date: {},
      name: {},
      account_id: {},
      //   ref: {},
      //   general_account_id: {},
      //   move_line_id: {},
      //   product_id: {},

      plan_id: {},
      currency_id: { invisible: '1' },
      unit_amount: {},
      product_uom_id: {},
      partner_id: {},
      company_id: {},
      amount: {}
    }
  },

  view_account_analytic_line_form_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

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
          ref: {},
          partner_id: {},
          product_uom_category_id: { invisible: '1' },
          product_id: {},
          product_uom_id: {},
          currency_id: { invisible: '1' }
        },
        _group_accounting: {
          move_line_id: {
            // widget:"line_open_move_widget"
          },
          general_account_id: {
            readonly({ record }) {
              // 'readonly': [('move_line_id', '!=', False)]
              const { move_line_id } = record
              return !move_line_id
            }
          }
        }
      }
    }
  },

  view_account_analytic_line_filter_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'search',
    arch: {
      fields: {
        name: {},
        account_id: {},
        plan_id: {},
        product_id: {},
        partner_id: {
          filter_domain(self) {
            return [['partner_id', 'child_of', self]]
          }
        }
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
    search_view_id: 'view_account_analytic_line_filter_inherit_account',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_analytic_line_tree_inherit_account',
      form: 'view_account_analytic_line_form_inherit_account'
    }
  }
}
