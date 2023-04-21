export default {
  mail_activity_type_action_config_sale: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Activity Types',
    res_model: 'mail.activity.type',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['res_model', '=', False], ['res_model', '=', 'sale.order']]",
    context: { default_res_model: 'sale.order' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
