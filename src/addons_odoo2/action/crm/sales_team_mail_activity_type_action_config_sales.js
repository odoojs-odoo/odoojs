export default {
  sales_team_mail_activity_type_action_config_sales: {
    _odoo_model: 'ir.actions.act_window',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['res_model', '=', False], ['res_model', 'in', ['crm.lead', 'res.partner']]]",
    context: { default_res_model: 'crm.lead' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
