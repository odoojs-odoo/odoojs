export default {
  menu_sale: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Sale',
    sequence: 50,
    children: {
      sale_master: {
        name: 'Master',
        children: {
          res_partner_action_customer: {
            name: 'Customers',
            action: 'sales_team.res_partner_action_customer'
          }
        }
      },
      action_quotations_with_onboarding: {
        name: 'Quotations',
        action: 'sale.action_quotations_with_onboarding'
      },
      action_orders: {
        name: 'Sales Orders',
        action: 'sale.action_orders'
      }
    }
  }
}
