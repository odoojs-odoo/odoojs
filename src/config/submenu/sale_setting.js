export default {
  id: 'odoo.sale_setting',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Sale Setting', zh_CN: '销售配置', zh_HK: '销售配置' },
  children: [
    {
      action: 'sales_team.sales_team_crm_tag_action',
      id: 'sales_team.sales_team_crm_tag_action',
      icon: 'shopping',
      name: { en_US: 'Tags', zh_CN: '销售标签', zh_HK: '销售标签' }
    },

    {
      action: 'sales_team.crm_team_action_config',
      id: 'sales_team.crm_team_action_config',
      icon: 'shopping',
      name: { en_US: 'Sales Teams', zh_CN: '销售团队', zh_HK: '销售团队' }
    }
  ]
}
