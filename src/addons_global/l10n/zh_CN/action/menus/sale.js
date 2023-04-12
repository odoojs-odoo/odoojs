export default {
  menu_sale: {
    name: '销售管理',
    children: {
      menu_sale_master: {
        name: '主数据',
        children: {
          res_partner_action_customer: { name: '客户' }
        }
      },
      menu_action_quotations_with_onboarding: { name: '报价单' },
      menu_action_orders: { name: '销售订单' }
    }
  }
}
