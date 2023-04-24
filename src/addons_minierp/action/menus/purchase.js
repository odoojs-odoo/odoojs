export default {
  menu_purchase: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Purchase',
    sequence: 50,
    children: {
      menu_purchase_setting: {
        name: 'Config'
      },
      menu_purchase_master: {
        name: 'Master',
        children: {}
      },
      menu_purchase_rfq: {
        name: 'Requests for Quotation',
        action: 'purchase.purchase_rfq'
      },
      menu_purchase_form_action: {
        name: 'Purchase Orders',
        action: 'purchase.purchase_form_action'
      },

      menu_action_purchase_history: {
        name: 'Purchase Lines',
        action: 'purchase.action_purchase_history'
      }
    }
  }
}
