export default {
  transaction_form_inherit_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    inherit_id: 'payment.payment_transaction_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_button_box')]",
            position: 'inside'
          },
          _button_action_view_sales_orders: {
            _attr: {
              name: 'action_view_sales_orders',
              type: 'object',
              icon: 'fa-money',
              invisible: [['sale_order_ids_nbr', '=', 0]],
              class: 'oe_stat_button'
            },
            sale_order_ids_nbr: {
              string: 'Sales Order(s)',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
