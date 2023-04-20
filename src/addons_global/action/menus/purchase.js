export default {
  menu_purchase: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Purchase',
    sequence: 50,
    children: {
      menu_purchase_setting: {
        name: 'Config'

        // children: {
        //   //   sales_team_crm_tag_action: {
        //   //     name: 'Tags',
        //   //     action: 'sales_team.sales_team_crm_tag_action'
        //   //   },
        //   //   crm_team_action_config: {
        //   //     name: 'Sales Teams',
        //   //     action: 'sales_team.crm_team_action_config'
        //   //   }
        // }
      },
      menu_purchase_master: {
        name: 'Master',
        children: {
          product_normal_action_puchased: {
            name: 'Products',
            action: 'purchase.product_normal_action_puchased'
          }
        }
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
