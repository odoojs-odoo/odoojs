export default {
  res_users_view_form_preferences: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form_simple_modif',
    arch: {
      sheet: {
        _group_signature: {
          _attr: {
            name: 'signature',
            position: 'after'
          },
          _group_Warehouses: {
            _attr: { name: 'Warehouses' },
            property_warehouse_id: { groups: 'stock.group_stock_multi_warehouses' }
          }
        }
      }
    }
  },

  res_users_view_simple_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_simple_form',
    arch: {
      sheet: {
        _group_phone_numbers: {
          _attr: {
            name: 'phone_numbers',
            position: 'after'
          },
          _group_Warehouses: {
            _attr: { name: 'Warehouses' },
            property_warehouse_id: { groups: 'stock.group_stock_multi_warehouses' }
          }
        }
      }
    }
  },

  res_users_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form',
    arch: {
      sheet: {
        _group_messaging: {
          _attr: {
            name: 'messaging',
            position: 'after'
          },
          _group_Warehouses: {
            _attr: {
              name: 'Warehouses',
              string: 'Inventory',
              groups: 'stock.group_stock_multi_warehouses'
            },
            property_warehouse_id: { groups: 'stock.group_stock_multi_warehouses' }
          }
        }
      }
    }
  }
}
