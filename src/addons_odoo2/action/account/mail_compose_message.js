export default {
  account_send_payment_receipt_by_email_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send receipt by email',
    res_model: 'mail.compose.message',
    context: "{                 'mail_post_autofollow': True,                 'default_composition_mode': 'comment',                 'default_use_template': True,                 'default_template_id': ref('account.mail_template_data_payment_receipt'),                 'default_email_layout_xmlid': 'mail.mail_notification_light',             }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  account_send_payment_receipt_by_email_action_multi: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send receipts by email',
    res_model: 'mail.compose.message',
    context: "{                 'mail_post_autofollow': True,                 'default_composition_mode': 'mass_mail',                 'default_use_template': True,                 'default_template_id': ref('account.mail_template_data_payment_receipt'),                 'default_email_layout_xmlid': 'mail.mail_notification_light',             }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
