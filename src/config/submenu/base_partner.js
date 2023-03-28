export default {
  id: 'odoo.base_partner',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Partner', zh_CN: '联系人', zh_HK: '联系人' },
  children: [
    {
      action: 'base.action_res_bank_form',
      id: 'odoo_base.action_res_bank_form',
      icon: 'shopping',
      name: { en_US: 'Bank', zh_CN: '银行', zh_HK: '銀行' }
    },

    {
      action: 'base.action_res_partner_bank_account_form',
      id: 'odoo_base.action_res_partner_bank_account_form',
      icon: 'shopping',
      name: { en_US: 'Bank Account', zh_CN: '银行账号', zh_HK: '銀行帳號' }
    },

    {
      action: 'base.action_res_users',
      id: 'odoo_base.action_res_users',
      icon: 'shopping',
      name: { en_US: 'User', zh_CN: '用户', zh_HK: '用户' }
    },

    {
      action: 'contacts.action_contacts',
      id: 'odoo_contacts.action_contacts',
      icon: 'shopping',
      name: { en_US: 'Partner', zh_CN: '联系人', zh_HK: '联系人' }
    }
  ]
}
