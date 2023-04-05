export default {
  view_account_analytic_line_tree_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'tree',
    inherit_id: 'analytic.view_account_analytic_line_tree',

    fields: {
      account_id: {},
      ref: {
        optional: 'hide',
        invisible({ context }) {
          // invisible="context.get('to_invoice', False)"
          return !context.to_invoice
        }
      },
      general_account_id: { optional: 'hide' },
      move_line_id: { widget: 'line_open_move_widget', optional: 'hide' },
      product_id: { optional: 'hide' }
    }
  },

  view_account_analytic_line_form_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'form',
    inherit_id: 'analytic.view_account_analytic_line_form',

    arch: {
      sheet: {
        _group: {
          _group_amount: {
            amount: {},
            ref: {},
            partner_id: {},
            product_uom_category_id: { invisible: '1' },
            product_id: {}
          },

          _group_accounting: {
            _attr: { name: 'accounting', string: 'Accounting' },

            move_line_id: { widget: 'line_open_move_widget' },
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
    }
  },

  view_account_analytic_line_filter_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'search',
    inherit_id: 'analytic.view_account_analytic_line_filter',
    arch: {
      fields: {
        plan_id: {},
        product_id: {},
        partner_id: {
          filter_domain(self) {
            return [['partner_id', 'child_of', self]]
          }
        }
      }
    }
  }
}
