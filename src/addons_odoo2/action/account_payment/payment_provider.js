export default {
  payment_provider_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    inherit_id: 'payment.payment_provider_form',
    arch: {
      sheet: {
        _group_payment_followup: {
          _attr: {
            name: 'payment_followup',
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        },
        _group_payment_followup_983: {
          _attr: {
            name: 'payment_followup',
            position: 'inside'
          },
          journal_id: {
            required: [['state', '!=', 'disabled'], ['code', 'not in', ['none', 'custom']]],
            context: { default_type: 'bank' }
          }
        }
      }
    }
  }
}
