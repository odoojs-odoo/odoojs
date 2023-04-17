export default {
  payment_provider_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    inherit_id: 'payment.payment_provider_form',
    arch: {
      sheet: {
        _group_payment_form: {
          _attr: {
            name: 'payment_form'
          },
          so_reference_type: {
            attrs: {
              invisible: "[('code', '!=', 'custom')]"
            }
          }
        }
      }
    }
  }
}
