export default {
  view_move_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'otherview',
    arch: {}
  },

  view_move_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'otherview',
    arch: {}
  },

  view_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'tree',
    arch: {
      sheet: {
        date: {
          groups: 'base.group_no_one'
        },
        reference: {},
        picking_type_id: {
          invisible: '1'
        },
        location_usage: {
          invisible: '1'
        },
        location_dest_usage: {
          invisible: '1'
        },
        product_id: {},
        location_id: {
          string: 'From',
          no_create: true
        },
        location_dest_id: {
          string: 'To',
          no_create: true
        },
        product_packaging_id: {
          groups: 'product.group_stock_packaging'
        },
        product_uom_qty: {
          string: 'Quantity'
        },
        product_uom: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        company_id: {
          groups: 'base.group_multi_company'
        },
        state: {
          widget: 'badge'
        }
      }
    }
  },

  view_picking_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        name: {
          invisible: '1'
        },
        date: {
          invisible: '1'
        },
        state: {
          invisible: '1'
        },
        picking_type_id: {
          invisible: '1'
        },
        location_id: {
          invisible: '1'
        },
        location_dest_id: {
          invisible: '1'
        },
        scrapped: {
          invisible: '1'
        },
        picking_code: {
          invisible: '1'
        },
        product_type: {
          invisible: '1'
        },
        show_details_visible: {
          invisible: '1'
        },
        show_reserved_availability: {
          invisible: '1'
        },
        show_operations: {
          invisible: '1'
        },
        additional: {
          invisible: '1'
        },
        move_lines_count: {
          invisible: '1'
        },
        is_locked: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        product_id: {
          attrs: {
            readonly: "['|', '&', ('state', '!=', 'draft'), ('additional', '=', False), ('move_lines_count', '>', 0)]"
          }
        },
        is_initial_demand_editable: {
          invisible: '1'
        },
        is_quantity_done_editable: {
          invisible: '1'
        },
        product_uom_qty: {
          string: 'Demand',
          attrs: {
            readonly: "[('is_initial_demand_editable', '=', False)]"
          }
        },
        reserved_availability: {
          string: 'Reserved'
        },
        quantity_done: {
          string: 'Done',
          attrs: {
            readonly: "[('is_quantity_done_editable', '=', False)]"
          }
        },
        product_uom: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          attrs: {
            readonly: "[('state', '!=', 'draft'), ('id', '!=', False)]"
          },
          no_open: true,
          no_create: true
        }
      }
    }
  },

  view_move_kandan: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'otherview',
    arch: {}
  },

  view_stock_move_operations: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'form',
    arch: {
      sheet: {
        sequence: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        state: {
          invisible: '1'
        },
        location_id: {
          invisible: '1'
        },
        location_dest_id: {
          invisible: '1'
        },
        picking_id: {
          invisible: '1'
        },
        picking_type_id: {
          invisible: '1'
        },
        is_locked: {
          invisible: '1'
        },
        picking_type_entire_packs: {
          invisible: '1'
        },
        display_assign_serial: {
          invisible: '1'
        },
        from_immediate_transfer: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        display_clear_serial: {
          invisible: '1'
        },
        _group: {
          _group: {
            product_id: {},
            _label_product_uom_qty: {
              for: 'product_uom_qty',
              attrs: {
                invisible: "[('from_immediate_transfer', '=', True)]"
              }
            },
            _div: {
              _attr: {
                attrs: {
                  invisible: "[('from_immediate_transfer', '=', True)]"
                },
                class: 'o_row'
              },
              _span: {
                product_uom_qty: {}
              },
              _span_949: {
                product_uom: {}
              }
            },
            _label_quantity_done: {
              for: 'quantity_done'
            },
            _div_765: {
              _attr: {
                class: 'o_row'
              },
              _span: {
                quantity_done: {}
              },
              _span_862: {
                _attr: {
                  attrs: {
                    invisible: "['|', ('state', '=', 'done'), ('from_immediate_transfer', '=', True)]"
                  },
                  text: '/'
                }
              },
              _span_553: {
                reserved_availability: {
                  attrs: {
                    invisible: "['|', ('state', '=', 'done'), ('from_immediate_transfer', '=', True)]"
                  }
                }
              },
              _span_784: {
                product_uom: {
                  attrs: {
                    invisible: "[('from_immediate_transfer', '=', True)]"
                  }
                }
              }
            },
            next_serial: {
              attrs: {
                invisible: "[('display_assign_serial', '=', False)]"
              }
            },
            _label_next_serial_count: {
              for: 'next_serial_count',
              attrs: {
                invisible: "[('display_assign_serial', '=', False)]"
              }
            },
            _div_683: {
              _attr: {
                attrs: {
                  invisible: "[('display_assign_serial', '=', False)]"
                },
                class: 'o_row'
              },
              _span: {
                next_serial_count: {}
              },
              _button_action_assign_serial_show_details: {
                _attr: {
                  name: 'action_assign_serial_show_details',
                  class: 'btn-link',
                  title: 'Assign Serial Numbers',
                  type: 'object'
                },
                _span: 'Assign Serial Numbers'
              },
              _button_action_clear_lines_show_details: {
                _attr: {
                  name: 'action_clear_lines_show_details',
                  attrs: {
                    invisible: "[('display_clear_serial', '=', False)]"
                  },
                  class: 'btn-link',
                  title: 'Clear Lines',
                  type: 'object'
                },
                _span: 'Clear All'
              }
            }
          }
        },
        move_line_ids: {
          attrs: {
            readonly: "['|', ('state', '=', 'cancel'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]"
          },
          context: {
            todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_operation_tree', 'default_product_uom_id': product_uom, 'default_picking_id': picking_id, 'default_move_id': id, 'default_product_id': product_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
          }
        },
        _footer: {
          _attr: {
            attrs: {
              invisible: "['|', ('state', '=', 'cancel'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]"
            },
            class: 'oe_edit_only'
          },
          _button: {
            _attr: {
              string: 'Confirm',
              class: 'oe_highlight'
            }
          },
          _button_917: {
            _attr: {
              string: 'Discard'
            }
          }
        },
        _footer_394: {
          _attr: {
            attrs: {
              invisible: "['|', '&', ('state', '!=', 'cancel'), ('state', '!=', 'done'), '&', ('state', '=', 'done'), ('is_locked', '!=', True)]"
            },
            class: 'oe_edit_only'
          },
          _button: {
            _attr: {
              string: 'Close'
            }
          }
        }
      }
    }
  },

  view_stock_move_nosuggest_operations: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    inherit_id: 'stock.view_stock_move_operations',
    arch: {
      sheet: {
        move_line_ids: {
          __todo__replace: {
            move_line_nosuggest_ids: {
              attrs: {
                readonly: "['|', ('state', '=', 'cancel'), '&', ('state', '=', 'done'), ('is_locked', '=', True)]"
              },
              context: {
                todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_operation_tree','default_picking_id': picking_id, 'default_move_id': id, 'default_product_id': product_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
              }
            }
          }
        }
      }
    }
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        _header: {
          state: {
            widget: 'statusbar'
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        _group: {
          _group_main_grp: {
            _attr: {
              name: 'main_grp'
            },
            _group_main_grp_col1: {
              _attr: {
                name: 'main_grp_col1'
              },
              reference: {},
              location_id: {
                no_create: true
              },
              location_dest_id: {
                no_create: true
              },
              company_id: {
                groups: 'base.group_multi_company'
              }
            },
            _group_main_grp_col2: {
              _attr: {
                name: 'main_grp_col2'
              },
              product_id: {},
              product_uom_category_id: {
                invisible: '1'
              },
              _label_product_uom_qty: {
                for: 'product_uom_qty'
              },
              _div: {
                _attr: {
                  class: 'o_row'
                },
                product_uom_qty: {},
                product_uom: {
                  groups: 'uom.group_uom',
                  no_open: true,
                  no_create: true
                }
              },
              name: {
                invisible: '1'
              },
              _div_649: {
                _attr: {
                  class: 'o_td_label'
                },
                _label_date: {
                  for: 'date',
                  string: 'Date Scheduled',
                  attrs: {
                    invisible: "[('state', '=', 'done')]"
                  }
                },
                _label_date_878: {
                  for: 'date',
                  string: 'Date Processing',
                  attrs: {
                    invisible: "[('state', '!=', 'done')]"
                  }
                }
              },
              date: {},
              date_deadline: {
                force_save: '1'
              }
            }
          },
          _group_origin_grp: {
            _attr: {
              name: 'origin_grp',
              string: 'Origin',
              groups: 'base.group_no_one'
            },
            origin: {},
            group_id: {},
            procure_method: {
              groups: 'stock.group_adv_location',
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              }
            }
          },
          _group_linked_group: {
            _attr: {
              name: 'linked_group',
              string: 'Linked Moves',
              groups: 'base.group_no_one'
            },
            move_orig_ids: {
              string: 'Origin Moves',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
                    }
                  }
                }
              }
            },
            move_dest_ids: {
              string: 'Destination Moves',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_move_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'search',
    arch: {
      name: {
        string: 'Location',
        groups: 'stock.group_stock_multi_locations'
      },
      product_id: {},
      origin: {
        string: 'Reference'
      },
      location_id: {
        string: 'Source Location',
        groups: 'stock.group_stock_multi_locations'
      },
      location_dest_id: {
        string: 'Destination Location',
        groups: 'stock.group_stock_multi_locations'
      },
      partner_id: {
        string: 'Partner'
      },
      _filter_ready: {
        _attr: {
          name: 'ready',
          string: 'Ready',
          domain: "[('state', '=', 'assigned')]"
        }
      },
      _filter_future: {
        _attr: {
          name: 'future',
          string: 'To Do',
          domain: "[('state', 'in', ('assigned', 'confirmed', 'waiting'))]"
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          domain: "[('state', '=', 'done')]"
        }
      },
      _separator: {},
      _filter_incoming: {
        _attr: {
          name: 'incoming',
          string: 'Incoming',
          domain: "[('location_id.usage', 'not in', ('internal', 'transit')), ('location_dest_id.usage', 'in', ('internal', 'transit'))]"
        }
      },
      _filter_outgoing: {
        _attr: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: "[('location_id.usage', 'in', ('internal', 'transit')), ('location_dest_id.usage', 'not in', ('internal', 'transit'))]"
        }
      },
      _filter_inventory: {
        _attr: {
          name: 'inventory',
          string: 'Inventory',
          domain: "[('is_inventory', '=', True)]"
        }
      },
      _separator_940: {},
      _filter_today: {
        _attr: {
          name: 'today',
          string: 'Date'
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_by_product: {
          _attr: {
            name: 'by_product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        },
        _filter_groupby_picking_id: {
          _attr: {
            name: 'groupby_picking_id',
            string: 'Picking',
            domain: [],
            context: {
              group_by: 'picking_id'
            }
          }
        },
        _filter_groupby_location_id: {
          _attr: {
            name: 'groupby_location_id',
            string: 'Source Location',
            groups: 'stock.group_stock_multi_locations',
            domain: [],
            context: {
              group_by: 'location_id'
            }
          }
        },
        _filter_groupby_dest_location_id: {
          _attr: {
            name: 'groupby_dest_location_id',
            string: 'Destination Location',
            groups: 'stock.group_stock_multi_locations',
            domain: [],
            context: {
              group_by: 'location_dest_id'
            }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_groupby_create_date: {
          _attr: {
            name: 'groupby_create_date',
            string: 'Creation Date',
            groups: 'base.group_no_one',
            domain: [],
            context: {
              group_by: 'create_date'
            }
          }
        },
        _filter_groupby_date: {
          _attr: {
            name: 'groupby_date',
            string: 'Scheduled Date',
            domain: [],
            context: {
              group_by: 'date'
            }
          }
        }
      }
    }
  },

  stock_move_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Moves',
    type: 'ir.actions.act_window',
    search_view_id: 'view_move_search',
    res_model: 'stock.move',
    context: {
      search_default_done: 1
    },
    views: {
      tree: 'view_move_tree',
      form: '=======todo=========='
    }
  },

  action_stock_move_tree_all: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_move_tree',
    act_window_id: 'stock_move_action'
  },

  action_stock_move_form_all: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_move_form',
    act_window_id: 'stock_move_action'
  },

  action_stock_move_pivot_all: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'view_move_pivot',
    act_window_id: 'stock_move_action'
  },

  action_stock_move_graph_all: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'view_move_graph',
    act_window_id: 'stock_move_action'
  },

  action_stock_move_kanban_all: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'view_move_kandan',
    act_window_id: 'stock_move_action'
  },

  view_move_tree_receipt_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'tree',
    arch: {
      sheet: {
        date: {
          invisible: '1'
        },
        date_deadline: {},
        picking_id: {
          string: 'Reference',
          invisible: '1'
        },
        sequence: {
          invisible: '1'
        },
        origin: {},
        product_id: {},
        product_uom_qty: {},
        product_uom: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        location_id: {
          invisible: '1',
          no_create: true
        },
        location_dest_id: {
          invisible: '1'
        },
        state: {},
        company_id: {
          invisible: '1'
        }
      }
    }
  }
}
