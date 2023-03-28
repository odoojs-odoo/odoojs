export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    fields: {
      priority: {},
      name: {},
      default_code: {},
      product_tag_ids: { widget: 'many2many_tags' },
      barcode: {},
      company_id: {},
      list_price: { widget: 'monetary' },
      standard_price: { widget: 'monetary' },
      categ_id: {},
      detailed_type: {},
      uom_id: {}
    }
  },

  product_template_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'kanban',
    fields: {
      priority: {},
      name: {},
      default_code: {},
      barcode: {},
      company_id: {},
      list_price: {},
      standard_price: {},
      categ_id: {},
      detailed_type: {},
      uom_id: {}
    },
    templates: {
      title({ record }) {
        return record.name
      },
      label({ record }) {
        return record.categ_id && record.categ_id[1]
      }
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
          // product_variant_count: { invisible: 1 },
          // is_product_variant: { invisible: 1 },
          // type: { invisible: 1 },
          // company_id: { invisible: 1 }
        },

        _group_button_box: {
          _span: 2,
          pricelist_item_count: {
            string({ record }) {
              const { pricelist_item_count } = record
              return pricelist_item_count === 1
                ? { en_US: 'Extra Price', zh_CN: '额外价格', zh_HK: '额外价格' }
                : { en_US: 'Extra Price', zh_CN: '额外价格', zh_HK: '额外价格' }
            }
          },

          product_variant_count: {
            widget: 'statinfo',
            invisible({ record }) {
              // 'invisible': [('product_variant_count', '&lt;=', 1)]
              const { product_variant_count } = record
              return product_variant_count <= 1
            }
          }
        },

        _group_name: {
          priority: { widget: 'priority' },
          name: {},
          sale_ok: {},
          purchase_ok: {}
        },

        _group_image: {
          image_1920: { widget: 'image' }
        },

        _group_variants: {
          _span: 2,
          attribute_line_ids: {
            widget: 'one2many',
            views: {
              tree: {
                fields: {
                  value_count: { invisible: 1 },
                  attribute_id: {
                    // 'readonly': [('id', '!=', False)]
                    readonly({ record }) {
                      return !record.id
                    }
                  },
                  value_ids: {
                    widget: 'many2many_tags'
                  }
                }
              }
            }
          },
          detailed_type: {},
          product_tooltip: {},
          uom_id: {},
          uom_po_id: {}
        },

        _group_general: {
          active: { invisible: 1 },
          detailed_type: {},
          product_tooltip: {},
          uom_id: {},
          uom_po_id: {}
        },

        _group_standard_price: {
          list_price: { widget: 'monetary' },
          standard_price: {},
          uom_name: {},
          categ_id: {},
          default_code: {
            invisible({ record }) {
              // 'invisible': [('product_variant_count', '>', 1)]
              const { product_variant_count } = record
              return product_variant_count > 1
            }
          },
          barcode: {
            invisible({ record }) {
              // 'invisible': [('product_variant_count', '>', 1)]
              const { product_variant_count } = record
              return product_variant_count > 1
            }
          },
          product_tag_ids: { widget: 'many2many_tags' },
          company_id: {},
          currency_id: { invisible: 1 },
          cost_currency_id: { invisible: 1 },
          product_variant_id: { invisible: 1 }
        },

        _group_note: {
          _span: 2,
          description: {}
        },

        _group_description_sale: { _span: 2, description_sale: {} },

        _group_inventory: {
          weight: {
            invisible({ record }) {
              // 'invisible':[('type', '=', 'service')]
              // 'invisible': [('type', 'not in', ['product', 'consu'])
              const { type } = record
              return type === 'service'
            }
          },
          weight_uom_name: {
            invisible({ record }) {
              // 'invisible':[('type', '=', 'service')]
              // 'invisible': [('type', 'not in', ['product', 'consu'])
              const { type } = record
              return type === 'service'
            }
          },
          volume: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1), ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          volume_uom_name: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1), ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          }
        },

        _group_packaging: {
          _span: 2,
          packaging_ids: {
            widget: 'x2many_tree',

            invisible({ record }) {
              // 'invisible':[
              // '|',
              // ('type', 'not in', ['product', 'consu']),
              // ('product_variant_count', '>', 1),
              // ('is_product_variant', '=', False)]
              const { type, product_variant_count, is_product_variant } = record
              return (
                !['product', 'consu'].includes(type) ||
                (product_variant_count > 1 && is_product_variant)
              )
            },

            context({ record }) {
              const { company_id } = record
              return {
                // tree_view_ref: 'product.product_packaging_tree_view2',
                default_company_id: company_id
              }
            }
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
          services: { string: '服务', domain: [['type', '=', 'service']] },
          consumable: {
            string: '产品',
            domain: [['type', 'in', ['consu', 'product']]]
          }
        },

        group_sell_purchase: {
          filter_to_sell: {
            string: '可销售',
            domain: [['sale_ok', '=', true]]
          },
          filter_to_purchase: {
            string: '可采购',
            domain: [['purchase_ok', '=', true]]
          }
        },
        group_favorites: {
          favorites: { string: '收藏', domain: [['priority', '=', '1']] }
        },
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  product_template_action_all: {
    _odoo_model: 'ir.actions',
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

  // product_product_action_sellable: {
  //   _odoo_model: 'ir.actions',
  //   name: '产品',
  //   type: 'ir.actions.act_window',
  //   res_model: 'product.template',
  //   domain: [],
  //   context: { search_default_filter_to_sell: 1 }
  // },

  // product_product_action_purchasable: {
  //   _odoo_model: 'ir.actions',
  //   name: 'Products',
  //   type: 'ir.actions.act_window',
  //   res_model: 'product.template',
  //   search_view_id: '',
  //   domain: [],
  //   context: { search_default_filter_to_purchase: 1 },
  //   views: {
  //     tree: 'product_tag_tree_view',
  //     form: 'product_tag_form_view'
  //   }
  // }
}
