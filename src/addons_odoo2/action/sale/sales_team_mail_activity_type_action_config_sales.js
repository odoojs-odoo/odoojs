export default {
  sales_team_mail_activity_type_action_config_sales: {
    _odoo_model: 'ir.actions.act_window',
    domain: "['|', ['res_model', '=', False], ['res_model', 'in', ['sale.order', 'res.partner', 'product.template', 'product.product']]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
