export default {
  menu_sale: {
    name: '销售管理',
    children: {
      menu_sale_setting: {
        name: '销售配置',
        children: {
          menu_sales_team_crm_tag_action: { name: '销售标签' },
          menu_crm_team_action_config: { name: '销售团队' }
        }
      },
      menu_sale_master: {
        name: '主数据',
        children: {
          res_partner_action_customer: { name: '客户' }
        }
      },

      menu_sale_analytic: {
        name: '销售分析',
        children: {
          sale_action_chart_by_date: { name: '月统计' },
          sale_action_chart_by_product: { name: '按商品统计' }
        }
      },

      menu_action_quotations_with_onboarding: { name: '报价单' },
      menu_action_orders: { name: '销售订单' }
    }
  }
}
