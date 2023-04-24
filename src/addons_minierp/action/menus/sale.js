export default {
  menu_sale: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Sale',
    sequence: 50,
    children: {
      menu_sale_setting: {
        name: 'Config',
        sequence: 1,
        children: {}
      },

      menu_sale_master: {
        name: 'Master',
        children: {}
      },
      menu_action_quotations_with_onboarding: {
        name: 'Quotations',
        action: '_sale.action_quotations_with_onboarding'
      },
      menu_action_orders: {
        name: 'Sales Orders',
        action: '_sale.action_orders'
      }
    }
  }
}
