export default {
  stock_storage_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.storage.category',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_storage_category_locations: {
            _attr: {
              name: 'action_storage_category_locations',
              type: 'action',
              string: 'Locations',
              icon: 'fa-arrows-v',
              class: 'oe_stat_button'
            }
          }
        },
        _group: {
          _group: {
            name: {},
            allow_new_product: {}
          },
          _group_140: {
            _label_max_weight: { for: 'max_weight' },
            _div: {
              _attr: { class: 'o_row' },
              max_weight: {},
              _span: 'kg'
            },
            company_id: { groups: 'base.group_multi_company' }
          }
        },
        _notebook: {
          _page_package_capacity: {
            _attr: {
              name: 'package_capacity',
              string: 'Capacity by Package',
              groups: 'stock.group_tracking_lot'
            },
            package_capacity_ids: {
              context: { todo_ctx: "{'default_storage_category_id': id, 'default_company_id': company_id}" },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      package_type_id: { required: '1' },
                      quantity: {},
                      company_id: { invisible: '1' }
                    }
                  }
                }
              }
            }
          },
          _page_product_capacity: {
            _attr: {
              name: 'product_capacity',
              string: 'Capacity by Product'
            },
            product_capacity_ids: {
              context: { todo_ctx: "{'default_storage_category_id': id, 'default_company_id': company_id}" },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      product_id: {
                        context: { default_detailed_type: 'product' },
                        required: '1'
                      },
                      quantity: {},
                      product_uom_id: {
                        groups: 'uom.group_uom',
                        no_create: true,
                        no_open: true
                      },
                      company_id: { invisible: '1' }
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

  stock_storage_category_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.storage.category',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        max_weight: { string: 'Max Weight (kg)' },
        allow_new_product: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  action_storage_category: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Storage Categories',
    type: 'ir.actions.act_window',
    res_model: 'stock.storage.category',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'stock_storage_category_tree',
      form: '=======todo=========='
    }
  }
}
