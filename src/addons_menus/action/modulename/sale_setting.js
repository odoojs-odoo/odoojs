export default {
  menu_sale_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Sale Setting',
    sequence: 17,
    children: {
      sales_team_crm_tag_action: {
        name: 'Tags',
        action: 'sales_team.sales_team_crm_tag_action'
      },
      crm_team_action_config: {
        name: 'Sales Teams',
        action: 'sales_team.crm_team_action_config'
      }
    }
  }
}
