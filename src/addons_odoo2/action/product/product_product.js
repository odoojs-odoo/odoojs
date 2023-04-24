export default {
  product_search_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_template_search_view',
    arch: {
      sheet: {
        name: {
          position: 'replace',
          __todo__replace: {
            name: {
              string: 'Product',
              filter_domain: { todo_ctx: "['|', '|', ('default_code', 'ilike', self), ('name', 'ilike', self), ('barcode', 'ilike', self)]" }
            }
          }
        },
        attribute_line_ids: {
          position: 'replace',
          __todo__replace: {
            product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
            product_tmpl_id: { string: 'Product Template' }
          }
        }
      }
    }
  },

  product_normal_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    type: 'ir.actions.act_window',
    res_model: 'product.product',
    search_view_id: 'product_search_form_view',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_variant_easy_edit_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'form',
    arch: {
      header: {
        _button_action_open_label_layout: {
          _attr: {
            name: 'action_open_label_layout',
            type: 'object',
            string: 'Print Labels'
          }
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
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
        active: { invisible: '1' },
        id: { invisible: '1' },
        company_id: { invisible: '1' },
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
            name: {
              readonly: '1',
              placeholder: 'e.g. Odoo Enterprise Subscription'
            }
          },
          product_template_attribute_value_ids: {
            widget: 'many2many_tags',
            readonly: '1'
          },
          _p: {
            _span: 'All general settings about this product are managed on',
            _button_open_product_template: {
              _attr: {
                name: 'open_product_template',
                type: 'object',
                string: 'the product template.',
                class: 'oe_link oe_link_product ps-0 ms-1 mb-1'
              }
            }
          }
        },
        _group: {
          _group_codes: {
            _attr: {
              name: 'codes',
              string: 'Codes'
            },
            default_code: {},
            barcode: {},
            type: { invisible: '1' }
          },
          _group_pricing: {
            _attr: {
              name: 'pricing',
              string: 'Pricing'
            },
            product_variant_count: { invisible: '1' },
            _label_lst_price: {
              for: 'lst_price',
              string: 'Sales Price'
            },
            _div: {
              _attr: { class: 'o_row' },
              lst_price: {
                widget: 'monetary',
                readonly: [['product_variant_count', '>', 1]],
                class: 'oe_inline',
                currency_field: 'currency_id',
                field_digits: true
              }
            },
            _label_standard_price: { for: 'standard_price' },
            _div_480: {
              _attr: { class: 'o_row' },
              standard_price: {
                widget: 'monetary',
                class: 'oe_inline',
                currency_field: 'cost_currency_id'
              }
            },
            currency_id: { invisible: '1' },
            cost_currency_id: { invisible: '1' }
          }
        },
        _group_360: {
          _group_weight: {
            _attr: {
              name: 'weight',
              string: 'Logistics',
              invisible: [['type', 'not in', ['product', 'consu']]]
            },
            _label_volume: { for: 'volume' },
            _div: {
              _attr: { class: 'o_row' },
              volume: { class: 'oe_inline' },
              _span: {
                volume_uom_name: {}
              }
            },
            _label_weight: { for: 'weight' },
            _div_446: {
              _attr: { class: 'o_row' },
              weight: { class: 'oe_inline' },
              _span: {
                weight_uom_name: {}
              }
            }
          },
          _group_tags: {
            _attr: {
              name: 'tags',
              string: 'Tags'
            },
            product_tag_ids: {
              string: 'Product Template Tags',
              widget: 'many2many_tags',
              readonly: '1',
              no_open: true,
              color_field: 'color'
            },
            additional_product_tag_ids: {
              widget: 'many2many_tags',
              color_field: 'color',
              no_edit_color: 1
            }
          }
        },
        _group_259: {
          _group_packaging: {
            _attr: {
              name: 'packaging',
              string: 'Packaging',
              groups: 'product.group_stock_packaging'
            },
            packaging_ids: {
              context: { todo_ctx: "{'tree_view_ref':'product.product_packaging_tree_view2', 'default_company_id': company_id}" }
            }
          }
        }
      }
    }
  },

  product_variant_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    type: 'ir.actions.act_window',
    res_model: 'product.product',
    search_view_id: 'product_search_form_view',
    context: { todo_ctx: "{'search_default_product_tmpl_id': [active_id], 'default_product_tmpl_id': active_id, 'create': False}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  product_product_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
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
        priority: {
          widget: 'priority',
          readonly: '1'
        },
        default_code: {
          readonly: '1',
          optional: 'show'
        },
        barcode: {
          readonly: '1',
          optional: 'hide'
        },
        name: { readonly: '1' },
        product_template_variant_value_ids: {
          widget: 'many2many_tags',
          groups: 'product.group_product_variant',
          readonly: '1'
        },
        company_id: {
          groups: 'base.group_multi_company',
          readonly: '1',
          optional: 'hide'
        },
        lst_price: {
          string: 'Sales Price',
          optional: 'show'
        },
        standard_price: { optional: 'show' },
        categ_id: { optional: 'hide' },
        product_tag_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color',
          no_edit_color: 1
        },
        type: {
          readonly: '1',
          optional: 'hide'
        },
        uom_id: {
          groups: 'uom.group_uom',
          readonly: '1',
          optional: 'show',
          no_open: true,
          no_create: true
        },
        product_tmpl_id: {
          invisible: '1',
          readonly: '1'
        },
        active: { invisible: '1' }
      }
    }
  },

  product_normal_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _form: {
          _attr: { position: 'attributes' },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Product Variant',
              string: 'Product Variant'
            }
          },
          _attribute_duplicate: {
            _attr: {
              name: 'duplicate',
              text: 'false',
              duplicate: 'false'
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[@name='standard_price_uom']",
            position: 'after'
          },
          default_code: {},
          barcode: {}
        },
        _xpath_864: {
          _attr: {
            expr: "//field[@name='priority']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '1',
              readonly: '1'
            }
          }
        },
        list_price: {
          position: 'attributes',
          readonly: [['product_variant_count', '>', 1]],
          invisible: '1'
        },
        _xpath_724: {
          _attr: {
            expr: "//label[@for='list_price']",
            position: 'replace'
          },
          _label_lst_price: { for: 'lst_price' }
        },
        _field_list_price_602: {
          list_price: {
            position: 'after',
            __todo__after: {
              lst_price: {
                widget: 'monetary',
                class: 'oe_inline',
                currency_field: 'currency_id',
                field_digits: true
              }
            }
          }
        },
        _group_packaging: {
          _attr: {
            name: 'packaging',
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': 0}",
              attrs: "{'invisible': 0}"
            }
          }
        },
        name: {
          position: 'after',
          __todo__after: {
            product_tmpl_id: {
              invisible: '1',
              required: [['id', '!=', false]],
              class: 'oe_inline',
              readonly: '1'
            }
          }
        },
        _xpath_294: {
          _attr: {
            expr: "//div[hasclass('oe_title')]",
            position: 'inside'
          },
          product_template_variant_value_ids: {
            widget: 'many2many_tags',
            groups: 'product.group_product_variant',
            readonly: '1'
          }
        },
        product_tag_ids: {
          position: 'attributes',
          __todo__options: "{'no_open': true}"
        },
        _field_product_tag_ids_160: {
          product_tag_ids: {
            position: 'after',
            __todo__after: {
              additional_product_tag_ids: {
                color_field: 'color',
                no_edit_color: 1
              }
            }
          }
        }
      }
    }
  },

  product_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'otherview',
    arch: {}
  },

  product_product_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'otherview',
    arch: {}
  },

  product_normal_action_sell: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    type: 'ir.actions.act_window',
    res_model: 'product.product',
    search_view_id: 'product_search_form_view',
    context: { search_default_filter_to_sell: 1 },
    views: {
      tree: 'product_product_tree_view',
      form: '=======todo=========='
    }
  },

  action_product_price_list_report: {
    _odoo_model: 'ir.actions.server',
    model_id: 'product.model_product_product',
    model: 'product_product'
  }
}
