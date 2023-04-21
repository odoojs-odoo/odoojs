export default {
  sms_tsms_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.sms',
    type: 'form',
    arch: {
      header: {
        _button_send: {
          _attr: {
            name: 'send',
            type: 'object',
            string: 'Send Now',
            states: 'outgoing',
            class: 'oe_highlight'
          }
        },
        _button_action_set_outgoing: {
          _attr: {
            name: 'action_set_outgoing',
            type: 'object',
            string: 'Retry',
            states: 'error,canceled'
          }
        },
        _button_action_set_canceled: {
          _attr: {
            name: 'action_set_canceled',
            type: 'object',
            string: 'Cancel',
            states: 'error,outgoing'
          }
        },
        state: { widget: 'statusbar' }
      },
      sheet: {
        _group: {
          _group: {
            partner_id: { string: 'Contact' },
            mail_message_id: {
              invisible: [['mail_message_id', '=', false]],
              readonly: '1'
            }
          },
          _group_455: {
            number: { required: '1' },
            failure_type: {
              invisible: [['failure_type', '=', false]],
              readonly: '1'
            }
          }
        },
        _group_807: {
          body: {
            string: 'Message',
            widget: 'sms_widget',
            required: '1'
          }
        }
      }
    }
  },

  sms_sms_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.sms',
    type: 'tree',
    arch: {
      sheet: {
        number: {},
        partner_id: {},
        failure_type: {},
        state: { widget: 'badge' },
        _button_send: {
          _attr: {
            name: 'send',
            type: 'object',
            string: 'Send Now',
            icon: 'fa-paper-plane',
            states: 'outgoing'
          }
        },
        _button_action_set_outgoing: {
          _attr: {
            name: 'action_set_outgoing',
            type: 'object',
            string: 'Retry',
            icon: 'fa-repeat',
            states: 'error,canceled'
          }
        },
        _button_action_set_canceled: {
          _attr: {
            name: 'action_set_canceled',
            type: 'object',
            string: 'Cancel',
            icon: 'fa-times-circle',
            states: 'error,outgoing'
          }
        }
      }
    }
  },

  sms_sms_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.sms',
    type: 'search',
    arch: {
      number: {},
      partner_id: {}
    }
  },

  sms_sms_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'SMS',
    res_model: 'sms.sms',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  ir_actions_server_sms_sms_resend: {
    _odoo_model: 'ir.actions.server',
    model_id: 'sms.model_sms_sms',
    model: 'sms_sms'
  }
}
