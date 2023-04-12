export default {
  menu_purchase: {
    name: '采购管理',
    sequence: 50,
    children: {
      menu_sale_master: {
        name: 'Master',
        children: {}
      },
      menu_purchase_rfq: { name: '询价单' },
      menu_purchase_form_action: { name: '采购订单' }
    }
  }
}
