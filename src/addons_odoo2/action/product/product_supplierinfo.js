export default {
  product_supplierinfo_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_vendor: {
            _attr: {
              name: 'vendor',
              string: 'Vendor'
            },
            product_variant_count: {
              invisible: '1'
            },
            partner_id: {
              context: {
                res_partner_search_mode: 'supplier'
              }
            },
            product_name: {},
            product_code: {},
            _label_delay: {
              for: 'delay'
            },
            _div: {
              delay: {
                class: 'oe_inline'
              }
            }
          },
          _group: {
            _attr: {
              string: 'Pricelist'
            },
            product_tmpl_id: {
              string: 'Product',
              invisible: "context.get['visible_product_tmpl_id', True]"
            },
            product_id: {
              groups: 'product.group_product_variant',
              no_create: true
            },
            _label_min_qty: {
              for: 'min_qty'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              min_qty: {},
              product_uom: {
                groups: 'uom.group_uom'
              }
            },
            _label_price: {
              for: 'price',
              string: 'Unit Price'
            },
            _div_270: {
              _attr: {
                class: 'o_row'
              },
              price: {
                class: 'oe_inline'
              },
              currency_id: {
                groups: 'base.group_multi_currency'
              }
            },
            _label_date_start: {
              for: 'date_start',
              string: 'Validity'
            },
            _div_108: {
              _attr: {
                class: 'o_row'
              },
              date_start: {
                class: 'oe_inline'
              },
              date_end: {
                class: 'oe_inline'
              }
            },
            company_id: {
              no_create: true
            }
          }
        }
      }
    }
  },

  product_supplierinfo_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'search',
    arch: {
      partner_id: {},
      product_tmpl_id: {},
      _filter_active_products: {
        _attr: {
          name: 'active_products',
          string: 'Active Products',
          domain: ['|', ['product_tmpl_id.active', '=', true], ['product_id.active', '=', true]]
        }
      },
      _separator: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: {
            todo_ctx: "['|', ('date_end', '=', False), ('date_end', '>=',  (context_today() - datetime.timedelta(days=1)).strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: {
            todo_ctx: "[('date_end', '<',  (context_today() - datetime.timedelta(days=1)).strftime('%Y-%m-%d'))]"
          }
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
        _filter_groupby_vendor: {
          _attr: {
            name: 'groupby_vendor',
            string: 'Vendor',
            domain: [],
            context: {
              group_by: 'partner_id'
            }
          }
        }
      }
    }
  },

  product_supplierinfo_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'otherview',
    arch: {}
  },

  product_supplierinfo_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        partner_id: {},
        product_id: {
          groups: 'product.group_product_variant',
          invisible: "context.get['product_template_invisible_variant', False]"
        },
        product_tmpl_id: {
          string: 'Product',
          invisible: "context.get['visible_product_tmpl_id', True]"
        },
        product_name: {},
        product_code: {},
        date_start: {},
        date_end: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        min_qty: {},
        product_uom: {
          groups: 'uom.group_uom'
        },
        price: {
          string: 'Price'
        },
        currency_id: {
          groups: 'base.group_multi_currency'
        },
        delay: {}
      }
    }
  },

  product_supplierinfo_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendor Pricelists',
    type: 'ir.actions.act_window',
    res_model: 'product.supplierinfo',
    context: {
      visible_product_tmpl_id: false,
      search_default_active_products: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
