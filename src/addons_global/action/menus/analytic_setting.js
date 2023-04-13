export default {
  menu_analytic_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Analytic Setting',
    sequence: 14,
    children: {
      menu_action_analytic_distribution_model: {
        name: 'Analytic Distribution Models',
        action: 'analytic.action_analytic_distribution_model'
      },
      menu_action_account_analytic_account_form: {
        name: 'Analytic Accounts',
        action: 'analytic.action_account_analytic_account_form'
      },
      menu_account_analytic_plan_action: {
        name: 'Analytic Plan',
        action: 'analytic.account_analytic_plan_action'
      }
    }
  }
}
