export default {
  menu_contacts: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Contacts',
    sequence: 10,
    children: {
      menu_contacts_setting: {
        name: 'Config',
        children: {
          menu_action_country: {
            name: 'Country',
            action: 'base.action_country'
          },
          menu_action_partner_category_form: {
            name: 'Contact Tags',
            action: 'base.action_partner_category_form'
          },
          menu_action_partner_title_contact: {
            name: 'Partner Title',
            action: 'base.action_partner_title_contact'
          },
          menu_res_partner_industry_action: {
            name: 'Industry',
            action: 'base.res_partner_industry_action'
          }
        }
      },

      menu_action_contacts: {
        name: 'Contacts',
        action: '_base.action_contacts'
      }
    }
  }
}
