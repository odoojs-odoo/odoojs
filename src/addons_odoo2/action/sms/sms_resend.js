export default {
  mail_resend_message_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.resend',
    type: 'form',
    arch: {
      sheet: {
        mail_message_id: { invisible: '1' },
        can_resend: { invisible: '1' },
        has_insufficient_credit: { invisible: '1' },
        has_unregistered_account: { invisible: '1' },
        recipient_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: { string: 'Recipient' },
                  partner_name: {},
                  sms_number: {},
                  failure_type: {
                    string: 'Reason',
                    class: 'text-wrap'
                  },
                  resend: { widget: 'boolean_toggle' },
                  notification_id: { invisible: '1' }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_buy_credits: {
            _attr: {
              name: 'action_buy_credits',
              type: 'object',
              string: 'Buy credits',
              invisible: [['has_insufficient_credit', '=', false]],
              class: 'btn-primary o_mail_send'
            }
          },
          _button_action_buy_credits_162: {
            _attr: {
              name: 'action_buy_credits',
              type: 'object',
              string: 'Set up an account',
              invisible: [['has_unregistered_account', '=', false]],
              class: 'btn-primary o_mail_send'
            }
          },
          _button_action_resend: {
            _attr: {
              name: 'action_resend',
              type: 'object',
              string: 'Send & Close',
              invisible: ['|', ['has_unregistered_account', '=', false], ['can_resend', '=', false]],
              class: 'btn-primary o_mail_send'
            }
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              type: 'object',
              string: 'Ignore all',
              invisible: ['|', '|', ['has_insufficient_credit', '=', true], ['has_unregistered_account', '=', true], '&', ['has_unregistered_account', '=', true], ['can_resend', '=', true]],
              class: 'btn-primary'
            }
          },
          _button_action_cancel_186: {
            _attr: {
              name: 'action_cancel',
              type: 'object',
              string: 'Ignore all',
              invisible: ['!', '|', '|', ['has_insufficient_credit', '=', true], ['has_unregistered_account', '=', true], '&', ['has_unregistered_account', '=', true], ['can_resend', '=', true]],
              class: 'btn-secondary'
            }
          },
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  sms_resend_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sending Failures',
    type: 'ir.actions.act_window',
    res_model: 'sms.resend',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
