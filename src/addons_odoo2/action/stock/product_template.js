export default {
  action_open_routes: {
    _odoo_model: 'ir.actions.server',
    model_id: 'product.model_product_template',
    model: 'product_template'
  },

  view_stock_product_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_tree_view',
    arch: {
      sheet: {
        uom_id: {
          __todo__before: {
            show_on_hand_qty_status_button: {
              invisible: '1'
            },
            qty_available: {
              invisible: [['show_on_hand_qty_status_button', '=', false]]
            },
            virtual_available: {
              invisible: [['show_on_hand_qty_status_button', '=', false]]
            }
          }
        },
        default_code: {
          __todo__after: {
            responsible_id: {
              widget: 'many2one_avatar_user'
            }
          }
        }
      }
    }
  },

  product_template_search_form_view_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_search_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='attribute_line_ids']",
            position: 'after'
          },
          _separator: {},
          location_id: {
            context: {
              todo_ctx: "{'location': self}"
            }
          },
          warehouse_id: {
            context: {
              todo_ctx: "{'warehouse': self}"
            }
          },
          _separator_543: {},
          _filter_real_stock_available: {
            _attr: {
              name: 'real_stock_available',
              string: 'Available Products',
              domain: [['qty_available', '>', 0]]
            }
          },
          _filter_real_stock_negative: {
            _attr: {
              name: 'real_stock_negative',
              string: 'Negative Forecasted Quantity',
              domain: [['virtual_available', '<', 0]]
            }
          }
        }
      }
    }
  },

  view_template_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='group_lots_and_weight']",
            position: 'inside'
          },
          _label_sale_delay: {
            for: 'sale_delay',
            invisible: [['sale_ok', '=', false]]
          },
          _div: {
            _attr: {
              invisible: [['sale_ok', '=', false]]
            },
            sale_delay: {
              class: 'oe_inline'
            }
          }
        },
        _xpath_669: {
          _attr: {
            expr: "//group[@name='group_lots_and_weight']",
            position: 'before'
          },
          has_available_route_ids: {
            invisible: '1'
          },
          _group_operations: {
            _attr: {
              name: 'operations',
              string: 'Operations'
            },
            _label_route_ids: {
              for: 'route_ids',
              invisible: [['type', '=', 'service']]
            },
            _div: {
              route_ids: {
                widget: 'many2many_checkboxes',
                invisible: ['|', ['has_available_route_ids', '=', false], ['type', '=', 'service']],
                class: 'mb-0'
              },
              _button_action_open_routes: {
                _attr: {
                  name: 'action_open_routes',
                  string: 'View Diagram',
                  invisible: [['type', 'not in', ['product', 'consu']]],
                  context: {
                    default_product_tmpl_id: 'todo===id'
                  },
                  class: 'btn btn-link pt-0',
                  type: 'action',
                  icon: 'fa-arrow-right'
                }
              }
            },
            route_from_categ_ids: {
              widget: 'many2many_tags',
              invisible: [['route_from_categ_ids', '=', []]]
            }
          }
        },
        _xpath_946: {
          _attr: {
            expr: "//group[@name='group_lots_and_weight']",
            position: 'after'
          },
          _group_traceability: {
            _attr: {
              name: 'traceability',
              string: 'Traceability',
              groups: 'stock.group_production_lot',
              invisible: [['type', '=', 'consu']]
            },
            tracking: {
              widget: 'radio',
              invisible: [['type', '=', 'service']]
            }
          },
          _group_stock_property: {
            _attr: {
              name: 'stock_property',
              string: 'Counterpart Locations',
              groups: 'base.group_no_one'
            },
            property_stock_production: {},
            property_stock_inventory: {}
          }
        },
        _page_inventory: {
          _attr: {
            name: 'inventory'
          },
          _group: {
            _group: {
              _attr: {
                string: 'Description for Receipts'
              },
              description_pickingin: {
                placeholder: 'This note is added to receipt orders (e.g. where to store the product in the warehouse).'
              }
            },
            _group_556: {
              _attr: {
                string: 'Description for Delivery Orders'
              },
              description_pickingout: {
                placeholder: 'This note is added to delivery orders.'
              }
            },
            _group_922: {
              _attr: {
                string: 'Description for Internal Transfers',
                groups: 'stock.group_stock_multi_locations'
              },
              description_picking: {
                placeholder: 'This note is added to internal transfer orders (e.g. where to pick the product in the warehouse).'
              }
            }
          }
        },
        _page_inventory_631: {
          _attr: {
            name: 'inventory'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'stock.group_stock_user,product.group_stock_packaging'
            }
          }
        }
      }
    }
  },

  product_template_kanban_stock_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_kanban_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'inside'
          },
          type: {},
          show_on_hand_qty_status_button: {}
        },
        _xpath_689: {
          _attr: {
            expr: "//div[@name='product_lst_price']",
            position: 'after'
          },
          _div: {
            _attr: {
              text: 'On hand:'
            },
            qty_available: {},
            uom_id: {}
          }
        }
      }
    }
  },

  product_template_form_view_procurement_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_only_form_view',
    arch: {
      sheet: {
        _data: {
          _header: {
            _button_action_update_quantity_on_hand: {
              _attr: {
                name: 'action_update_quantity_on_hand',
                string: 'Update Quantity',
                groups: 'stock.group_stock_manager',
                invisible: [['type', '!=', 'product']],
                type: 'object'
              }
            },
            _button_action_product_replenish: {
              _attr: {
                name: 'action_product_replenish',
                string: 'Replenish',
                groups: 'stock.group_stock_user',
                invisible: [['type', 'not in', ['consu', 'product']]],
                context: {
                  default_product_tmpl_id: 'todo===id'
                },
                type: 'action'
              }
            }
          },
          _div_button_box: {
            _attr: {
              name: 'button_box'
            },
            _t: {
              _attr: {
                groups: 'stock.group_stock_user'
              },
              tracking: {
                invisible: '1'
              },
              show_on_hand_qty_status_button: {
                invisible: '1'
              },
              show_forecasted_qty_status_button: {
                invisible: '1'
              },
              _button_action_open_quants: {
                _attr: {
                  name: 'action_open_quants',
                  invisible: [['show_on_hand_qty_status_button', '=', false]],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-cubes'
                },
                _div: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    qty_available: {
                      widget: 'statinfo',
                      class: 'mr4'
                    },
                    uom_name: {}
                  },
                  _span_810: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'On Hand'
                    }
                  }
                }
              },
              _button_action_product_tmpl_forecast_report: {
                _attr: {
                  name: 'action_product_tmpl_forecast_report',
                  invisible: [['show_forecasted_qty_status_button', '=', false]],
                  context: {
                    default_product_tmpl_id: 'todo===id'
                  },
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-cubes'
                },
                _div: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    virtual_available: {
                      widget: 'statinfo',
                      class: 'mr4'
                    },
                    uom_name: {}
                  },
                  _span_767: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Forecasted'
                    }
                  }
                }
              },
              _button_action_view_stock_move_lines: {
                _attr: {
                  name: 'action_view_stock_move_lines',
                  groups: 'stock.group_stock_user',
                  invisible: [['type', 'not in', ['product', 'consu']]],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-exchange'
                },
                _div: {
                  _attr: {
                    class: 'o_field_widget o_stat_info mr4'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'In:'
                    }
                  },
                  _span_238: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Out:'
                    }
                  }
                },
                _div_906: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    nbr_moves_in: {}
                  },
                  _span_521: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    nbr_moves_out: {}
                  }
                }
              },
              _button_action_view_orderpoints: {
                _attr: {
                  name: 'action_view_orderpoints',
                  invisible: ['|', ['type', '!=', 'product'], ['nbr_reordering_rules', '!=', 1]],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-refresh'
                },
                _div: {
                  _attr: {
                    class: 'o_field_widget o_stat_info mr4'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Min:'
                    }
                  },
                  _span_226: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Max:'
                    }
                  }
                },
                _div_790: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_min_qty: {}
                  },
                  _span_507: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_max_qty: {}
                  }
                }
              },
              _button_action_view_orderpoints_973: {
                _attr: {
                  name: 'action_view_orderpoints',
                  invisible: ['|', ['type', '!=', 'product'], ['nbr_reordering_rules', '==', 1]],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-refresh'
                },
                nbr_reordering_rules: {
                  widget: 'statinfo'
                }
              },
              _button_action_open_product_lot: {
                _attr: {
                  name: 'action_open_product_lot',
                  string: 'Lot/Serial Numbers',
                  groups: 'stock.group_production_lot',
                  invisible: [['tracking', '=', 'none']],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-bars'
                }
              },
              _button_action_view_related_putaway_rules: {
                _attr: {
                  name: 'action_view_related_putaway_rules',
                  string: 'Putaway Rules',
                  groups: 'stock.group_stock_multi_locations',
                  invisible: [['type', '=', 'service']],
                  context: {
                    todo_ctx: "{                                     'invisible_handle': True,                                     'single_product': product_variant_count == 1,                                 }"
                  },
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-random'
                }
              },
              _button_action_view_storage_category_capacity: {
                _attr: {
                  name: 'action_view_storage_category_capacity',
                  string: 'Storage Capacities',
                  groups: 'stock.group_stock_storage_categories',
                  invisible: [['type', '=', 'service']],
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-cubes'
                }
              }
            }
          },
          _xpath: {
            _attr: {
              expr: "//label[@for='weight']",
              position: 'before'
            },
            responsible_id: {
              widget: 'many2one_avatar_user',
              groups: 'stock.group_stock_user',
              domain: [['share', '=', false]]
            }
          }
        }
      }
    }
  },

  product_template_action_product: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    search_view_id: 'product_template_search_form_view_stock',
    res_model: 'product.template',
    context: {
      search_default_consumable: 1,
      default_detailed_type: 'product'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
