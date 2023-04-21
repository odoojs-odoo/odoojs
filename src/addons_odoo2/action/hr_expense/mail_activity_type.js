export default {
  mail_activity_type_action_config_hr_expense: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Activity Types',
    res_model: 'mail.activity.type',
    search_view_id: 'tooooooodoooooo',
    domain: "['|', ['res_model', '=', False], ['res_model', '=', 'hr.expense.sheet']]",
    context: { default_res_model: 'hr.expense.sheet' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
