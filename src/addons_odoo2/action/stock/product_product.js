export default {
  act_product_location_open: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    res_model: 'product.product',
    search_view_id: 'stock.stock_product_search_form_view',
    context: {
      todo_ctx: "{'location': active_id, 'search_default_real_stock_available': 1, 'search_default_virtual_stock_available': 1,\n                    'search_default_virtual_stock_negative': 1, 'search_default_real_stock_negative': 1, 'create': False}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_stock_product_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_product_tree_view',
    arch: {
      sheet: {
        type: {
          position: 'after',
          __todo__after: {
            qty_available: {
              invisible: [['type', '!=', 'product']],
              optional: 'show'
            },
            virtual_available: {
              string: 'Forecasted Quantity',
              invisible: [['type', '!=', 'product']],
              optional: 'show'
            }
          }
        }
      }
    }
  },

  stock_product_search_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_search_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='inactive']",
            position: 'after'
          },
          _separator: {},
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

  product_search_form_view_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_search_form_view',
    arch: {
      sheet: {
        _filter_activities_overdue: {
          _attr: {
            name: 'activities_overdue',
            position: 'after'
          },
          location_id: {
            context: {
              todo_ctx: "{'location': self}"
            },
            no_create: true
          },
          warehouse_id: {
            context: {
              todo_ctx: "{'warehouse': self}"
            }
          }
        }
      }
    }
  },

  product_product_view_form_easy_inherit_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_variant_easy_edit_view',
    arch: {
      sheet: {
        _header: {
          _attr: {
            position: 'inside'
          },
          _button_action_update_quantity_on_hand: {
            _attr: {
              name: 'action_update_quantity_on_hand',
              type: 'object',
              string: 'Update Quantity',
              groups: 'stock.group_stock_manager',
              invisible: [['type', '!=', 'product']]
            }
          },
          _button_action_product_replenish: {
            _attr: {
              name: 'action_product_replenish',
              type: 'action',
              string: 'Replenish',
              groups: 'stock.group_stock_user',
              invisible: [['type', 'not in', ['consu', 'product']]],
              context: {
                default_product_id: 'todo===id'
              }
            }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_view_related_putaway_rules: {
            _attr: {
              name: 'action_view_related_putaway_rules',
              type: 'object',
              string: 'Putaway Rules',
              icon: 'fa-random',
              groups: 'stock.group_stock_multi_locations',
              invisible: [['type', '=', 'service']],
              context: {
                invisible_handle: true,
                single_product: true
              },
              class: 'oe_stat_button'
            }
          }
        }
      }
    }
  },

  product_form_view_procurement_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_normal_form_view',
    arch: {
      sheet: {
        _data: {
          _header: {
            _attr: {
              position: 'inside'
            },
            _button_action_update_quantity_on_hand: {
              _attr: {
                name: 'action_update_quantity_on_hand',
                type: 'object',
                string: 'Update Quantity',
                groups: 'stock.group_stock_manager',
                invisible: [['type', '!=', 'product']]
              }
            },
            _button_action_product_replenish: {
              _attr: {
                name: 'action_product_replenish',
                type: 'action',
                string: 'Replenish',
                groups: 'stock.group_stock_user',
                invisible: [['type', 'not in', ['consu', 'product']]],
                context: {
                  default_product_id: 'todo===id'
                }
              }
            }
          },
          _div_button_box: {
            _attr: {
              name: 'button_box',
              position: 'inside'
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
                  type: 'object',
                  icon: 'fa-cubes',
                  invisible: [['show_on_hand_qty_status_button', '=', false]],
                  class: 'oe_stat_button'
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
                  _span_750: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'On Hand'
                    }
                  }
                }
              },
              _button_action_product_forecast_report: {
                _attr: {
                  name: 'action_product_forecast_report',
                  type: 'object',
                  icon: 'fa-cubes',
                  invisible: [['show_forecasted_qty_status_button', '=', false]],
                  context: {
                    default_product_id: 'todo===id'
                  },
                  class: 'oe_stat_button'
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
                  _span_159: {
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
                  type: 'object',
                  icon: 'fa-exchange',
                  groups: 'stock.group_stock_user',
                  invisible: [['type', 'not in', ['product', 'consu']]],
                  class: 'oe_stat_button'
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
                  _span_363: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Out:'
                    }
                  }
                },
                _div_191: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    nbr_moves_in: {}
                  },
                  _span_292: {
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
                  type: 'object',
                  icon: 'fa-refresh',
                  invisible: ['|', ['type', 'not in', ['product', 'consu']], ['nbr_reordering_rules', '!=', 1]],
                  class: 'oe_stat_button'
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
                  _span_670: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Max:'
                    }
                  }
                },
                _div_104: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_min_qty: {}
                  },
                  _span_344: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_max_qty: {}
                  }
                }
              },
              _button_action_view_orderpoints_158: {
                _attr: {
                  name: 'action_view_orderpoints',
                  type: 'object',
                  icon: 'fa-refresh',
                  invisible: ['|', ['type', '!=', 'product'], ['nbr_reordering_rules', '==', 1]],
                  class: 'oe_stat_button'
                },
                nbr_reordering_rules: {
                  widget: 'statinfo'
                }
              },
              _button_action_open_product_lot: {
                _attr: {
                  name: 'action_open_product_lot',
                  type: 'object',
                  string: 'Lot/Serial Numbers',
                  icon: 'fa-bars',
                  groups: 'stock.group_production_lot',
                  invisible: [['tracking', '=', 'none']],
                  class: 'oe_stat_button'
                }
              },
              _button_action_view_related_putaway_rules: {
                _attr: {
                  name: 'action_view_related_putaway_rules',
                  type: 'object',
                  string: 'Putaway Rules',
                  icon: 'fa-random',
                  groups: 'stock.group_stock_multi_locations',
                  invisible: [['type', '=', 'service']],
                  context: {
                    invisible_handle: true,
                    single_product: true
                  },
                  class: 'oe_stat_button'
                }
              },
              _button_action_view_storage_category_capacity: {
                _attr: {
                  name: 'action_view_storage_category_capacity',
                  type: 'object',
                  string: 'Storage Capacities',
                  icon: 'fa-cubes',
                  groups: 'stock.group_stock_storage_categories',
                  invisible: [['type', '=', 'service']],
                  class: 'oe_stat_button'
                }
              }
            }
          },
          _xpath: {
            _attr: {
              expr: "//button[@name='%(action_open_routes)d']",
              position: 'attributes'
            },
            _attribute_context: {
              _attr: {
                name: 'context',
                text: "{'default_product_id': id}",
                context: "{'default_product_id': id}"
              }
            }
          }
        }
      }
    }
  },

  product_product_stock_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    type: 'tree',
    arch: {
      sheet: {
        id: {
          invisible: '1'
        },
        display_name: {
          string: 'Product'
        },
        categ_id: {
          optional: 'hide'
        },
        qty_available: {
          string: 'On Hand'
        },
        _button_action_view_inventory_tree: {
          _attr: {
            name: 'action_view_inventory_tree',
            type: 'action',
            title: 'Inventory Adjustment',
            icon: 'fa-pencil',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        },
        free_qty: {
          string: 'Free to Use'
        },
        incoming_qty: {
          optional: 'show'
        },
        outgoing_qty: {
          optional: 'show'
        },
        virtual_available: {
          string: 'Forecasted',
          optional: 'hide'
        },
        uom_id: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_create: true
        },
        _button_stock_move_line_action: {
          _attr: {
            name: 'stock_move_line_action',
            type: 'action',
            string: 'History',
            icon: 'fa-history',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        },
        _button_action_view_orderpoints: {
          _attr: {
            name: 'action_view_orderpoints',
            type: 'object',
            string: 'Replenishment',
            icon: 'fa-refresh',
            context: {
              search_default_product_id: 'todo===id',
              is_stock_report: true
            },
            class: 'btn-link'
          }
        },
        _button_action_view_quants: {
          _attr: {
            name: 'action_view_quants',
            type: 'action',
            string: 'Locations',
            icon: 'fa-cubes',
            groups: 'stock.group_stock_multi_locations',
            invisible: [['qty_available', '=', 0]],
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        },
        _button_action_product_forecast_report: {
          _attr: {
            name: 'action_product_forecast_report',
            type: 'object',
            string: 'Forecast',
            icon: 'fa-area-chart',
            invisible: [['incoming_qty', '=', 0], ['outgoing_qty', '=', 0]],
            context: {
              default_product_id: 'todo===id'
            },
            class: 'btn-link'
          }
        }
      }
    }
  },

  product_search_form_view_stock_report: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'stock_product_search_form_view',
    arch: {
      sheet: {
        _filter_services: {
          _attr: {
            name: 'services',
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': 1}",
              attrs: "{'invisible': 1}"
            }
          }
        },
        _filter_consumable: {
          _attr: {
            name: 'consumable',
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': 1}",
              attrs: "{'invisible': 1}"
            }
          }
        },
        _filter_real_stock_negative: {
          _attr: {
            name: 'real_stock_negative',
            position: 'after'
          },
          _searchpanel: {
            categ_id: {
              string: 'Category'
            }
          }
        }
      }
    }
  },

  action_product_stock_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock',
    res_model: 'product.product',
    search_view_id: 'product_search_form_view_stock_report',
    domain: "[['detailed_type', '=', 'product']]",
    context: {
      default_detailed_type: 'product'
    },
    views: {
      tree: 'product_product_stock_tree',
      form: '=======todo=========='
    }
  },

  stock_product_normal_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Variants',
    type: 'ir.actions.act_window',
    res_model: 'product.product',
    search_view_id: 'stock_product_search_form_view',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
