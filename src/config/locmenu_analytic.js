export default {
  id: 'odoo.analytic',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Analytic', zh_CN: '辅助核算', zh_HK: '辅助核算' },
  children: [
    {
      action: 'analytic.action_analytic_distribution_model',
      id: 'odoo_analytic.action_analytic_distribution_model',
      icon: 'shopping',
      name: {
        en_US: 'Analytic Distribution Models',
        zh_CN: '分析分配模型',
        zh_HK: '分析分配模型'
      }
    },
    {
      action: 'analytic.action_account_analytic_account_form',
      id: 'odoo_analytic.action_account_analytic_account_form',
      icon: 'shopping',
      name: { en_US: 'Analytic Accounts', zh_CN: '分析科目', zh_HK: '分析科目' }
    },
    {
      action: 'analytic.account_analytic_plan_action',
      id: 'odoo_analytic.account_analytic_plan_action',
      icon: 'shopping',
      name: { en_US: 'Analytic Plans', zh_CN: '分析计划', zh_HK: '分析计划' }
    },

    {
      action: 'analytic.account_analytic_line_action_entries',
      id: 'odoo_analytic.account_analytic_line_action_entries',
      icon: 'shopping',
      name: { en_US: 'Analytic Items', zh_CN: '分析明细', zh_HK: '分析明细' }
    }
  ]
}
