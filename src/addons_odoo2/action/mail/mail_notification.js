export default {
  mail_notification_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.notification',
    type: 'tree',
    arch: {
      sheet: {
        mail_message_id: {},
        notification_type: {},
        res_partner_id: {},
        is_read: {},
        failure_type: {}
      }
    }
  },

  mail_notification_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.notification',
    type: 'form',
    arch: {
      header: {
        notification_status: {
          widget: 'statusbar'
        }
      },
      sheet: {
        _group: {
          _group: {
            _attr: {
              string: 'Source'
            },
            mail_message_id: {},
            notification_type: {},
            mail_mail_id: {},
            res_partner_id: {}
          },
          _group_953: {
            _attr: {
              string: 'Status'
            },
            is_read: {},
            read_date: {},
            failure_type: {},
            failure_reason: {}
          }
        }
      }
    }
  },

  mail_notification_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Notifications',
    res_model: 'mail.notification',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
