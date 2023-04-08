export default {
  menu_purchase: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Purchase',
    sequence: 50,
    children: {
      sale_master: {
        name: 'Master'
        // children: {
        //   res_partner_action_customer: {
        //     name: 'Customers',
        //     action: 'sales_team.res_partner_action_customer'
        //   }
        // }
      },
      purchase_rfq: {
        name: 'Requests for Quotation',
        action: 'purchase.purchase_rfq'
      },
      purchase_form_action: {
        name: 'Purchase Orders',
        action: 'purchase.purchase_form_action'
      }
    }
  }
}
