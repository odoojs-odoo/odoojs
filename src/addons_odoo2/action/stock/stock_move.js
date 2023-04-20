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
          groups: 'product.group_stock_packaging',
          optional: 'hide'
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
          widget: 'badge',
          optional: 'show'
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
          invisible: '1',
          readonly: '0'
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
          invisible: '1',
          readonly: '1'
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
          readonly: ['|', '&', ['state', '!=', 'draft'], ['additional', '=', false], ['move_lines_count', '>', 0]],
          required: '1'
        },
        is_initial_demand_editable: {
          invisible: '1'
        },
        is_quantity_done_editable: {
          invisible: '1'
        },
        product_uom_qty: {
          string: 'Demand',
          readonly: [['is_initial_demand_editable', '=', false]]
        },
        reserved_availability: {
          string: 'Reserved'
        },
        quantity_done: {
          string: 'Done',
          readonly: [['is_quantity_done_editable', '=', false]]
        },
        product_uom: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom',
          readonly: [['state', '!=', 'draft'], ['id', '!=', false]],
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
            product_id: {
              readonly: '1'
            },
            _label_product_uom_qty: {
              for: 'product_uom_qty',
              invisible: [['from_immediate_transfer', '=', true]]
            },
            _div: {
              _attr: {
                invisible: [['from_immediate_transfer', '=', true]],
                class: 'o_row'
              },
              _span: {
                product_uom_qty: {
                  readonly: '1'
                }
              },
              _span_408: {
                product_uom: {
                  readonly: '1'
                }
              }
            },
            _label_quantity_done: {
              for: 'quantity_done'
            },
            _div_753: {
              _attr: {
                class: 'o_row'
              },
              _span: {
                quantity_done: {
                  readonly: '1'
                }
              },
              _span_785: {
                _attr: {
                  invisible: ['|', ['state', '=', 'done'], ['from_immediate_transfer', '=', true]],
                  text: '/'
                }
              },
              _span_686: {
                reserved_availability: {
                  invisible: ['|', ['state', '=', 'done'], ['from_immediate_transfer', '=', true]]
                }
              },
              _span_185: {
                product_uom: {
                  invisible: [['from_immediate_transfer', '=', true]],
                  readonly: '1'
                }
              }
            },
            next_serial: {
              invisible: [['display_assign_serial', '=', false]]
            },
            _label_next_serial_count: {
              for: 'next_serial_count',
              invisible: [['display_assign_serial', '=', false]]
            },
            _div_471: {
              _attr: {
                invisible: [['display_assign_serial', '=', false]],
                class: 'o_row'
              },
              _span: {
                next_serial_count: {}
              },
              _button_action_assign_serial_show_details: {
                _attr: {
                  name: 'action_assign_serial_show_details',
                  type: 'object',
                  title: 'Assign Serial Numbers',
                  class: 'btn-link'
                },
                _span: 'Assign Serial Numbers'
              },
              _button_action_clear_lines_show_details: {
                _attr: {
                  name: 'action_clear_lines_show_details',
                  type: 'object',
                  title: 'Clear Lines',
                  invisible: [['display_clear_serial', '=', false]],
                  class: 'btn-link'
                },
                _span: 'Clear All'
              }
            }
          }
        },
        move_line_ids: {
          readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
          context: {
            todo_ctx: "{'tree_view_ref': 'stock.view_stock_move_line_operation_tree', 'default_product_uom_id': product_uom, 'default_picking_id': picking_id, 'default_move_id': id, 'default_product_id': product_id, 'default_location_id': location_id, 'default_location_dest_id': location_dest_id, 'default_company_id': company_id}"
          }
        },
        _footer: {
          _attr: {
            invisible: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
            class: 'oe_edit_only'
          },
          _button: {
            _attr: {
              string: 'Confirm',
              class: 'oe_highlight'
            }
          },
          _button_505: {
            _attr: {
              string: 'Discard'
            }
          }
        },
        _footer_669: {
          _attr: {
            invisible: ['|', '&', ['state', '!=', 'cancel'], ['state', '!=', 'done'], '&', ['state', '=', 'done'], ['is_locked', '!=', true]],
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
          position: 'replace',
          __todo__replace: {
            move_line_nosuggest_ids: {
              readonly: ['|', ['state', '=', 'cancel'], '&', ['state', '=', 'done'], ['is_locked', '=', true]],
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
      header: {
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,confirmed,assigned,done'
        }
      },
      sheet: {
        company_id: {
          invisible: '1'
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
              _div_663: {
                _attr: {
                  class: 'o_td_label'
                },
                _label_date: {
                  for: 'date',
                  string: 'Date Scheduled',
                  invisible: [['state', '=', 'done']]
                },
                _label_date_622: {
                  for: 'date',
                  string: 'Date Processing',
                  invisible: [['state', '!=', 'done']]
                }
              },
              date: {
                readonly: '1'
              },
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
              readonly: [['state', '!=', 'draft']]
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
              readonly: '1',
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
              readonly: '1',
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
        groups: 'stock.group_stock_multi_locations',
        filter_domain: {
          todo_ctx: "['|',('location_id', 'ilike', self),('location_dest_id', 'ilike', self)]"
        }
      },
      product_id: {},
      origin: {
        string: 'Reference',
        filter_domain: {
          todo_ctx: "['|', '|', ('origin', 'ilike', self), ('name', 'ilike', self), ('picking_id', 'ilike', self)]"
        }
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
        string: 'Partner',
        filter_domain: {
          todo_ctx: "[('picking_id.partner_id', 'child_of', self)]"
        }
      },
      _filter_ready: {
        _attr: {
          name: 'ready',
          string: 'Ready',
          help: 'Stock moves that are Available (Ready to process)',
          domain: [['state', '=', 'assigned']]
        }
      },
      _filter_future: {
        _attr: {
          name: 'future',
          string: 'To Do',
          help: 'Stock moves that are Confirmed, Available or Waiting',
          domain: [['state', 'in', ('assigned', 'confirmed', 'waiting')]]
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          help: 'Stock moves that have been processed',
          domain: [['state', '=', 'done']]
        }
      },
      _separator: {},
      _filter_incoming: {
        _attr: {
          name: 'incoming',
          string: 'Incoming',
          domain: [['location_id.usage', 'not in', ('internal', 'transit')], ['location_dest_id.usage', 'in', ('internal', 'transit')]]
        }
      },
      _filter_outgoing: {
        _attr: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: [['location_id.usage', 'in', ('internal', 'transit')], ['location_dest_id.usage', 'not in', ('internal', 'transit')]]
        }
      },
      _filter_inventory: {
        _attr: {
          name: 'inventory',
          string: 'Inventory',
          domain: [['is_inventory', '=', true]]
        }
      },
      _separator_448: {},
      _filter_today: {
        _attr: {
          name: 'today',
          string: 'Date',
          date: 'date',
          help: 'Scheduled or processing date'
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
    res_model: 'stock.move',
    search_view_id: 'view_move_search',
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
        date_deadline: {
          optional: 'hide'
        },
        picking_id: {
          string: 'Reference',
          invisible: '1'
        },
        sequence: {
          invisible: '1'
        },
        origin: {
          optional: 'show'
        },
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
        state: {
          optional: 'show'
        },
        company_id: {
          invisible: '1'
        }
      }
    }
  }
}
