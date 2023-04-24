export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base_setup.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@id='companies']",
            position: 'after'
          },
          _h2: 'Units of Measure',
          _div: {
            _attr: {
              id: 'product_general_settings',
              class: 'row mt16 o_settings_container'
            },
            _div: {
              _attr: {
                id: 'weight_uom_setting',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' }
              },
              _div_326: {
                _attr: { class: 'o_setting_right_pane' },
                _label_product_weight_in_lbs: {
                  for: 'product_weight_in_lbs',
                  string: 'Weight'
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Define your weight unit of measure'
                  }
                },
                _div_432: {
                  _attr: { class: 'content-group' },
                  _div: {
                    _attr: { class: 'mt16' },
                    product_weight_in_lbs: {
                      widget: 'radio',
                      class: 'o_light_label',
                      options: "{'horizontal': true}"
                    }
                  }
                }
              }
            },
            _div_462: {
              _attr: {
                id: 'manage_volume_uom_setting',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_right_pane' },
                _label_product_volume_volume_in_cubic_feet: {
                  for: 'product_volume_volume_in_cubic_feet',
                  string: 'Volume'
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Define your volume unit of measure'
                  }
                },
                _div_695: {
                  _attr: { class: 'content-group' },
                  _div: {
                    _attr: { class: 'mt16' },
                    product_volume_volume_in_cubic_feet: {
                      widget: 'radio',
                      class: 'o_light_label',
                      options: "{'horizontal': true}"
                    }
                  }
                }
              }
            }
          }
        },
        _xpath_289: {
          _attr: {
            expr: "//div[@id='product_get_pic_setting']",
            position: 'replace'
          },
          _div: {
            _attr: {
              id: 'product_get_pic_setting',
              class: 'col-12 col-lg-6 o_setting_box'
            },
            _div: {
              _attr: { class: 'o_setting_left_pane' },
              module_product_images: {}
            },
            _div_171: {
              _attr: { class: 'o_setting_right_pane' },
              _label_module_product_images: {
                for: 'module_product_images',
                string: 'Google Images'
              },
              _a: {
                _attr: {
                  href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/products_prices/products/product_images.html',
                  title: 'Documentation',
                  class: 'o_doc_link'
                }
              },
              _div: {
                _attr: {
                  class: 'text-muted',
                  text: 'Get product pictures using Barcode'
                }
              },
              _div_283: {
                _attr: {
                  id: 'msg_module_product_images',
                  invisible: [['module_product_images', '=', false]],
                  class: 'content-group mt16'
                },
                _div: {
                  _attr: {
                    class: 'mt16 text-warning',
                    text: 'this page and come back\n                                    here to set up the feature.'
                  },
                  _strong: 'Save'
                }
              }
            }
          }
        }
      }
    }
  }
}
