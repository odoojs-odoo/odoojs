export default {
  view_stock_product_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_product_tree_view',
    arch: {
      sheet: {
        type: {
          __todo__after: {
            qty_available: {
              attrs: {
                invisible: "[('type', '!=', 'product')]"
              }
            },
            virtual_available: {
              string: 'Forecasted Quantity',
              attrs: {
                invisible: "[('type', '!=', 'product')]"
              }
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
              domain: "[('qty_available', '>', 0)]"
            }
          },
          _filter_real_stock_negative: {
            _attr: {
              name: 'real_stock_negative',
              string: 'Negative Forecasted Quantity',
              domain: "[('virtual_available', '<', 0)]"
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
            name: 'activities_overdue'
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
          _button_action_update_quantity_on_hand: {
            _attr: {
              name: 'action_update_quantity_on_hand',
              string: 'Update Quantity',
              groups: 'stock.group_stock_manager',
              attrs: {
                invisible: "[('type', '!=', 'product')]"
              },
              type: 'object'
            }
          },
          _button_action_product_replenish: {
            _attr: {
              name: 'action_product_replenish',
              string: 'Replenish',
              groups: 'stock.group_stock_user',
              attrs: {
                invisible: "[('type', 'not in', ['consu', 'product'])]"
              },
              context: {
                default_product_id: 'todo===id'
              },
              type: 'action'
            }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_related_putaway_rules: {
            _attr: {
              name: 'action_view_related_putaway_rules',
              string: 'Putaway Rules',
              groups: 'stock.group_stock_multi_locations',
              attrs: {
                invisible: "[('type', '=', 'service')]"
              },
              context: {
                invisible_handle: true,
                single_product: true
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-random'
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
            _button_action_update_quantity_on_hand: {
              _attr: {
                name: 'action_update_quantity_on_hand',
                string: 'Update Quantity',
                groups: 'stock.group_stock_manager',
                attrs: {
                  invisible: "[('type', '!=', 'product')]"
                },
                type: 'object'
              }
            },
            _button_action_product_replenish: {
              _attr: {
                name: 'action_product_replenish',
                string: 'Replenish',
                groups: 'stock.group_stock_user',
                attrs: {
                  invisible: "[('type', 'not in', ['consu', 'product'])]"
                },
                context: {
                  default_product_id: 'todo===id'
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
                  attrs: {
                    invisible: "[('show_on_hand_qty_status_button', '=', False)]"
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
                    qty_available: {
                      widget: 'statinfo',
                      class: 'mr4'
                    },
                    uom_name: {}
                  },
                  _span_133: {
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
                  attrs: {
                    invisible: "[('show_forecasted_qty_status_button', '=', False)]"
                  },
                  context: {
                    default_product_id: 'todo===id'
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
                  _span_643: {
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
                  attrs: {
                    invisible: "[('type', 'not in', ['product', 'consu'])]"
                  },
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
                  _span_196: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Out:'
                    }
                  }
                },
                _div_387: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    nbr_moves_in: {}
                  },
                  _span_833: {
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
                  attrs: {
                    invisible: "['|', ('type', 'not in', ['product', 'consu']), ('nbr_reordering_rules', '!=', 1)]"
                  },
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
                  _span_708: {
                    _attr: {
                      class: 'o_stat_text',
                      text: 'Max:'
                    }
                  }
                },
                _div_149: {
                  _attr: {
                    class: 'o_field_widget o_stat_info'
                  },
                  _span: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_min_qty: {}
                  },
                  _span_326: {
                    _attr: {
                      class: 'o_stat_value'
                    },
                    reordering_max_qty: {}
                  }
                }
              },
              _button_action_view_orderpoints_920: {
                _attr: {
                  name: 'action_view_orderpoints',
                  attrs: {
                    invisible: "['|', ('type', '!=', 'product'), ('nbr_reordering_rules', '==', 1)]"
                  },
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
                  attrs: {
                    invisible: "[('tracking', '=', 'none')]"
                  },
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
                  attrs: {
                    invisible: "[('type', '=', 'service')]"
                  },
                  context: {
                    invisible_handle: true,
                    single_product: true
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
                  attrs: {
                    invisible: "[('type', '=', 'service')]"
                  },
                  class: 'oe_stat_button',
                  type: 'object',
                  icon: 'fa-cubes'
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
                text: "{'default_product_id': id}"
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
        categ_id: {},
        qty_available: {
          string: 'On Hand'
        },
        _button_action_view_inventory_tree: {
          _attr: {
            name: 'action_view_inventory_tree',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link',
            title: 'Inventory Adjustment',
            type: 'action',
            icon: 'fa-pencil'
          }
        },
        free_qty: {
          string: 'Free to Use'
        },
        incoming_qty: {},
        outgoing_qty: {},
        virtual_available: {
          string: 'Forecasted'
        },
        uom_id: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_create: true
        },
        _button_stock_move_line_action: {
          _attr: {
            name: 'stock_move_line_action',
            string: 'History',
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link',
            type: 'action',
            icon: 'fa-history'
          }
        },
        _button_action_view_orderpoints: {
          _attr: {
            name: 'action_view_orderpoints',
            string: 'Replenishment',
            context: {
              search_default_product_id: 'todo===id',
              is_stock_report: true
            },
            class: 'btn-link',
            type: 'object',
            icon: 'fa-refresh'
          }
        },
        _button_action_view_quants: {
          _attr: {
            name: 'action_view_quants',
            string: 'Locations',
            groups: 'stock.group_stock_multi_locations',
            attrs: {
              invisible: "[('qty_available', '=', 0)]"
            },
            context: {
              search_default_product_id: 'todo===id',
              default_product_id: 'todo===id'
            },
            class: 'btn-link',
            type: 'action',
            icon: 'fa-cubes'
          }
        },
        _button_action_product_forecast_report: {
          _attr: {
            name: 'action_product_forecast_report',
            string: 'Forecast',
            attrs: {
              invisible: "[('incoming_qty', '=', 0), ('outgoing_qty', '=', 0)]"
            },
            context: {
              default_product_id: 'todo===id'
            },
            class: 'btn-link',
            type: 'object',
            icon: 'fa-area-chart'
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
            name: 'services'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': 1}"
            }
          }
        },
        _filter_consumable: {
          _attr: {
            name: 'consumable'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': 1}"
            }
          }
        },
        _filter_real_stock_negative: {
          _attr: {
            name: 'real_stock_negative'
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
    search_view_id: 'product_search_form_view_stock_report',
    res_model: 'product.product',
    domain: "[('detailed_type', '=', 'product')]",
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
    search_view_id: 'stock_product_search_form_view',
    res_model: 'product.product',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
