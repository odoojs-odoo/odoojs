export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    arch: {
      sheet: {
        product_variant_count: { invisible: '1' },
        sale_ok: { invisible: '1' },
        currency_id: { invisible: '1' },
        cost_currency_id: { invisible: '1' },
        // priority: { widget: 'priority', optional: 'show' },
        name: {},
        default_code: {},
        product_tag_ids: { widget: 'many2many_tags' },
        barcode: { optional: 'hide' },
        company_id: { optional: 'hide' },
        list_price: { widget: 'monetary', optional: 'show' },
        standard_price: { widget: 'monetary', optional: 'show' },
        categ_id: { optional: 'hide' },
        detailed_type: { optional: 'hide' },
        type: { invisible: '1' },
        uom_id: { optional: 'show' },
        active: { invisible: '1' }
      }
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    arch: {
      sheet: {
        product_variant_count: { invisible: 1 },
        is_product_variant: { invisible: 1 },
        attribute_line_ids: { invisible: '1' },
        type: { invisible: 1 },
        company_id: { invisible: 1 },
        _div_button_box: {},

        active: {},
        image_1920: { widget: 'image', preview_image: 'image_128' },

        _div_title: {
          _label_name: { for: 'name' },
          _h1: { name: { nolabel: 0 } }
        },

        _div_options: {
          sale_ok: {},
          purchase_ok: {}
        },

        _notebook: {
          _page_general_information: {
            _attr: {
              string: 'General Information',
              name: 'general_information'
            },
            _group_general_information: {
              _group_group_general: {
                _attr: { name: 'group_general' },
                active: { invisible: 1 },
                detailed_type: {},
                product_tooltip: { string: '' },
                uom_id: {},
                uom_po_id: {}
              },
              _group_group_standard_price: {
                list_price: { widget: 'monetary' },
                standard_price: { widget: 'monetary' },
                uom_name: {},
                categ_id: {},
                default_code: {},
                barcode: {},
                product_tag_ids: { widget: 'many2many_tags' },
                company_id: {},
                currency_id: { invisible: 1 },
                cost_currency_id: { invisible: 1 },
                product_variant_id: { invisible: 1 }
              }
            },
            _group_note: {
              _attr: { string: 'Internal Notes' },
              description: { nolabel: '1' }
            }
          },

          _page_sales: {
            _attr: {
              name: 'sales',
              string: 'Sales',
              invisible({ record }) {
                const { sale_ok } = record
                return !sale_ok
              }
            },
            _group_sale: {
              _attr: { name: 'sale' }
            },
            _group: {
              _group_description: {
                _attr: { name: 'description', string: 'Sales Description' },
                description_sale: { nolabel: 1 }
              }
            }
          },

          _page_purchase: {
            _attr: {
              name: 'purchase',
              string: 'Purchase',
              invisible({ record }) {
                const { purchase_ok } = record
                return !purchase_ok
              }
            },
            _group_purchase: {
              _attr: { name: 'purchase' },
              _group_bill: {
                _attr: { name: 'bill', string: 'Vendor Bills' }
              }
            }
          },

          _page_inventory: {
            _attr: {
              name: 'inventory',
              string: 'Inventory',
              invisible({ record }) {
                const { type } = record
                return type === 'service'
              }
            },
            _group_inventory: {
              _group_group_lots_and_weight: {
                _attr: {
                  name: 'group_lots_and_weight',
                  string: 'Logistics',
                  invisible({ record }) {
                    // 'invisible': [('type', 'not in', ['product', 'consu'])
                    const { type } = record
                    return !['product', 'consu'].includes(type)
                  }
                },
                weight: {},
                weight_uom_name: {},
                volume: {},
                volume_uom_name: {}
              }
            }
            // _group_packaging: {
            //   _attr: {
            //     name: 'packaging',
            //     string: 'Packaging',
            //     invisible({ record }) {
            //       const { type } = record
            //       return !['product', 'consu'].includes(type)
            //     }
            //   },

            //   packaging_ids: {
            //     nolabel: '1',
            //     widget: 'x2many_tree'
            //   }
            // }
          }
        }
      }
    }
  },

  product_template_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Product',
          filter_domain: self => {
            return [
              '|',
              '|',
              '|',
              ['default_code', 'ilike', self],
              ['product_variant_ids.default_code', 'ilike', self],
              ['name', 'ilike', self],
              ['barcode', 'ilike', self]
            ]
          }
        },

        categ_id: {
          filter_domain: raw_value => {
            return [['categ_id', 'child_of', raw_value]]
          }
        }
      },

      filters: {
        group_type: {
          services: {
            name: 'services',
            string: 'Services',
            domain: [['type', '=', 'service']]
          },
          consumable: {
            name: 'consumable',
            string: 'Products',
            domain: [['type', 'in', ['consu', 'product']]]
          }
        },

        group_sell_purchase: {
          filter_to_sell: {
            name: 'filter_to_sell',
            string: 'Can be Sold',
            domain: [['sale_ok', '=', true]]
          },
          filter_to_purchase: {
            name: 'filter_to_purchase',
            string: 'Can be Purchased',
            domain: [['purchase_ok', '=', true]]
          }
        },

        group_active: {
          inactive: {
            name: 'inactive',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  product_template_action_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product_template_search_view',
    domain: [],
    context: {},
    views: {
      tree: 'product_template_tree_view',
      form: 'product_template_form_view'
    }
  }
}
