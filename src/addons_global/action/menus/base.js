export default {
  menu_base: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_master',
    name: 'Base',
    sequence: 10,
    children: {
      menu_action_res_bank_form: {
        name: 'Bank',
        action: 'base.action_res_bank_form'
      },
      menu_action_res_partner_bank_account_form: {
        name: 'Bank Account',
        action: 'base.action_res_partner_bank_account_form'
      },
      menu_action_res_users: {
        name: 'User',
        action: 'base.action_res_users'
      },
      menu_action_contacts: {
        name: 'Partner',
        action: 'contacts.action_contacts'
      }
    }
  }
}
