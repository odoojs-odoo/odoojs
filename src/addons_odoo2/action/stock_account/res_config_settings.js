export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'stock.res_config_settings_view_form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            id: 'production_lot_info',
            position: 'after'
          },
          _h2: 'Valuation',
          _div_valuation_setting_container: {
            _attr: {
              name: 'valuation_setting_container',
              class: 'row mt16 o_settings_container'
            },
            _div: {
              _attr: {
                id: 'additional_cost_setting',
                title: 'Affect landed costs on reception operations and split them among products to update their cost price.',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                module_stock_landed_costs: {}
              },
              _div_698: {
                _attr: { class: 'o_setting_right_pane' },
                _label_module_stock_landed_costs: { for: 'module_stock_landed_costs' },
                _a: {
                  _attr: {
                    href: 'https://www.odoo.com/documentation/16.0/applications/inventory_and_mrp/inventory/management/reporting/integrating_landed_costs.html',
                    title: 'Documentation',
                    class: 'o_doc_link'
                  }
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Add additional cost (transport, customs, ...) in the value of the product.'
                  }
                },
                _div_972: {
                  _attr: { class: 'content-group' },
                  _div_landed_cost_info: {
                    _attr: { name: 'landed_cost_info' }
                  }
                }
              }
            },
            _div_225: {
              _attr: {
                id: 'group_lot_on_invoice',
                invisible: [['group_stock_production_lot', '=', false]],
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                group_lot_on_invoice: {}
              },
              _div_201: {
                _attr: { class: 'o_setting_right_pane' },
                _label_group_lot_on_invoice: { for: 'group_lot_on_invoice' },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Lots & Serial numbers will appear on the invoice'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
