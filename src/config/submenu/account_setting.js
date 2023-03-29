export default {
  id: 'odoo.account',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Account Config', zh_CN: '财务配置', zh_HK: '财务配置' },
  children: [
    {
      action: 'account.action_incoterms_tree',
      id: 'odoo_account.action_incoterms_tree',
      icon: 'shopping',
      name: { en_US: 'Incoterms', zh_CN: '国际贸易术语', zh_HK: '国际贸易术语' }
    },

    {
      action: 'account.action_account_tax_template_form',
      id: 'odoo_account.action_account_tax_template_form',
      icon: 'shopping',
      name: { en_US: 'Tax Templates', zh_CN: '税模版', zh_HK: '税模版' }
    },

    {
      action: 'account.action_account_journal_group_list',
      id: 'odoo_account.action_account_journal_group_list',
      icon: 'shopping',
      name: { en_US: 'Journal Groups', zh_CN: '日记账组', zh_HK: '日记账组' }
    },

    {
      action: 'account.action_account_journal_form',
      id: 'odoo_account.action_account_journal_form',
      icon: 'shopping',
      name: { en_US: 'Journals', zh_CN: '日记账', zh_HK: '日记账' }
    },

    {
      action: 'account.action_account_account_tag',
      id: 'odoo_account.action_account_account_tag',
      icon: 'shopping',
      name: { en_US: 'Account Tags', zh_CN: '科目标签', zh_HK: '科目标签' }
    },

    {
      action: 'account.action_account_group_action',
      id: 'odoo_account.action_account_group_action',
      icon: 'shopping',
      name: { en_US: 'Account Groups', zh_CN: '科目组', zh_HK: '科目组' }
    },

    {
      action: 'account.action_account_form',
      id: 'odoo_account.action_account_form',
      icon: 'shopping',
      name: { en_US: 'Chart of Accounts', zh_CN: '科目表', zh_HK: '科目表' }
    },

    {
      action: 'account.action_account_fiscal_position_template',
      id: 'odoo_account.action_account_fiscal_position_template',
      icon: 'shopping',
      name: {
        en_US: 'Fiscal Position Templates',
        zh_CN: '财务状况模版',
        zh_HK: '财务状况模版'
      }
    },
    {
      action: 'account.action_account_fiscal_position_form',
      id: 'odoo_account.action_account_fiscal_position_form',
      icon: 'shopping',
      name: { en_US: 'Fiscal Positions', zh_CN: '财务状况', zh_HK: '财务状况' }
    },
    {
      action: 'account.action_payment_term_form',
      id: 'odoo_account.action_payment_term_form',
      icon: 'shopping',
      name: { en_US: 'Payment Terms', zh_CN: '支付条款', zh_HK: '支付条款' }
    },

    {
      action: 'account.action_analytic_distribution_model',
      id: 'odoo_account.action_analytic_distribution_model',
      icon: 'shopping',
      name: {
        en_US: 'Analytic Distribution Models',
        zh_CN: '分析分配模型',
        zh_HK: '分析分配模型'
      }
    },

    {
      action: 'account.account_analytic_plan_action',
      id: 'odoo_account.account_analytic_plan_action',
      icon: 'shopping',
      name: { en_US: 'Analytic Plans', zh_CN: '分析计划', zh_HK: '分析计划' }
    }
  ]
}
