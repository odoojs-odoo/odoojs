export default {
  mail_activity_type_action_config_sales: {
    _odoo_model: 'ir.actions',
    name: 'Activity Types',
    res_model: 'mail.activity.type',
    domain: '['|', ('res_model', '=', False), ('res_model', '=', 'res.partner')]',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
