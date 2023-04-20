export default {
  menu_contacts: {
    name: '基础信息管理',
    children: {
      menu_contacts_setting: {
        name: '基础配置',
        children: {
          menu_action_currency_form: { name: '货币' },
          menu_res_lang_act_window: { name: '语言' },
          menu_action_country: { name: '国家' },
          menu_action_country_group: { name: '国家组' },
          menu_action_partner_category_form: { name: '联系人标签' },
          menu_action_partner_title_contact: { name: '联系人称谓' },
          menu_res_partner_industry_action: { name: '行业类型' }
        }
      },
      menu_action_res_bank_form: { name: '银行' },
      menu_action_res_partner_bank_account_form: { name: '银行账户' },
      menu_action_contacts: { name: '联系人' }
    }
  }
}
