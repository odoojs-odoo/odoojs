export default {
  view_category_property_form_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    inherit_id: 'stock.product_category_form_view_inherit',
    arch: {
      sheet: {
        _group_logistics: {
          _attr: {
            name: 'logistics'
          },
          _group: {
            _attr: {
              string: 'Inventory Valuation'
            },
            property_cost_method: {},
            property_valuation: {
              groups: 'account.group_account_readonly,stock.group_stock_manager'
            }
          }
        }
      }
    }
  },

  view_category_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    inherit_id: 'account.view_category_property_form',
    arch: {
      sheet: {
        _group_account_property: {
          _attr: {
            name: 'account_property'
          },
          _group_account_stock_property: {
            _attr: {
              name: 'account_stock_property',
              string: 'Account Stock Properties',
              groups: 'account.group_account_readonly',
              invisible: [['property_valuation', '=', 'manual_periodic']]
            },
            property_valuation: {
              invisible: '1'
            },
            property_stock_valuation_account_id: {
              required: [['property_valuation', '=', 'real_time']],
              no_create: true
            },
            property_stock_journal: {
              required: [['property_valuation', '=', 'real_time']]
            },
            property_stock_account_input_categ_id: {
              required: [['property_valuation', '=', 'real_time']],
              no_create: true
            },
            property_stock_account_output_categ_id: {
              required: [['property_valuation', '=', 'real_time']],
              no_create: true
            },
            _div: {
              _attr: {
                class: 'alert alert-info mt16'
              },
              _b: 'Set other input/output accounts on specific',
              _button_stock__action_prod_inv_location_form: {
                _attr: {
                  name: 'stock.action_prod_inv_location_form',
                  type: 'action',
                  string: 'locations',
                  class: 'btn-link'
                }
              }
            }
          }
        }
      }
    }
  }
}
