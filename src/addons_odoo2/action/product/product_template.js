export default {
  product_template_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_open_label_layout: {
            _attr: {
              name: 'action_open_label_layout',
              type: 'object',
              string: 'Print Labels'
            }
          }
        },
        product_variant_count: { invisible: '1' },
        sale_ok: { invisible: '1' },
        currency_id: { invisible: '1' },
        cost_currency_id: { invisible: '1' },
        priority: {
          widget: 'priority',
          optional: 'show'
        },
        name: { string: 'Product Name' },
        default_code: { optional: 'show' },
        product_tag_ids: {
          widget: 'many2many_tags',
          optional: 'show',
          color_field: 'color'
        },
        barcode: {
          readonly: [['product_variant_count', '>', 1]],
          optional: 'hide'
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide',
          no_create: true
        },
        list_price: {
          string: 'Sales Price',
          widget: 'monetary',
          optional: 'show',
          currency_field: 'currency_id'
        },
        standard_price: {
          widget: 'monetary',
          readonly: '1',
          optional: 'show',
          currency_field: 'cost_currency_id'
        },
        categ_id: { optional: 'hide' },
        detailed_type: {
          readonly: '1',
          optional: 'hide'
        },
        type: { invisible: '1' },
        uom_id: {
          groups: 'uom.group_uom',
          readonly: '1',
          optional: 'show'
        },
        active: { invisible: '1' },
        activity_exception_decoration: { widget: 'activity_exception' }
      }
    }
  },

  product_template_only_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//form',
            position: 'attributes'
          },
          _attribute_name: {
            _attr: {
              name: 'Product Template',
              text: 'Product Template'
            }
          }
        },
        categ_id: {
          position: 'after',
          __todo__after: {
            default_code: { invisible: [['product_variant_count', '>', 1]] },
            barcode: { invisible: [['product_variant_count', '>', 1]] }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_product__product_variant_action: {
            _attr: {
              name: 'product.product_variant_action',
              type: 'action',
              icon: 'fa-sitemap',
              groups: 'product.group_product_variant',
              invisible: [['product_variant_count', '<=', 1]],
              class: 'oe_stat_button'
            },
            product_variant_count: {
              string: 'Variants',
              widget: 'statinfo'
            }
          }
        },
        _xpath_699: {
          _attr: {
            expr: "//page[@name='general_information']",
            position: 'after'
          },
          _page_variants: {
            _attr: {
              name: 'variants',
              string: 'Attributes & Variants',
              groups: 'product.group_product_variant'
            },
            attribute_line_ids: {
              widget: 'one2many',
              context: { show_attribute: false },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Variants' },
                      value_count: { invisible: '1' },
                      attribute_id: { readonly: [['id', '!=', false]] },
                      value_ids: {
                        widget: 'many2many_tags',
                        context: { todo_ctx: "{'default_attribute_id': attribute_id, 'show_attribute': False}" },
                        no_create_edit: true,
                        color_field: 'color'
                      },
                      _button_action_open_attribute_values: {
                        _attr: {
                          name: 'action_open_attribute_values',
                          type: 'object',
                          string: 'Configure',
                          groups: 'product.group_product_variant',
                          class: 'float-end btn-secondary'
                        }
                      }
                    }
                  }
                }
              }
            },
            _p: {
              _attr: {
                class: 'oe_grey oe_edit_only',
                text: ': adding or deleting attributes\n                        will delete and recreate existing variants and lead\n                        to the loss of their possible customizations.'
              },
              _strong: 'Warning'
            }
          }
        }
      }
    }
  },

  product_template_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'otherview',
    arch: {}
  },

  product_template_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'otherview',
    arch: {}
  },

  product_template_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    context: { search_default_filter_to_sell: 1 },
    views: {
      tree: 'product_template_kanban_view',
      form: '=======todo=========='
    }
  },

  action_product_template_price_list_report: {
    _odoo_model: 'ir.actions.server',
    model_id: 'product.model_product_template',
    model: 'product_template'
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    type: 'form',
    arch: {
      header: {
        _button_action_open_label_layout: {
          _attr: {
            name: 'action_open_label_layout',
            type: 'object',
            string: 'Print Labels',
            invisible: [['detailed_type', '==', 'service']]
          }
        }
      },
      sheet: {
        product_variant_count: { invisible: '1' },
        is_product_variant: { invisible: '1' },
        attribute_line_ids: { invisible: '1' },
        type: { invisible: '1' },
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_open_pricelist_rules: {
            _attr: {
              name: 'open_pricelist_rules',
              type: 'object',
              icon: 'fa-list-ul',
              groups: 'product.group_product_pricelist',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                pricelist_item_count: {}
              },
              _span_957: {
                _attr: {
                  invisible: [['pricelist_item_count', '=', 1]],
                  text: 'Extra Prices'
                }
              },
              _span_166: {
                _attr: {
                  invisible: [['pricelist_item_count', '!=', 1]],
                  text: 'Extra Price'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        id: { invisible: 'True' },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          preview_image: 'image_128'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Product Name'
          },
          _h1: {
            _div: {
              _attr: { class: 'd-flex' },
              priority: {
                widget: 'priority',
                class: 'me-3'
              },
              name: {
                class: 'text-break',
                placeholder: 'e.g. Cheese Burger'
              }
            }
          }
        },
        _style: 'div[name="options"] .o_field_boolean > div {\n                            margin-left: 10px;\n                            margin-right: 0px;\n                        }',
        _div_options: {
          _attr: { name: 'options' },
          _span: {
            _attr: { class: 'd-inline-block' },
            sale_ok: {},
            _label_sale_ok: { for: 'sale_ok' }
          },
          _span_991: {
            _attr: { class: 'd-inline-block' },
            purchase_ok: {},
            _label_purchase_ok: { for: 'purchase_ok' }
          }
        },
        _notebook: {
          _page_general_information: {
            _attr: {
              name: 'general_information',
              string: 'General Information'
            },
            _group: {
              _group_group_general: {
                _attr: { name: 'group_general' },
                active: { invisible: '1' },
                detailed_type: {},
                product_tooltip: { class: 'fst-italic text-muted' },
                uom_id: {
                  groups: 'uom.group_uom',
                  no_create: true
                },
                uom_po_id: {
                  groups: 'uom.group_uom',
                  no_create: true
                }
              },
              _group_group_standard_price: {
                _attr: { name: 'group_standard_price' },
                _label_list_price: { for: 'list_price' },
                _div_pricing: {
                  _attr: { name: 'pricing' },
                  list_price: {
                    widget: 'monetary',
                    class: 'oe_inline',
                    currency_field: 'currency_id',
                    field_digits: true
                  }
                },
                _label_standard_price: {
                  for: 'standard_price',
                  invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]]
                },
                _div_standard_price_uom: {
                  _attr: {
                    name: 'standard_price_uom',
                    invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]]
                  },
                  standard_price: {
                    widget: 'monetary',
                    class: 'oe_inline',
                    currency_field: 'cost_currency_id',
                    field_digits: true
                  },
                  _span: {
                    _attr: {
                      groups: 'uom.group_uom',
                      text: 'per'
                    },
                    uom_name: { class: 'oe_inline' }
                  }
                },
                categ_id: { string: 'Product Category' },
                product_tag_ids: {
                  widget: 'many2many_tags',
                  color_field: 'color'
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                currency_id: { invisible: '1' },
                cost_currency_id: { invisible: '1' },
                product_variant_id: { invisible: '1' }
              }
            },
            _group_695: {
              _attr: { string: 'Internal Notes' },
              description: { placeholder: 'This note is only for internal purposes.' }
            }
          },
          _page_sales: {
            _attr: {
              name: 'sales',
              string: 'Sales',
              invisible: [['sale_ok', '=', false]]
            },
            _group_sale: {
              _attr: { name: 'sale' },
              _group_upsell: {
                _attr: {
                  name: 'upsell',
                  string: 'Upsell & Cross-Sell',
                  invisible: '1'
                }
              }
            },
            _group: {
              _group_description: {
                _attr: {
                  name: 'description',
                  string: 'Sales Description'
                },
                description_sale: { placeholder: 'This note is added to sales orders and invoices.' }
              }
            }
          },
          _page_purchase: {
            _attr: {
              name: 'purchase',
              string: 'Purchase',
              invisible: [['purchase_ok', '=', false]]
            },
            _group_purchase: {
              _attr: { name: 'purchase' },
              _group_bill: {
                _attr: {
                  name: 'bill',
                  string: 'Vendor Bills'
                }
              }
            }
          },
          _page_inventory: {
            _attr: {
              name: 'inventory',
              string: 'Inventory',
              groups: 'product.group_stock_packaging',
              invisible: [['type', '=', 'service']]
            },
            _group_inventory: {
              _attr: { name: 'inventory' },
              _group_group_lots_and_weight: {
                _attr: {
                  name: 'group_lots_and_weight',
                  string: 'Logistics',
                  invisible: [['type', 'not in', ['product', 'consu']]]
                },
                _label_weight: {
                  for: 'weight',
                  invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]]
                },
                _div_weight: {
                  _attr: {
                    name: 'weight',
                    invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]],
                    class: 'o_row'
                  },
                  weight: { class: 'oe_inline' },
                  weight_uom_name: {}
                },
                _label_volume: {
                  for: 'volume',
                  invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]]
                },
                _div_volume: {
                  _attr: {
                    name: 'volume',
                    invisible: [['product_variant_count', '>', 1], ['is_product_variant', '=', false]],
                    class: 'o_row'
                  },
                  volume: {
                    string: 'Volume',
                    class: 'oe_inline'
                  },
                  volume_uom_name: {}
                }
              }
            },
            _group_packaging: {
              _attr: {
                name: 'packaging',
                string: 'Packaging',
                groups: 'product.group_stock_packaging',
                invisible: ['|', ['type', 'not in', ['product', 'consu']], ['product_variant_count', '>', 1], ['is_product_variant', '=', false]]
              },
              packaging_ids: {
                context: { todo_ctx: "{'tree_view_ref':'product.product_packaging_tree_view2', 'default_company_id': company_id}" }
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
      name: {
        string: 'Product',
        filter_domain: { todo_ctx: "['|', '|', '|', ('default_code', 'ilike', self), ('product_variant_ids.default_code', 'ilike', self),('name', 'ilike', self), ('barcode', 'ilike', self)]" }
      },
      categ_id: {
        filter_domain: { todo_ctx: "[('categ_id', 'child_of', raw_value)]" }
      },
      _separator: {},
      _filter_services: {
        _attr: {
          name: 'services',
          string: 'Services',
          domain: [['type', '=', 'service']]
        }
      },
      _filter_consumable: {
        _attr: {
          name: 'consumable',
          string: 'Products',
          domain: [['type', 'in', ['consu', 'product']]]
        }
      },
      _separator_656: {},
      _filter_filter_to_sell: {
        _attr: {
          name: 'filter_to_sell',
          string: 'Can be Sold',
          domain: [['sale_ok', '=', true]]
        }
      },
      _filter_filter_to_purchase: {
        _attr: {
          name: 'filter_to_purchase',
          string: 'Can be Purchased',
          domain: [['purchase_ok', '=', true]]
        }
      },
      _separator_242: {},
      attribute_line_ids: {
        string: 'Attributes',
        groups: 'product.group_product_variant'
      },
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))                     ]" }
        }
      },
      _separator_547: {},
      _filter_favorites: {
        _attr: {
          name: 'favorites',
          string: 'Favorites',
          domain: [['priority', '=', '1']]
        }
      },
      _separator_385: {},
      _filter_activities_exception: {
        _attr: {
          name: 'activities_exception',
          string: 'Warnings',
          domain: [['activity_exception_decoration', '!=', false]]
        }
      },
      _separator_150: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_type: {
          _attr: {
            name: 'type',
            string: 'Product Type',
            context: { group_by: 'type' }
          }
        },
        _filter_categ_id: {
          _attr: {
            name: 'categ_id',
            string: 'Product Category',
            context: { group_by: 'categ_id' }
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
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
