export default {
  mail_message_schedule_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.schedule',
    type: 'form',
    arch: {
      header: {
        _button_force_send: {
          _attr: {
            name: 'force_send',
            type: 'object',
            string: 'Force Send'
          }
        }
      },
      sheet: {
        _group: {
          mail_message_id: {},
          scheduled_datetime: {}
        },
        _group_746: {
          notification_parameters: {}
        }
      }
    }
  },

  mail_message_schedule_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.schedule',
    type: 'tree',
    arch: {
      sheet: {
        mail_message_id: {},
        scheduled_datetime: {}
      }
    }
  },

  mail_message_schedule_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.schedule',
    type: 'search',
    arch: {
      mail_message_id: {}
    }
  },

  mail_message_schedule_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Scheduled Messages',
    res_model: 'mail.message.schedule',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
