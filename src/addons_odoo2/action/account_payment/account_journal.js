export default {
  view_account_journal_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    inherit_id: 'account.view_account_journal_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='inbound_payment_method_line_ids']//field[@name='payment_account_id']",
            position: 'after'
          },
          payment_provider_id: { invisible: '1' },
          payment_provider_state: { invisible: '1' },
          _button_action_open_provider_form: {
            _attr: {
              name: 'action_open_provider_form',
              type: 'object',
              string: 'SETUP',
              groups: 'base.group_system',
              invisible: [['payment_provider_id', '=', false]],
              class: 'float-end btn-secondary'
            }
          }
        },
        _xpath_654: {
          _attr: {
            expr: "//field[@name='inbound_payment_method_line_ids']/tree",
            position: 'attributes'
          },
          _attribute_decoration$dash$muted: {
            _attr: {
              name: 'decoration-muted',
              text: "payment_provider_state == 'disabled'",
              decoration-muted: "payment_provider_state == 'disabled'"
            }
          }
        }
      }
    }
  }
}
