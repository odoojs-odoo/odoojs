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

  product_template_only_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _group_button_box: {
          product_variant_count: {
            widget: 'statinfo',
            groups: 'product.group_product_variant',
            invisible({ record }) {
              // 'invisible': [('product_variant_count', '&lt;=', 1)]
              const { product_variant_count } = record
              return product_variant_count <= 1
            }
          }
        },

        _group_general_information__group_standard_price: {
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
          }
        },

        _group_general_information__note: {},

        _group_variants: {
          _span: 2,
          _groups: 'product.group_product_variant',
          attribute_line_ids: {
            widget: 'x2many',
            context: { show_attribute: false },
            views: {
              tree: {
                fields: {
                  value_count: { invisible: 1 },
                  attribute_id: {
                    readonly({ record }) {
                      // 'readonly': [('id', '!=', False)]
                      return !record.id
                    }
                  },
                  value_ids: { widget: 'many2many_tags' }
                  // <button string="Configure" class="float-end btn-secondary"
                  //               type="object" name="action_open_attribute_values"
                  //               groups="product.group_product_variant"/>
                }
              }
            }
          }
        }
      }
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    arch: {
      header: {
        buttons: [
          {
            string: 'Print Labels',
            name: 'action_open_label_layout',
            type: 'object',
            invisible({ record }) {
              // 'invisible': [('detailed_type', '==', 'service')]
              const { detailed_type } = record
              return detailed_type === 'service'
            }
          }
        ],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {},
          product_variant_count: { invisible: 1 },
          is_product_variant: { invisible: 1 },
          type: { invisible: 1 },
          company_id: { invisible: 1 }
        },

        _group_button_box: {
          _span: 2,
          pricelist_item_count: {
            string({ record }) {
              const { pricelist_item_count } = record
              return pricelist_item_count === 1
                ? {
                    en_US: 'Extra Prices',
                    zh_CN: '额外价格',
                    zh_HK: '额外价格'
                  }
                : {
                    en_US: 'Extra Price',
                    zh_CN: '额外价格',
                    zh_HK: '额外价格'
                  }
            }
          }
        },

        _group_name: {
          priority: { widget: 'priority' },
          name: {},
          active: { widget: 'web_ribbon' }
        },

        _group_image: {
          image_1920: { widget: 'image' }
        },

        _group_options: {
          sale_ok: {},
          purchase_ok: {}
        },

        _group_general_information__group_general: {
          active: { invisible: 1 },
          detailed_type: {},
          product_tooltip: {},
          uom_id: { groups: 'uom.group_uom' },
          uom_po_id: { groups: 'uom.group_uom' }
        },

        _group_general_information__group_standard_price: {
          list_price: { widget: 'monetary' },
          standard_price: {
            widget: 'monetary',
            invisible({ record }) {
              // 'invisible':
              // [('product_variant_count', '&gt;', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          uom_name: {
            groups: 'uom.group_uom',
            invisible({ record }) {
              // 'invisible':
              // [('product_variant_count', '&gt;', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          categ_id: {},
          product_tag_ids: { widget: 'many2many_tags' },
          company_id: { groups: 'base.group_multi_company' },
          currency_id: { invisible: 1 },
          cost_currency_id: { invisible: 1 },
          product_variant_id: { invisible: 1 }
        },

        _group_general_information__note: {
          _span: 2,
          description: {
            label: 'Internal Notes',
            string: '',
            placeholder: 'This note is only for internal purposes.'
          }
        },
        _group_sales__sale: {},

        _group_sales__description: {
          _span: 2,
          description_sale: {
            label: 'Sales Description',
            string: '',
            placeholder: 'This note is added to sales orders and invoices.'
          }
        },

        _group_purchase__purchase__bill: {
          // _invisible: '1'
          //
          // 'invisible': [('purchase_ok','=',False)]
        },

        _group_inventory__inventory: {
          _groups: 'product.group_stock_packaging',
          // 'invisible':[('type', '=', 'service')]
          // 'invisible': [('type', 'not in', ['product', 'consu'])
          _invisible({ record }) {
            const { type } = record
            return type === 'service'
          },
          weight: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          weight_uom_name: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          volume: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          },
          volume_uom_name: {
            invisible({ record }) {
              // 'invisible':[('product_variant_count', '>', 1),
              // ('is_product_variant', '=', False)]
              const { product_variant_count, is_product_variant } = record
              return product_variant_count > 1 && !is_product_variant
            }
          }
        },

        _group_inventory__packaging: {
          _span: 2,
          _groups: 'product.group_stock_packaging',
          // 'invisible':[('type', '=', 'service')]
          // 'invisible':[
          // '|',
          // ('type', 'not in', ['product', 'consu']),
          // ('product_variant_count', '>', 1),
          // ('is_product_variant', '=', False)]
          _invisible({ record }) {
            const { type, product_variant_count, is_product_variant } = record
            return (
              type === 'service' ||
              !['product', 'consu'].includes(type) ||
              (product_variant_count > 1 && is_product_variant)
            )
          },

          packaging_ids: {
            widget: 'x2many_tree',

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
}
