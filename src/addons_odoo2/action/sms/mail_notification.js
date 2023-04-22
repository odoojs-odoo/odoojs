export default {
  mail_notification_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.notification',
    inherit_id: 'mail.mail_notification_view_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='res_partner_id']",
            position: 'after'
          },
          sms_number: {}
        }
      }
    }
  },

  mail_notification_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.notification',
    inherit_id: 'mail.mail_notification_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='res_partner_id']",
            position: 'after'
          },
          sms_number: {}
        },
        _xpath_791: {
          _attr: {
            expr: "//field[@name='mail_mail_id']",
            position: 'after'
          },
          sms_id: {}
        }
      }
    }
  }
}
