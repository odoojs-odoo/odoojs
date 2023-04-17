export default {
  view_stock_warehouse_orderpoint_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    type: 'otherview',
    arch: {}
  },

  view_warehouse_orderpoint_tree_editable: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    type: 'tree',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        product_category_id: {
          invisible: '1'
        },
        product_tmpl_id: {
          invisible: '1'
        },
        product_id: {
          attrs: {
            readonly: "[('product_id', '!=', False)]"
          },
          force_save: '1'
        },
        location_id: {
          groups: 'stock.group_stock_multi_locations',
          no_create: true
        },
        warehouse_id: {
          groups: 'stock.group_stock_multi_warehouses',
          no_create: true
        },
        qty_on_hand: {
          force_save: '1'
        },
        qty_forecast: {
          force_save: '1'
        },
        _button_action_product_forecast_report: {
          _attr: {
            name: 'action_product_forecast_report',
            attrs: {
              invisible: "[('id', '=', False)]"
            },
            title: 'Forecast Report',
            type: 'object',
            icon: 'fa-area-chart'
          }
        },
        visibility_days: {},
        route_id: {
          no_create: true,
          no_open: true
        },
        _button_action_stock_replenishment_info: {
          _attr: {
            name: 'action_stock_replenishment_info',
            attrs: {
              invisible: "[('id', '=', False)]"
            },
            title: 'Replenishment Information',
            type: 'object',
            icon: 'fa-info-circle'
          }
        },
        trigger: {},
        group_id: {
          groups: 'stock.group_adv_location'
        },
        product_min_qty: {},
        product_max_qty: {},
        qty_multiple: {},
        qty_to_order: {},
        product_uom_name: {
          string: 'UoM',
          groups: 'uom.group_uom'
        },
        _field_company_id_567: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        },
        _button_action_replenish: {
          _attr: {
            name: 'action_replenish',
            string: 'Order Once',
            attrs: {
              invisible: "[('qty_to_order', '<=', 0.0)]"
            },
            class: 'o_replenish_buttons',
            type: 'object',
            icon: 'fa-truck'
          }
        },
        _button_action_replenish_auto: {
          _attr: {
            name: 'action_replenish_auto',
            string: 'Automate Orders',
            attrs: {
              invisible: "['|', ('qty_to_order', '<=', 0.0), ('trigger', '=', 'auto')]"
            },
            class: 'o_replenish_buttons',
            type: 'object',
            icon: 'fa-refresh'
          }
        },
        _button_action_orderpoint_snooze: {
          _attr: {
            name: 'action_orderpoint_snooze',
            string: 'Snooze',
            attrs: {
              invisible: "[('trigger', '!=', 'manual')]"
            },
            context: {
              default_orderpoint_ids: "[<built-in function id>]"
            },
            class: 'text-warning',
            type: 'action',
            icon: 'fa-bell-slash'
          }
        }
      }
    }
  },

  stock_reorder_report_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    type: 'search',
    arch: {
      name: {
        string: 'Reordering Rule'
      },
      product_id: {},
      trigger: {},
      product_category_id: {},
      group_id: {
        groups: 'stock.group_adv_location'
      },
      warehouse_id: {
        groups: 'stock.group_stock_multi_warehouses'
      },
      location_id: {
        groups: 'stock.group_stock_multi_locations'
      },
      _filter_filter_creation_trigger: {
        _attr: {
          name: 'filter_creation_trigger',
          string: 'Trigger Manual',
          domain: "[('trigger', '=', 'manual')]"
        }
      },
      _separator: {},
      _filter_filter_to_reorder: {
        _attr: {
          name: 'filter_to_reorder',
          string: 'To Reorder',
          domain: "[('qty_to_order', '>', 0.0)]"
        }
      },
      _separator_691: {},
      _filter_filter_not_snoozed: {
        _attr: {
          name: 'filter_not_snoozed',
          string: 'Not Snoozed',
          domain: {
            todo_ctx: "['|', ('snoozed_until', '=', False), ('snoozed_until', '<=', datetime.date.today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_groupby_warehouse: {
          _attr: {
            name: 'groupby_warehouse',
            string: 'Warehouse',
            groups: 'stock.group_stock_multi_warehouses',
            domain: [],
            context: {
              group_by: 'warehouse_id'
            }
          }
        },
        _filter_groupby_location: {
          _attr: {
            name: 'groupby_location',
            string: 'Location',
            groups: 'stock.group_stock_multi_locations',
            domain: [],
            context: {
              group_by: 'location_id'
            }
          }
        },
        _filter_groupby_product: {
          _attr: {
            name: 'groupby_product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        },
        _filter_groupby_category: {
          _attr: {
            name: 'groupby_category',
            string: 'Category',
            domain: [],
            context: {
              group_by: 'product_category_id'
            }
          }
        }
      },
      _searchpanel: {
        location_id: {
          string: 'Locations',
          groups: 'stock.group_stock_multi_locations'
        },
        trigger: {
          string: 'Trigger'
        }
      }
    }
  },

  warehouse_orderpoint_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    type: 'search',
    arch: {
      name: {
        string: 'Reordering Rule'
      },
      product_id: {},
      trigger: {},
      group_id: {
        groups: 'stock.group_adv_location'
      },
      warehouse_id: {
        groups: 'stock.group_stock_multi_warehouses'
      },
      location_id: {
        groups: 'stock.group_stock_multi_locations'
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_warehouse: {
          _attr: {
            name: 'warehouse',
            string: 'Warehouse',
            groups: 'stock.group_stock_multi_warehouses',
            domain: [],
            context: {
              group_by: 'warehouse_id'
            }
          }
        },
        _filter_location: {
          _attr: {
            name: 'location',
            string: 'Location',
            groups: 'stock.group_stock_multi_locations',
            domain: [],
            context: {
              group_by: 'location_id'
            }
          }
        },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        }
      }
    }
  },

  view_warehouse_orderpoint_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.warehouse.orderpoint',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'alert alert-info'
          },
          _a_action_procurement_compute: {
            _attr: {
              name: '%(action_procurement_compute)d',
              class: 'alert-link o_form_uri',
              type: 'action',
              text: 'Run the scheduler'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            attrs: {
              invisible: "[('active', '=', True)]"
            },
            title: 'Archived'
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {}
          }
        },
        _group: {
          _group: {
            active: {
              invisible: '1'
            },
            company_id: {
              invisible: '1'
            },
            route_id: {
              invisible: '1'
            },
            product_id: {},
            _label_product_min_qty: {
              for: 'product_min_qty'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              product_min_qty: {},
              product_uom_name: {},
              _button_ock__action_stock_replenishment_in: {
                _attr: {
                  name: 'ock.action_stock_replenishment_in',
                  string: 'Forecast Description',
                  attrs: {
                    invisible: "[('id', '=', False)]"
                  },
                  type: 'action',
                  icon: 'fa-area-chart'
                }
              }
            },
            _label_product_max_qty: {
              for: 'product_max_qty'
            },
            _div_129: {
              _attr: {
                class: 'o_row'
              },
              product_max_qty: {},
              product_uom_name: {}
            },
            qty_multiple: {
              string: 'Quantity Multiple'
            }
          },
          _group_532: {
            allowed_location_ids: {
              invisible: '1'
            },
            warehouse_id: {
              groups: 'stock.group_stock_multi_locations',
              no_open: true,
              no_create: true
            },
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              domain: {
                todo_ctx: "[('id', 'in', allowed_location_ids)]"
              },
              no_create: true
            },
            _label_group_id: {
              for: 'group_id',
              groups: 'base.group_no_one'
            },
            _div: {
              _attr: {
                groups: 'base.group_no_one'
              },
              group_id: {
                groups: 'stock.group_adv_location'
              }
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            visibility_days: {}
          }
        }
      }
    }
  },

  action_orderpoint_replenish: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Replenishment',
    type: 'ir.actions.act_window',
    search_view_id: 'stock_reorder_report_search',
    res_model: 'stock.warehouse.orderpoint',
    views: {
      tree: 'view_warehouse_orderpoint_tree_editable',
      form: '=======todo=========='
    }
  },

  action_orderpoint: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reordering Rules',
    type: 'ir.actions.act_window',
    search_view_id: 'warehouse_orderpoint_search',
    res_model: 'stock.warehouse.orderpoint',
    context: {
      search_default_trigger: 'auto'
    },
    views: {
      tree: 'view_warehouse_orderpoint_tree_editable',
      form: '=======todo=========='
    }
  }
}