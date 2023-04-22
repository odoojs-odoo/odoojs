export default {
  view_warehouse_orderpoint_tree_editable_inherited_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    inherit_id: 'stock.view_warehouse_orderpoint_tree_editable',
    arch: {
      sheet: {
        route_id: {
          position: 'after',
          __todo__after: {
            show_bom: { invisible: '1' },
            bom_id: {
              invisible: [['show_bom', '=', false]],
              context: { todo_ctx: "{'default_product_tmpl_id': product_tmpl_id}" },
              optional: 'hide'
            }
          }
        }
      }
    }
  }
}
