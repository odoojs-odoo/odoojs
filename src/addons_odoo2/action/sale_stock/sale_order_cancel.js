export default {
  sale_order_cancel_view_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.cancel',
    inherit_id: 'sale.sale_order_cancel_view_form',
    arch: {
      sheet: {
        _span: {
          display_delivery_alert: {
            invisible: '1'
          },
          _span: {
            _attr: {
              invisible: [['display_delivery_alert', '=', false]],
              text: 'Some deliveries are already done. Returns can be created from the Delivery Orders.'
            }
          }
        }
      }
    }
  }
}
