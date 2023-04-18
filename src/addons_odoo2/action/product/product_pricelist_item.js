export default {
  product_pricelist_item_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist.item',
    type: 'search',
    arch: {
      _filter_Product$space$Rule: {
        _attr: {
          name: 'Product Rule',
          domain: [['applied_on', '=', '1_product']]
        }
      },
      _filter_Variant$space$Rule: {
        _attr: {
          name: 'Variant Rule',
          groups: 'product.group_product_variant',
          domain: [['applied_on', '=', '0_product_variant']]
        }
      },
      _separator: {},
      pricelist_id: {},
      company_id: {
        groups: 'base.group_multi_company'
      },
      currency_id: {
        groups: 'base.group_multi_currency'
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_groupby_product: {
          _attr: {
            name: 'groupby_product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_tmpl_id'
            }
          }
        },
        _filter_groupby_product_variant: {
          _attr: {
            name: 'groupby_product_variant',
            string: 'Variant',
            groups: 'product.group_product_variant',
            domain: [['applied_on', '=', '0_product_variant']],
            context: {
              group_by: 'product_tmpl_id'
            }
          }
        },
        _filter_groupby_vendor: {
          _attr: {
            name: 'groupby_vendor',
            string: 'Pricelist',
            groups: 'product.group_product_pricelist',
            domain: [],
            context: {
              group_by: 'pricelist_id'
            }
          }
        }
      }
    }
  },

  product_pricelist_item_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist.item',
    type: 'tree',
    arch: {
      sheet: {
        pricelist_id: {},
        name: {
          string: 'Applied On'
        },
        price: {},
        min_quantity: {},
        date_start: {
          optional: 'hide'
        },
        date_end: {
          optional: 'hide'
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        }
      }
    }
  },

  product_pricelist_item_tree_view_from_product: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist.item',
    type: 'tree',
    arch: {
      sheet: {
        pricelist_id: {
          string: 'Pricelist',
          no_create_edit: 1,
          no_open: 1
        },
        name: {
          string: 'Applied On'
        },
        company_id: {
          invisible: '1'
        },
        categ_id: {
          invisible: '1'
        },
        product_tmpl_id: {
          invisible: "context.get['active_model']!='product.category'",
          domain: {
            todo_ctx: "[('categ_id', '=', context.get('default_categ_id', True)), '|', ('company_id', '=', company_id), ('company_id', '=', False)]"
          },
          required: [['applied_on', '=', '1_product']],
          no_create_edit: 1,
          no_open: 1
        },
        product_id: {
          groups: 'product.group_product_variant',
          invisible: "context.get['product_without_variants', False]",
          domain: {
            todo_ctx: "['|', '|',                     ('id', '=', context.get('default_product_id', 0)),                     ('product_tmpl_id', '=', context.get('default_product_tmpl_id', 0)),                     ('categ_id', '=', context.get('default_categ_id', 0)), '|', ('company_id', '=', company_id), ('company_id', '=', False)                   ]"
          },
          required: [['applied_on', '=', '0_product_variant']],
          readonly: "context.get['active_model']=='product.product'",
          no_create_edit: 1,
          no_open: 1
        },
        min_quantity: {},
        currency_id: {
          invisible: '1'
        },
        fixed_price: {
          string: 'Price',
          required: '1'
        },
        date_start: {
          optional: 'show'
        },
        date_end: {
          optional: 'show'
        },
        applied_on: {
          invisible: '1'
        },
        _field_company_id_394: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'show',
            no_create: 1,
            no_open: 1
          }
        }
      }
    }
  },

  product_pricelist_item_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist.item',
    type: 'form',
    arch: {
      sheet: {
        name: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        _group_pricelist_rule_computation: {
          _attr: {
            name: 'pricelist_rule_computation',
            string: 'Price Computation',
            groups: 'product.group_sale_pricelist'
          },
          _group_pricelist_rule_method: {
            _attr: {
              name: 'pricelist_rule_method'
            },
            compute_price: {
              string: 'Computation',
              widget: 'radio'
            }
          },
          _div: {
            _attr: {
              groups: 'uom.group_uom',
              class: 'alert alert-info',
              text: 'The computed price is expressed in the default Unit of Measure of the product.'
            }
          }
        },
        _group_pricelist_rule_base: {
          _attr: {
            name: 'pricelist_rule_base',
            groups: 'product.group_sale_pricelist'
          },
          _group: {
            price: {
              invisible: '1'
            },
            fixed_price: {
              widget: 'monetary',
              invisible: [['compute_price', '!=', 'fixed']]
            },
            _label_percent_price: {
              for: 'percent_price',
              string: 'Discount',
              invisible: [['compute_price', '!=', 'percentage']]
            },
            _div: {
              _attr: {
                invisible: [['compute_price', '!=', 'percentage']],
                class: 'o_row'
              },
              percent_price: {
                invisible: [['compute_price', '!=', 'percentage']],
                class: 'oe_inline'
              }
            },
            base: {
              invisible: [['compute_price', '!=', 'formula']]
            },
            base_pricelist_id: {
              invisible: ['|', ['compute_price', '!=', 'formula'], ['base', '!=', 'pricelist']],
              required: [['compute_price', '=', 'formula'], ['base', '=', 'pricelist']],
              readonly: [['base', '!=', 'pricelist']]
            },
            _label_price_discount: {
              for: 'price_discount',
              string: 'Discount',
              invisible: [['compute_price', '!=', 'formula']]
            },
            _div_110: {
              _attr: {
                invisible: [['compute_price', '!=', 'formula']],
                class: 'o_row'
              },
              price_discount: {},
              _span: '%'
            },
            price_surcharge: {
              string: 'Extra Fee',
              widget: 'monetary',
              invisible: [['compute_price', '!=', 'formula']]
            },
            price_round: {
              string: 'Rounding Method',
              invisible: [['compute_price', '!=', 'formula']]
            },
            _label_price_min_margin: {
              for: 'price_min_margin',
              string: 'Margins',
              invisible: [['compute_price', '!=', 'formula']]
            },
            _div_903: {
              _attr: {
                invisible: [['compute_price', '!=', 'formula']],
                class: 'o_row'
              },
              price_min_margin: {
                string: 'Min. Margin',
                widget: 'monetary',
                class: 'oe_inline'
              },
              _i: {
                _attr: {
                  title: 'Arrow',
                  class: 'fa fa-long-arrow-right mx-2 oe_edit_only'
                }
              },
              price_max_margin: {
                string: 'Max. Margin',
                widget: 'monetary',
                class: 'oe_inline'
              }
            }
          },
          _div: {
            _attr: {
              invisible: [['compute_price', '!=', 'formula']],
              class: 'alert alert-info'
            },
            rule_tip: {}
          }
        },
        _group: {
          _attr: {
            string: 'Conditions'
          },
          _group_pricelist_rule_target: {
            _attr: {
              name: 'pricelist_rule_target'
            },
            applied_on: {
              widget: 'radio'
            },
            categ_id: {
              invisible: [['applied_on', '!=', '2_product_category']],
              required: [['applied_on', '=', '2_product_category']],
              no_create: 1
            },
            product_tmpl_id: {
              invisible: [['applied_on', '!=', '1_product']],
              required: [['applied_on', '=', '1_product']],
              no_create: 1
            },
            product_id: {
              invisible: [['applied_on', '!=', '0_product_variant']],
              required: [['applied_on', '=', '0_product_variant']],
              no_create: 1
            }
          },
          _group_pricelist_rule_limits: {
            _attr: {
              name: 'pricelist_rule_limits'
            },
            min_quantity: {},
            _label_date_start: {
              for: 'date_start',
              string: 'Validity'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              date_start: {
                widget: 'daterange',
                related_end_date: 'date_end'
              },
              _i: {
                _attr: {
                  title: 'Arrow',
                  class: 'fa fa-long-arrow-right mx-2 oe_edit_only'
                }
              },
              date_end: {
                widget: 'daterange',
                related_start_date: 'date_start'
              }
            }
          },
          _group_pricelist_rule_related: {
            _attr: {
              name: 'pricelist_rule_related',
              groups: 'base.group_no_one'
            },
            pricelist_id: {
              invisible: '1'
            },
            currency_id: {
              groups: 'base.group_multi_currency'
            },
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  product_pricelist_item_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Price Rules',
    type: 'ir.actions.act_window',
    res_model: 'product.pricelist.item',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
