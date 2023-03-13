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
      name: {
        en_US: 'Bank Account',
        zh_CN: '银行账号',
        zh_HK: '銀行帳號'
      }
    },
    {
      action: 'base.action_res_company_form',
      id: 'odoo_base.action_res_company_form',
      icon: 'shopping',
      name: { en_US: 'Company', zh_CN: '公司', zh_HK: '公司' }
    },

    {
      action: 'base.action_res_users',
      id: 'odoo_base.action_res_users',
      icon: 'shopping',
      name: { en_US: 'User', zh_CN: '用户', zh_HK: '用户' }
    },

    {
      action: 'base.action_partner_of_contact_organization',
      id: 'odoo_base.action_partner_of_contact_organization',
      icon: 'shopping',
      name: {
        en_US: 'Partner Organization',
        zh_CN: '联系人(组织)',
        zh_HK: '联系人(组织)'
      }
    },
    {
      action: 'base.action_partner_of_contact_person',
      id: 'odoo_base.action_partner_of_contact_person',
      icon: 'shopping',
      name: {
        en_US: 'Partner Person',
        zh_CN: '联系人(个人)',
        zh_HK: '联系人(个人)'
      }
    }
  ]
}
