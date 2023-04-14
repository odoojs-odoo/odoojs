export default {
  menu_pickingtype: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_warehouse_config',
    name: '作业类型',
    action: 'action_picking_type_list',
    sequence: 5
  },

  all_picking: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_stock_warehouse_mgmt',
    name: '调拨',
    action: 'action_picking_tree_all',
    sequence: 5
  }
}
