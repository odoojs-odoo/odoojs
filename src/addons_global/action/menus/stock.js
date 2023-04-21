export default {
  menu_stock: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Inventory',
    sequence: 60,
    children: {
      menu_stock_setting: {
        name: 'Config',
        children: {
          menu_action_picking_type_list: {
            name: 'Operations Types',
            action: 'stock.action_picking_type_list'
          },

          menu_action_warehouse_form: {
            name: 'Warehouses',
            action: 'stock.action_warehouse_form'
          },

          menu_action_location_form: {
            name: 'Locations',
            action: 'stock.action_location_form'
          }
        }
      },
      menu_stock_master: {
        name: 'Master',
        children: {
          // res_partner_action_customer: {
          //   name: 'Customers',
          //   action: 'sales_team.res_partner_action_customer'
          // }
        }
      },

      menu_dashboard_open_quants: {
        name: 'Locations',
        action: 'stock.dashboard_open_quants'
      },

      menu_stock_move_action: {
        name: 'Stock Moves',
        action: 'stock.stock_move_action'
      },

      menu_stock_move_line_action: {
        name: 'Moves History',
        action: 'stock.stock_move_line_action'
      },

      menu_action_picking_tree_all: {
        name: 'Transfers',
        action: 'stock.action_picking_tree_all'
      }
    }
  }
}
