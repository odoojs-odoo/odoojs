export default {
  menu_stock_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Stock Setting',
    sequence: 17,
    children: {
      menu_action_picking_type_list: {
        name: 'Operations Types',
        action: 'stock.action_picking_type_list'
      }
    }
  }
}
