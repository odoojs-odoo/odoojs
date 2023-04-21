export default {
  mail_channel_view_form_: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel',
    inherit_id: 'mail.mail_channel_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='group_ids']",
            position: 'after'
          },
          subscription_department_ids: {
            string: 'Auto Subscribe Departments',
            widget: 'many2many_tags',
            invisible: [['channel_type', '!=', 'channel']]
          }
        }
      }
    }
  }
}
