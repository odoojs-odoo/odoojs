export default {
  id: 'odoo.base',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Base', zh_CN: '基础配置', zh_HK: '基础配置' },
  children: [
    {
      action: 'base.action_country',
      id: 'odoo_base.action_country',
      icon: 'shopping',
      name: { en_US: 'Country', zh_CN: '国家', zh_HK: '国家' }
    },

    {
      action: 'base.action_country_group',
      id: 'odoo_base.action_country_group',
      icon: 'shopping',
      name: { en_US: 'Country Group', zh_CN: '国家组', zh_HK: '国家组' }
    },

    {
      action: 'base.action_partner_category_form',
      id: 'odoo_base.action_partner_category_form',
      icon: 'shopping',
      name: { en_US: 'Contact Tags', zh_CN: '联系人标签', zh_HK: '联系人标签' }
    },

    {
      action: 'base.action_partner_title_contact',
      id: 'odoo_base.action_partner_title_contact',
      icon: 'shopping',
      name: { en_US: 'Partner Title', zh_CN: '联系人头衔', zh_HK: '联系人头衔' }
    },

    {
      action: 'base.res_partner_industry_action',
      id: 'odoo_base.res_partner_industry_action',
      icon: 'shopping',
      name: { en_US: 'Industry', zh_CN: '行业', zh_HK: '行业' }
    }
  ]
}
