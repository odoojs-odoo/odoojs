export default {
  view_partners_form_payment_defaultcreditcard: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_payment__action_payment_token: {
            _attr: {
              name: 'payment.action_payment_token',
              type: 'action',
              icon: 'fa-credit-card-alt',
              invisible: [['payment_token_count', '=', 0]],
              context: { todo_ctx: "{'search_default_partner_id': active_id, 'create': False, 'edit': False}" },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_form_field o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                payment_token_count: { widget: 'statinfo' }
              },
              _span_853: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Saved Payment Methods'
                }
              }
            }
          }
        }
      }
    }
  }
}
