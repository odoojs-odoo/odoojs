export default {
  mail_resend_message_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.resend.message',
    type: 'form',
    arch: {
      sheet: {
        mail_message_id: {
          invisible: '1'
        },
        notification_ids: {
          invisible: '1'
        },
        can_resend: {
          invisible: '1'
        },
        partner_readonly: {
          invisible: '1'
        },
        partner_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Recipient'
                  },
                  name: {
                    readonly: '1'
                  },
                  email: {
                    readonly: [['parent.partner_readonly', '=', true]]
                  },
                  message: {
                    class: 'text-wrap',
                    readonly: '1'
                  },
                  partner_id: {
                    invisible: '1'
                  },
                  resend: {
                    widget: 'boolean_toggle'
                  }
                }
              }
            }
          }
        },
        _footer: {
          _button_resend_mail_action: {
            _attr: {
              name: 'resend_mail_action',
              type: 'object',
              string: 'Send & close',
              invisible: [['can_resend', '=', false]],
              class: 'btn-primary o_mail_send'
            }
          },
          _button_cancel_mail_action: {
            _attr: {
              name: 'cancel_mail_action',
              type: 'object',
              string: 'Ignore all',
              invisible: [['can_resend', '=', true]],
              class: 'btn-primary'
            }
          },
          _button_cancel_mail_action_354: {
            _attr: {
              name: 'cancel_mail_action',
              type: 'object',
              string: 'Ignore all',
              invisible: [['can_resend', '=', false]],
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

  mail_resend_message_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sending Failures',
    type: 'ir.actions.act_window',
    res_model: 'mail.resend.message',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
