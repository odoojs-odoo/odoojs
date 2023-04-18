export default {
  stock_storage_category_capacity_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.storage.category.capacity',
    type: 'tree',
    arch: {
      sheet: {
        storage_category_id: {},
        product_id: {
          invisible: "context.get['default_product_id']",
          required: [['package_type_id', '=', false]],
          readonly: [['package_type_id', '!=', false]]
        },
        package_type_id: {
          groups: 'stock.group_tracking_lot',
          invisible: "context.get['hide_package_type', False]",
          required: [['product_id', '=', false]],
          readonly: [['product_id', '!=', false]]
        },
        quantity: {},
        product_uom_id: {
          groups: 'uom.group_uom',
          no_create: true,
          no_open: true
        },
        company_id: {
          invisible: '1'
        },
        _field_package_type_id_486: {
          package_type_id: {
            invisible: '1'
          }
        }
      }
    }
  },

  action_storage_category_capacity: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Storage Category Capacity',
    type: 'ir.actions.act_window',
    res_model: 'stock.storage.category.capacity',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
