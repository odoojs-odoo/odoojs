export default {
  account_analytic_account_view_form_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    inherit_id: 'analytic.view_account_analytic_account_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_purchase_orders: {
            _attr: {
              name: 'action_view_purchase_orders',
              invisible: [['purchase_order_count', '=', 0]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-credit-card'
            },
            purchase_order_count: {
              string: 'Purchase Orders',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
