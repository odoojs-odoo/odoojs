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
        children: {
          menu_sales_team_crm_tag_action: {
            name: 'Tags',
            action: 'sales_team.sales_team_crm_tag_action'
          },
          menu_crm_team_action_config: {
            name: 'Sales Teams',
            action: 'sales_team.crm_team_action_config'
          }
        }
      },

      menu_sale_master: {
        name: 'Master',
        children: {
          res_partner_action_customer: {
            name: 'Customers',
            action: 'sales_team.res_partner_action_customer'
          }
        }
      },

      menu_sale_analytic: {
        name: 'Analytic',
        children: {
          sale_action_chart_by_date: {
            name: 'By Month',
            action: 'sale.action_chart_by_date'
          },
          sale_action_chart_by_product: {
            name: 'By Product',
            action: 'sale.action_chart_by_product'
          }
        }
      },

      menu_action_quotations_with_onboarding: {
        name: 'Quotations',
        action: 'sale.action_quotations_with_onboarding'
      },
      menu_action_orders: {
        name: 'Sales Orders',
        action: 'sale.action_orders'
      }
    }
  }
}
