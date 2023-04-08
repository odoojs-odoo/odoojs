export default {
  sale_menu_root: {
    _odoo_model: 'ir.ui.menu',
    name: '销售',
    parent: 'base.menu_odoo_root',
    icon: 'shopping',
    theme: 'twoTone',
    sequence: 30
  },

  sale_order_menu: {
    _odoo_model: 'ir.ui.menu',
    name: '订单',
    parent: 'sale_menu_root',
    sequence: 2
  },

  res_partner_menu: {
    _odoo_model: 'ir.ui.menu',
    action: 'account.res_partner_action_customer',
    parent: 'sale_order_menu',
    name: '客户',
    sequence: 4
  },

  menu_sale_config: {
    _odoo_model: 'ir.ui.menu',
    name: '配置',
    parent: 'sale_menu_root',
    sequence: 35,
    children: {
      sales_team_config: {
        _odoo_model: 'ir.ui.menu',
        action: 'sales_team.crm_team_action_config',
        name: '销售团队',
        parent: 'menu_sale_config',
        sequence: 2
      },

      menu_sales_config: {
        _odoo_model: 'ir.ui.menu',
        name: '销售订单',
        parent: 'menu_sale_config',
        sequence: 4,
        children: {
          menu_tag_config: {
            _odoo_model: 'ir.ui.menu',
            action: 'sales_team.sales_team_crm_tag_action',
            name: '标签',
            parent: 'menu_sales_config',
            sequence: 2
          }
        }
      }
    }
  },

  menu_sale_order: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_orders',
    parent: 'sale_order_menu',
    name: '订单',
    sequence: 2
  },

  menu_sale_quotations: {
    _odoo_model: 'ir.ui.menu',
    action: 'action_quotations_with_onboarding',
    parent: 'sale_order_menu',
    name: '报价单',
    sequence: 1
  }
}
