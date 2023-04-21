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
            _attr: { class: 'row mt16 o_settings_container' },
            _div: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_left_pane' }
              },
              _div_261: {
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
                _div_386: {
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
            _div_334: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
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
                _div_582: {
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
        _xpath_860: {
          _attr: {
            expr: "//div[@id='product_get_pic_setting']",
            position: 'replace'
          },
          _div: {
            _attr: { class: 'col-12 col-lg-6 o_setting_box' },
            _div: {
              _attr: { class: 'o_setting_left_pane' },
              module_product_images: {}
            },
            _div_651: {
              _attr: { class: 'o_setting_right_pane' },
              _label_module_product_images: {
                for: 'module_product_images',
                string: 'Google Images'
              },
              _a: {
                _attr: {
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
              _div_618: {
                _attr: {
                  invisible: [['module_product_images', '=', false]],
                  class: 'content-group mt16'
                },
                _div: {
                  _attr: { class: 'mt16 text-warning' },
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
