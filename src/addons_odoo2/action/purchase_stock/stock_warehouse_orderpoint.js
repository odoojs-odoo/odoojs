export default {
  view_warehouse_orderpoint_tree_editable_inherited_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    inherit_id: 'stock.view_warehouse_orderpoint_tree_editable',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@name='action_stock_replenishment_info']",
            position: 'before'
          },
          show_supplier: { invisible: '1' },
          supplier_id: {
            string: 'Vendor',
            invisible: [['show_supplier', '=', false]],
            optional: 'show',
            no_create: true
          }
        }
      }
    }
  }
}
