export default {
  view_mrp_production_work_order_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'search',
    arch: {
      production_id: {},
      workcenter_id: {},
      product_id: {},
      _filter_ready: {
        _attr: {
          name: 'ready',
          string: 'Ready',
          domain: [['state', '=', 'ready']]
        }
      },
      _filter_waiting: {
        _attr: {
          name: 'waiting',
          string: 'Waiting',
          domain: [['state', '=', 'waiting']]
        }
      },
      _filter_pending: {
        _attr: {
          name: 'pending',
          string: 'Pending',
          domain: [['state', '=', 'pending']]
        }
      },
      _filter_progress: {
        _attr: {
          name: 'progress',
          string: 'In Progress',
          domain: [['state', '=', 'progress']]
        }
      },
      _filter_done: {
        _attr: {
          name: 'done',
          string: 'Done',
          domain: [['state', '=', 'done']]
        }
      },
      _filter_late: {
        _attr: {
          name: 'late',
          string: 'Late',
          domain: { todo_ctx: "[('date_planned_start','<=',time.strftime('%Y-%m-%d'))]" }
        }
      },
      _separator: {},
      _filter_date_start_filter: {
        _attr: {
          name: 'date_start_filter',
          string: 'Start Date',
          date: 'date_start'
        }
      },
      _group: {
        _attr: { string: 'Group By...' },
        _filter_workcenter: {
          _attr: {
            name: 'workcenter',
            string: 'Work center',
            domain: [],
            context: { group_by: 'workcenter_id' }
          }
        },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Product',
            domain: [],
            context: { group_by: 'product_id' }
          }
        }
      }
    }
  },

  action_mrp_routing_time: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_work_order_search',
    domain: "[['operation_id.bom_id', '=', active_id], ['state', '=', 'done']]",
    context: { search_default_done: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_mrp_workorder_production_specific: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'tooooooodoooooo',
    domain: "[['production_id', '=', active_id]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mrp_production_workorder_tree_editable_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'tree',
    arch: {
      sheet: {
        consumption: { invisible: '1' },
        company_id: { invisible: '1' },
        is_produced: { invisible: '1' },
        is_user_working: { invisible: '1' },
        product_uom_id: {
          invisible: '1',
          readonly: '0'
        },
        production_state: { invisible: '1' },
        production_bom_id: { invisible: '1' },
        qty_producing: { invisible: '1' },
        time_ids: { invisible: '1' },
        working_state: { invisible: '1' },
        operation_id: {
          invisible: '1',
          domain: { todo_ctx: "['|', ('bom_id', '=', production_bom_id), ('bom_id', '=', False)]" },
          context: { todo_ctx: "{'default_workcenter_id': workcenter_id, 'default_company_id': company_id}" }
        },
        name: { string: 'Operation' },
        workcenter_id: {},
        product_id: { optional: 'show' },
        qty_remaining: {
          string: 'Quantity',
          optional: 'show'
        },
        finished_lot_id: {
          string: 'Lot/Serial',
          optional: 'hide'
        },
        date_planned_start: { optional: 'show' },
        date_planned_finished: { optional: 'hide' },
        date_start: {
          readonly: '1',
          optional: 'hide'
        },
        date_finished: {
          readonly: '1',
          optional: 'hide'
        },
        duration_expected: { widget: 'float_time' },
        duration: {
          widget: 'mrp_timer',
          invisible: [['production_state', '=', 'draft']],
          readonly: [['is_user_working', '=', true]]
        },
        state: {
          widget: 'badge',
          invisible: [['production_state', '=', 'draft']],
          column_invisible: [['parent.state', '=', 'draft']]
        },
        _button_button_start: {
          _attr: {
            name: 'button_start',
            type: 'object',
            string: 'Start',
            invisible: ['|', '|', '|', ['production_state', 'in', ('draft', 'done', 'cancel')], ['working_state', '=', 'blocked'], ['state', 'in', ('done', 'cancel')], ['is_user_working', '!=', false]],
            class: 'btn-success'
          }
        },
        _button_button_pending: {
          _attr: {
            name: 'button_pending',
            type: 'object',
            string: 'Pause',
            invisible: ['|', '|', ['production_state', 'in', ('draft', 'done', 'cancel')], ['working_state', '=', 'blocked'], ['is_user_working', '=', false]],
            class: 'btn-warning'
          }
        },
        _button_button_finish: {
          _attr: {
            name: 'button_finish',
            type: 'object',
            string: 'Done',
            invisible: ['|', '|', ['production_state', 'in', ('draft', 'done', 'cancel')], ['working_state', '=', 'blocked'], ['is_user_working', '=', false]],
            class: 'btn-success'
          }
        },
        _button_mrp__act_mrp_block_workcenter_wo: {
          _attr: {
            name: 'mrp.act_mrp_block_workcenter_wo',
            type: 'action',
            string: 'Block',
            invisible: ['|', ['production_state', 'in', ('draft', 'done', 'cancel')], ['working_state', '=', 'blocked']],
            context: { todo_ctx: "{'default_workcenter_id': workcenter_id}" },
            class: 'btn-danger'
          }
        },
        _button_button_unblock: {
          _attr: {
            name: 'button_unblock',
            type: 'object',
            string: 'Unblock',
            invisible: ['|', ['production_state', 'in', ('draft', 'done', 'cancel')], ['working_state', '!=', 'blocked']],
            context: { todo_ctx: "{'default_workcenter_id': workcenter_id}" },
            class: 'btn-danger'
          }
        },
        _button_action_open_wizard: {
          _attr: {
            name: 'action_open_wizard',
            type: 'object',
            title: 'Open Work Order',
            icon: 'fa-external-link',
            context: { todo_ctx: "{'default_workcenter_id': workcenter_id}" },
            class: 'oe_edit_only'
          }
        },
        show_json_popover: { invisible: '1' },
        json_popover: {
          string: ' ',
          widget: 'mrp_workorder_popover',
          invisible: [['show_json_popover', '=', false]]
        }
      }
    }
  },

  mrp_production_workorder_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    inherit_id: 'mrp.mrp_production_workorder_tree_editable_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: '0',
              create: '0'
            }
          },
          _attribute_sample: {
            _attr: {
              name: 'sample',
              text: '1',
              sample: '1'
            }
          }
        },
        workcenter_id: {
          position: 'after',
          __todo__after: {
            production_id: {}
          }
        },
        state: {
          position: 'attributes',
          invisible: [['production_state', '=', 'draft']]
        }
      }
    }
  },

  mrp_production_workorder_form_view_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'form',
    arch: {
      header: {
        state: {
          widget: 'statusbar',
          statusbar_visible: 'pending,waiting,ready,progress,done'
        }
      },
      sheet: {
        is_user_working: { invisible: '1' },
        working_state: { invisible: '1' },
        production_state: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_see_move_scrap: {
            _attr: {
              name: 'action_see_move_scrap',
              type: 'object',
              icon: 'fa-arrows-v',
              invisible: [['scrap_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                scrap_count: {}
              },
              _span_326: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Scraps'
                }
              }
            }
          }
        },
        workcenter_id: { invisible: '1' },
        company_id: { invisible: '1' },
        product_tracking: { invisible: '1' },
        product_id: { invisible: '1' },
        finished_lot_id: { invisible: '1' },
        qty_producing: { invisible: '1' },
        _group: {
          _group: {
            _attr: { invisible: [['date_planned_start', '=', false]] },
            _label_date_planned_start: {
              for: 'date_planned_start',
              string: 'Planned Date'
            },
            _div: {
              _attr: { class: 'oe_inline' },
              is_planned: { invisible: '1' },
              date_planned_start: {
                required: [['is_planned', '=', true]],
                class: 'mr8 oe_inline'
              },
              _strong: {
                _attr: {
                  class: 'mr8 oe_inline',
                  text: 'to'
                }
              },
              date_planned_finished: {
                required: [['is_planned', '=', true]],
                class: 'oe_inline'
              },
              show_json_popover: { invisible: '1' },
              json_popover: {
                widget: 'mrp_workorder_popover',
                invisible: [['show_json_popover', '=', false]],
                class: 'oe_inline mx-2'
              }
            },
            _label_duration_expected: { for: 'duration_expected' },
            _div_574: {
              _attr: { class: 'o_row' },
              duration_expected: { widget: 'float_time' },
              _span: 'minutes'
            }
          },
          _group_771: {
            production_id: {}
          }
        },
        _notebook: {
          _page_components: {
            _attr: {
              name: 'components',
              string: 'Components'
            },
            move_raw_ids: {
              readonly: '1',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      state: { invisible: '1' },
                      product_type: { invisible: '1' },
                      product_id: {},
                      product_qty: { string: 'To Consume' },
                      reserved_availability: { string: 'Reserved' },
                      quantity_done: { string: 'Consumed' },
                      product_qty_available: {
                        string: 'On Hand',
                        invisible: [['product_type', '!=', 'product']]
                      },
                      product_virtual_available: {
                        string: 'Forecasted',
                        invisible: [['product_type', '!=', 'product']]
                      }
                    }
                  }
                }
              }
            }
          },
          _page_time_tracking: {
            _attr: {
              name: 'time_tracking',
              string: 'Time Tracking',
              groups: 'mrp.group_mrp_manager'
            },
            time_ids: {
              context: { todo_ctx: "{'default_workcenter_id': workcenter_id, 'default_workorder_id': id}" },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      user_id: {},
                      duration: { widget: 'float_time' },
                      date_start: {},
                      date_end: {},
                      workcenter_id: { invisible: '1' },
                      company_id: { invisible: '1' },
                      loss_id: {
                        string: 'Productivity',
                        optional: 'show'
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _group: {
                        _group: {
                          date_start: {},
                          date_end: {},
                          duration: { widget: 'float_time' },
                          company_id: { invisible: '1' }
                        },
                        _group_555: {
                          user_id: {},
                          workcenter_id: {},
                          company_id: { invisible: '1' },
                          loss_id: {}
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          _page_workorder_page_work_instruction: {
            _attr: {
              name: 'workorder_page_work_instruction',
              string: 'Work Instruction',
              invisible: [['worksheet', '=', false], ['worksheet_google_slide', '=', false], ['operation_note', '=', false]]
            },
            worksheet_type: { invisible: '1' },
            worksheet: {
              widget: 'pdf_viewer',
              invisible: [['worksheet_type', '!=', 'pdf']]
            },
            worksheet_google_slide: {
              widget: 'embed_viewer',
              invisible: [['worksheet_type', '!=', 'google_slide']]
            },
            operation_note: { invisible: [['worksheet_type', '!=', 'text']] }
          },
          allow_workorder_dependencies: { invisible: '1' },
          _page_dependencies: {
            _attr: {
              name: 'dependencies',
              string: 'Blocked By',
              invisible: [['allow_workorder_dependencies', '=', false]]
            },
            blocked_by_workorder_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      company_id: { invisible: '1' },
                      name: { string: 'Operation' },
                      _field_company_id_574: {
                        company_id: {
                          groups: 'base.group_multi_company',
                          optional: 'hide'
                        }
                      },
                      workcenter_id: {},
                      date_planned_start: { readonly: '1' },
                      date_planned_finished: { readonly: '1' },
                      duration_expected: { widget: 'float_time' },
                      production_state: { invisible: '1' },
                      state: {
                        widget: 'badge',
                        invisible: [['production_state', '=', 'draft']],
                        column_invisible: [['parent.state', '=', 'draft']]
                      },
                      _button_action_open_wizard: {
                        _attr: {
                          name: 'action_open_wizard',
                          type: 'object',
                          string: 'View WorkOrder',
                          class: 'oe_link float-end'
                        }
                      }
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

  view_mrp_production_workorder_form_view_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'search',
    arch: {
      name: { string: 'Work Order' },
      workcenter_id: {},
      production_id: {},
      product_id: {},
      _filter_progress: {
        _attr: {
          name: 'progress',
          string: 'In Progress',
          domain: [['state', '=', 'progress']]
        }
      },
      _filter_ready: {
        _attr: {
          name: 'ready',
          string: 'Ready',
          domain: [['state', '=', 'ready']]
        }
      },
      _filter_waiting: {
        _attr: {
          name: 'waiting',
          string: 'Waiting',
          domain: [['state', '=', 'waiting']]
        }
      },
      _filter_pending: {
        _attr: {
          name: 'pending',
          string: 'Pending',
          domain: [['state', '=', 'pending'], ['production_state', '!=', 'draft']]
        }
      },
      _filter_draft: {
        _attr: {
          name: 'draft',
          string: 'Draft',
          domain: [['state', '=', 'pending'], ['production_state', '=', 'draft']]
        }
      },
      _filter_finish: {
        _attr: {
          name: 'finish',
          string: 'Finished',
          domain: [['state', '=', 'done']]
        }
      },
      _separator: {},
      _filter_late: {
        _attr: {
          name: 'late',
          string: 'Late',
          help: 'Production started late',
          domain: { todo_ctx: "['&', ('date_planned_start', '<', current_date), ('state', '=', 'ready')]" }
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_work_center: {
          _attr: {
            name: 'work_center',
            string: 'Work Center',
            domain: [],
            context: { group_by: 'workcenter_id' }
          }
        },
        _filter_production: {
          _attr: {
            name: 'production',
            string: 'Manufacturing Order',
            domain: [],
            context: { group_by: 'production_id' }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: { group_by: 'state' }
          }
        },
        _filter_scheduled_month: {
          _attr: {
            name: 'scheduled_month',
            string: 'Scheduled Date',
            domain: [],
            context: { group_by: 'date_planned_start' }
          }
        }
      }
    }
  },

  workcenter_line_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  workcenter_line_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  workcenter_line_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  workcenter_line_gantt_production: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  mrp_workorder_view_gantt: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  workcenter_line_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  action_mrp_workorder_workcenter: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders Planning',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_workorder_form_view_filter',
    context: {
      search_default_work_center: true,
      search_default_ready: true,
      search_default_waiting: true,
      search_default_progress: true,
      search_default_pending: true
    },
    views: {
      tree: 'mrp_workorder_view_gantt',
      form: '=======todo=========='
    }
  },

  action_mrp_workorder_production: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders Planning',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_workorder_form_view_filter',
    domain: "[['production_state','not in',['done','cancel']]]",
    context: {
      search_default_production: true,
      search_default_ready: true,
      search_default_waiting: true,
      search_default_progress: true,
      search_default_pending: true
    },
    views: {
      tree: 'workcenter_line_gantt_production',
      form: '=======todo=========='
    }
  },

  mrp_workorder_mrp_production_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'mrp_production_workorder_form_view_inherit',
      form: '=======todo=========='
    }
  },

  mrp_workorder_todo: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_workorder_form_view_filter',
    context: {
      search_default_ready: true,
      search_default_progress: true,
      search_default_pending: true,
      search_default_waiting: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_workcenter_load_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  view_work_center_load_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workorder',
    type: 'otherview',
    arch: {}
  },

  action_mrp_workcenter_load_report_graph: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Center Loads',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_workcenter_load_pivot',
      form: '=======todo=========='
    }
  },

  action_mrp_workcenter_load_report_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'view_work_center_load_graph',
    act_window_id: 'action_mrp_workcenter_load_report_graph'
  },

  action_work_orders: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_work_order_search',
    domain: "[['state', 'not in', ['done', 'cancel']]]",
    context: { todo_ctx: "{'search_default_workcenter_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mrp_workorder_workcenter_report: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders Performance',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'tooooooodoooooo',
    domain: "[['workcenter_id','=', active_id],['state','=','done']]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mrp_workorder_report: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Orders',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workorder',
    search_view_id: 'view_mrp_production_work_order_search',
    domain: '[]',
    context: {
      search_default_workcenter: 1,
      search_default_ready: true,
      search_default_waiting: true,
      search_default_pending: true,
      search_default_progress: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
