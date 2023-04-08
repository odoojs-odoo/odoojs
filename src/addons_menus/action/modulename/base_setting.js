export default {
  menu_base_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Base Setting',
    sequence: 10,
    children: {
      open_module_tree: { name: 'Apps', action: 'base.open_module_tree' },
      action_currency_form: {
        name: 'Currency',
        action: 'base.action_currency_form'
      },
      res_lang_act_window: {
        name: 'Languages',
        action: 'base.res_lang_act_window'
      },
      action_country: { name: 'Country', action: 'base.action_country' },
      action_country_group: {
        name: 'Country Group',
        action: 'base.action_country_group'
      },
      action_partner_category_form: {
        name: 'Contact Tags',
        action: 'base.action_partner_category_form'
      },
      action_partner_title_contact: {
        name: 'Partner Title',
        action: 'base.action_partner_title_contact'
      },
      res_partner_industry_action: {
        name: 'Industry',
        action: 'base.res_partner_industry_action'
      },
      action_res_company_form: {
        name: 'Company',
        action: 'base.action_res_company_form'
      }
    }
  }
}
