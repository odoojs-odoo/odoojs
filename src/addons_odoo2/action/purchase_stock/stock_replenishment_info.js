export default {
  view_stock_replenishment_info_stock_purchase_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.replenishment.info',
    inherit_id: 'stock.view_stock_replenishment_info',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//page',
            position: 'before'
          },
          _page: {
            _attr: { string: 'Vendors' },
            supplierinfo_id: { invisible: '1' },
            supplierinfo_ids: {
              context: { tree_view_ref: 'purchase_stock.product_supplierinfo_replenishment_tree_view' },
              readonly: '1'
            }
          }
        }
      }
    }
  }
}
