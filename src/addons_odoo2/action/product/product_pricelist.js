export default {
  product_pricelist_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'search',
    arch: {
      name: {
        string: 'Products Price'
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
      }
    }
  },

  product_pricelist_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        discount_policy: {
          groups: 'product.group_discount_per_so_line'
        },
        currency_id: {
          groups: 'base.group_multi_currency'
        },
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  product_pricelist_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'otherview',
    arch: {}
  },

  product_pricelist_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {
              placeholder: 'e.g. USD Retailers'
            }
          }
        },
        _group: {
          _group_pricelist_settings: {
            _attr: {
              name: 'pricelist_settings'
            },
            currency_id: {
              groups: 'base.group_multi_currency'
            },
            active: {
              invisible: '1'
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          }
        },
        _notebook: {
          _page_pricelist_rules: {
            _attr: {
              name: 'pricelist_rules',
              string: 'Price Rules'
            },
            item_ids: {
              context: {
                default_base: 'list_price'
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Pricelist Rules',
                        groups: '!product.group_sale_pricelist'
                      },
                      product_tmpl_id: {
                        string: 'Products',
                        required: '1'
                      },
                      product_id: {
                        string: 'Variants',
                        groups: 'product.group_product_variant',
                        domain: {
                          todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
                        },
                        no_create: 1
                      },
                      min_quantity: {},
                      fixed_price: {
                        string: 'Price'
                      },
                      currency_id: {
                        invisible: '1'
                      },
                      pricelist_id: {
                        invisible: '1'
                      },
                      date_start: {},
                      date_end: {},
                      base: {
                        invisible: '1'
                      },
                      applied_on: {
                        invisible: '1'
                      },
                      company_id: {
                        invisible: '1'
                      }
                    }
                  }
                },
                todoview___tree_578: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Pricelist Rules',
                        groups: 'product.group_sale_pricelist'
                      },
                      product_tmpl_id: {
                        invisible: '1'
                      },
                      name: {
                        string: 'Applicable On'
                      },
                      min_quantity: {},
                      price: {
                        string: 'Price'
                      },
                      date_start: {},
                      date_end: {},
                      base: {
                        invisible: '1'
                      },
                      price_discount: {
                        invisible: '1'
                      },
                      applied_on: {
                        invisible: '1'
                      },
                      compute_price: {
                        invisible: '1'
                      }
                    }
                  }
                }
              }
            }
          },
          _page_pricelist_config: {
            _attr: {
              name: 'pricelist_config',
              string: 'Configuration'
            },
            _group: {
              _group_pricelist_availability: {
                _attr: {
                  name: 'pricelist_availability',
                  string: 'Availability'
                },
                country_group_ids: {
                  widget: 'many2many_tags'
                }
              },
              _group_pricelist_discounts: {
                _attr: {
                  name: 'pricelist_discounts',
                  string: 'Discounts',
                  groups: 'product.group_discount_per_so_line'
                },
                discount_policy: {
                  widget: 'radio'
                }
              }
            }
          }
        }
      }
    }
  },

  product_pricelist_action2: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Pricelists',
    type: 'ir.actions.act_window',
    search_view_id: 'product_pricelist_view_search',
    res_model: 'product.pricelist',
    context: {
      default_base: 'list_price'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
