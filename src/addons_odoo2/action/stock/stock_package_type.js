export default {
  stock_package_type_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package.type',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        _label_name: {
          for: 'name'
        },
        _h1: {
          name: {}
        },
        _group_delivery: {
          _attr: {
            name: 'delivery'
          },
          _group: {
            _label_length_uom_name: {
              for: 'length_uom_name',
              string: 'Size'
            },
            _div_size: {
              _attr: {
                name: 'size',
                class: 'o_row'
              },
              packaging_length: {
                placeholder: 'Length'
              },
              _span: '×',
              width: {
                placeholder: 'Width'
              },
              _span_236: '×',
              height: {
                placeholder: 'Height'
              },
              _span_409: {
                length_uom_name: {}
              }
            },
            _label_base_weight: {
              for: 'base_weight'
            },
            _div_base_weight: {
              _attr: {
                name: 'base_weight',
                class: 'o_row'
              },
              base_weight: {},
              _span: {
                weight_uom_name: {}
              }
            },
            _label_max_weight: {
              for: 'max_weight'
            },
            _div_max_weight: {
              _attr: {
                name: 'max_weight',
                class: 'o_row'
              },
              max_weight: {},
              _span: {
                weight_uom_name: {}
              }
            },
            barcode: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        },
        _group_storage_categories: {
          _attr: {
            name: 'storage_categories',
            groups: 'stock.group_stock_storage_categories'
          },
          _group: {
            storage_category_capacity_ids: {
              context: {
                default_package_type_id: 'todo===id'
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      storage_category_id: {},
                      quantity: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  stock_package_type_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package.type',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        height: {},
        width: {},
        packaging_length: {},
        max_weight: {},
        barcode: {
          optional: 'hide'
        }
      }
    }
  },

  action_package_type_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Package Types',
    res_model: 'stock.package.type',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
