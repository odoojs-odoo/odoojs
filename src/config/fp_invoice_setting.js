export default {
  id: 'fapiao_invoice_setting',
  icon: 'shopping',
  theme: 'twoTone',
  name: {
    en_US: 'Fapaio Invoice Setting',
    zh_CN: '销项设置',
    zh_HK: '销项设置'
  },
  children: [
    {
      action: 'fapiao_base.action_company_taxmachine',
      id: 'fapiao_base.action_company_taxmachine',
      icon: 'shopping',
      name: { en_US: 'Tax Machine', zh_CN: '税控设备', zh_HK: '税控设备' }
    },

    {
      action: 'fapiao_base.action_users',
      id: 'fapiao_base.action_users',
      icon: 'shopping',
      name: {
        en_US: 'User Drawer',
        zh_CN: '开票用户设置',
        zh_HK: '开票用户设置'
      }
    }
  ]
}
