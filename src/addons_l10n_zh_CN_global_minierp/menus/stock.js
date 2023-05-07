export default {
  menu_stock: {
    name: '库存',
    children: {
      menu_stock_setting: {
        name: '配置',
        children: {
          menu_action_warehouse_form: { name: '仓库' },
          menu_action_location_form: { name: '库位' },
          menu_action_picking_type_list: { name: '调拨类型' }
        }
      },
      menu_stock_master: {
        name: 'Master',
        children: {}
      },

      menu_stock_analytic: {
        name: '库存报告',
        children: {
          menu_dashboard_open_quants: { name: '库位库存' },
          menu_action_product_stock_view: { name: '产品库存' },
          menu_stock_move_action: { name: '库存移动' },
          menu_stock_move_line_action: { name: '移动历史' }
        }
      },

      menu_action_picking_tree_all: { name: '调拨' }
    }
  }
}
