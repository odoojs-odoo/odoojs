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
        _div_button_box: {
          _button_product_product_variant_action: {
            _attr: {
              groups: 'product.group_product_variant',
              name: 'product.product_variant_action',
              type: 'action',
              icon: 'fa-sitemap',
              class: 'oe_stat_button',
              invisible({ record }) {
                // 'invisible': [('product_variant_count', '&lt;=', 1)]
                const { product_variant_count } = record
                return product_variant_count <= 1
              }
            },
            product_variant_count: { string: 'Variants', widget: 'statinfo' }
          }
        },

        _notebook: {
          _page_general_information: {
            _group: {
              _group_group_standard_price: {
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
              }
            }
          },

          _page_variants: {
            _attr: {
              name: 'variants',
              string: 'Attributes & Variants',
              groups: 'product.group_product_variant'
            },

            attribute_line_ids: {
              widget: 'x2many_tree',

              views: {
                tree: {
                  fields: {
                    value_count: { invisible: 1 },
                    attribute_id: {},
                    value_ids: { widget: 'many2many_tags' }
                    // _button: {
                    //   _attr: {
                    //     groups: 'product.group_product_variant',
                    //     name: 'action_open_attribute_values',
                    //     string: 'Configure',
                    //     type: 'object',
                    //     class: 'float-end btn-secondary'
                    //   }
                    // }
                  }
                },

                form: {
                  arch: {
                    sheet: {
                      value_count: { invisible: 1 },
                      attribute_id: {},
                      value_ids: { widget: 'many2many_tags' },
                      _button: {
                        groups: 'product.group_product_variant',
                        name: 'action_open_attribute_values',
                        string: 'Configure',
                        type: 'object',
                        class: 'float-end btn-secondary'
                      }
                    }
                  }
                }
              }
            },

            _p: {
              _attr: {
                invisible({ editable }) {
                  return !editable
                }
              },
              _strong: { _attr: { text: 'Warning' } },
              _span: {
                _attr: {
                  text: ': adding or deleting attributes will delete and recreate existing variants and lead to the loss of their possible customizations.'
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
        buttons: {
          action_open_label_layout: {
            string: 'Print Labels',
            name: 'action_open_label_layout',
            type: 'object',
            invisible({ record }) {
              // 'invisible': [('detailed_type', '==', 'service')]
              const { detailed_type } = record
              return detailed_type === 'service'
            }
          }
        },
        fields: {}
      },
      sheet: {
        product_variant_count: { invisible: 1 },
        is_product_variant: { invisible: 1 },
        type: { invisible: 1 },
        company_id: { invisible: 1 },
        _div_button_box: {
          _button_open_pricelist_rules: {
            _attr: {
              name: 'open_pricelist_rules',
              icon: 'fa-list-ul',
              groups: 'product.group_product_pricelist',
              type: 'object'
            },

            _div_: {
              _span: { pricelist_item_count: {} },
              _span_text: {
                _attr: {
                  text: 'Extra Prices', //  '额外价格'
                  invisible({ record }) {
                    // 'invisible': [('pricelist_item_count', '=', 1)]
                    const { pricelist_item_count } = record
                    return pricelist_item_count === 1
                  }
                }
              },
              _span_text2: {
                _attr: {
                  text: 'Extra Price', //  '额外价格'
                  invisible({ record }) {
                    //'invisible': [('pricelist_item_count', '!=', 1)]
                    const { pricelist_item_count } = record
                    return pricelist_item_count !== 1
                  }
                }
              }
            }
          }
        },

        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // 'invisible': [('active', '=', True)]}"
              const { active } = record
              return active
            }
          }
        },

        image_1920: { widget: 'image', preview_image: 'image_128' },
        _group_image: {},

        _div_title: {
          _h1: {
            priority: { nolabel: 0, widget: 'priority' },
            name: {
              nolabel: 0,
              string: 'Product Name',
              placeholder: 'e.g. Cheese Burger'
            }
          }
        },
        _div_options: { sale_ok: {}, purchase_ok: {} },

        _notebook: {
          _page_general_information: {
            _attr: {
              string: 'General Information',
              name: 'general_information'
            },
            _group_general_information: {
              _group_group_general: {
                active: { invisible: 1 },
                detailed_type: {},
                product_tooltip: { string: '' },
                uom_id: { groups: 'uom.group_uom' },
                uom_po_id: { groups: 'uom.group_uom' }
              },
              _group_group_standard_price: {
                _div_list_price: {
                  _attr: { name: 'pricing' },
                  list_price: {
                    widget: 'monetary',
                    currency_field: 'currency_id',
                    field_digits: true
                  }
                },

                _div_standard_price: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible':
                      // [('product_variant_count', '&gt;', 1),
                      // ('is_product_variant', '=', False)]
                      const { product_variant_count, is_product_variant } =
                        record
                      return product_variant_count > 1 && !is_product_variant
                    }
                  },
                  standard_price: {
                    widget: 'monetary',
                    currency_field: 'cost_currency_id',
                    field_digits: true
                  },
                  _span: {
                    _attr: { groups: 'uom.group_uom', text: 'Per' },
                    uom_name: { nolabel: 1 }
                  }
                },

                categ_id: { string: 'Product Category' },
                product_tag_ids: { widget: 'many2many_tags' },
                company_id: { groups: 'base.group_multi_company' },
                currency_id: { invisible: 1 },
                cost_currency_id: { invisible: 1 },
                product_variant_id: { invisible: 1 }
              }
            },
            _group_note: {
              _attr: { string: 'Internal Notes' },
              description: {
                nolabel: '1',
                placeholder: 'This note is only for internal purposes.'
              }
            }
          },

          _page_sales: {
            _attr: {
              string: 'Sales',
              name: 'sales',
              invisible({ record, invisible = 1 }) {
                // 被 后续 覆盖 . 函数 需要一级级调用
                // todo. 暂时 使用 直接覆盖的方式
                // invisible: '1'
                //  attrs="{'invisible':[('sale_ok','=',False)]}",
                const { sale_ok } = record
                return invisible || !sale_ok
              }
            },
            _group_sale: {
              _group_upsell: {
                _attr: {
                  string: 'Upsell &amp; Cross-Sell',
                  invisible: '1'
                }
              }
            },
            _group: {
              _group_description: {
                _attr: {
                  string: 'Sales Description',
                  name: 'description'
                },
                description_sale: {
                  nolabel: 1,
                  placeholder:
                    'This note is added to sales orders and invoices.'
                }
              }
            }
          },

          _page_purchase: {
            _attr: {
              string: 'Purchase',
              name: 'purchase',
              invisible({ record, invisible = 1 }) {
                // 被 后续 覆盖 . 函数 需要一级级调用
                // todo. 暂时 使用 直接覆盖的方式
                // invisible: '1'
                //  attrs="{'invisible':[('purchase_ok','=',False)]}",
                const { purchase_ok } = record
                return invisible || !purchase_ok
              }
            },
            _group_purchase: {
              _group_bill: {
                _attr: {
                  string: 'Vendor Bills',
                  name: 'bill'
                }
              }
            }
          },

          _page_inventory: {
            _attr: {
              string: 'Inventory',
              name: 'inventory',
              groups: 'product.group_stock_packaging',
              invisible({ record }) {
                // 'invisible':[('type', '=', 'service')]
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
                    return ['product', 'consu'].includes(type)
                  }
                },
                _div_weight: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible':[('product_variant_count', '>', 1),
                      // ('is_product_variant', '=', False)]
                      const { product_variant_count, is_product_variant } =
                        record
                      return product_variant_count > 1 && !is_product_variant
                    }
                  },
                  weight: {},
                  weight_uom_name: {}
                },

                _div_volume: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible':[('product_variant_count', '>', 1),
                      // ('is_product_variant', '=', False)]
                      const { product_variant_count, is_product_variant } =
                        record
                      return product_variant_count > 1 && !is_product_variant
                    }
                  },
                  volume: { string: 'Volume' },
                  volume_uom_name: {}
                }
              }
            },
            _group_packaging: {
              _attr: {
                _groups: 'product.group_stock_packaging',
                string: 'Packaging',
                _invisible({ record }) {
                  // 'invisible':[
                  // '|',
                  // ('type', 'not in', ['product', 'consu']),
                  // ('product_variant_count', '>', 1),
                  // ('is_product_variant', '=', False)]
                  const { type, product_variant_count, is_product_variant } =
                    record
                  return (
                    (!['product', 'consu'].includes(type) ||
                      product_variant_count > 1) &&
                    is_product_variant
                  )
                }
              },

              packaging_ids: {
                nolabel: '1',
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
