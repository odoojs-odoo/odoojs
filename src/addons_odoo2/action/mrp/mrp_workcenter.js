export default {
  mrp_workcenter_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        sequence: { widget: 'handle' },
        name: { optional: 'show' },
        code: { optional: 'show' },
        tag_ids: {
          widget: 'many2many_tags',
          optional: 'show',
          no_create: true,
          color_field: 'color'
        },
        alternative_workcenter_ids: {
          widget: 'many2many_tags',
          optional: 'show'
        },
        productive_time: { optional: 'hide' },
        costs_hour: { optional: 'show' },
        default_capacity: { optional: 'show' },
        time_efficiency: { optional: 'show' },
        oee_target: { optional: 'show' },
        time_start: { optional: 'hide' },
        time_stop: { optional: 'hide' },
        _field_company_id_353: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'hide'
          }
        },
        active: { invisible: '1' }
      }
    }
  },

  mrp_workcenter_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter',
    type: 'otherview',
    arch: {}
  },

  mrp_workcenter_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter',
    type: 'otherview',
    arch: {}
  },

  mrp_workcenter_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          routing_line_ids: { invisible: '1' },
          _button_action_show_operations: {
            _attr: {
              name: 'action_show_operations',
              type: 'object',
              string: 'Operations',
              icon: 'fa-cog',
              invisible: [['routing_line_ids', '=', []]],
              context: { todo_ctx: "{'default_workcenter_id': active_id}" },
              class: 'oe_stat_button'
            }
          },
          _button_mrp_workcenter_productivity_report_oee: {
            _attr: {
              name: 'mrp_workcenter_productivity_report_oee',
              type: 'action',
              icon: 'fa-pie-chart',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_value',
                  text: '%'
                },
                oee: { widget: 'statinfo' }
              },
              _span_945: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'OEE'
                }
              }
            }
          },
          _button_mrp_workcenter_productivity_report_blocked: {
            _attr: {
              name: 'mrp_workcenter_productivity_report_blocked',
              type: 'action',
              icon: 'fa-bar-chart',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_value',
                  text: 'Hours'
                },
                blocked_time: { widget: 'statinfo' }
              },
              _span_482: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Lost'
                }
              }
            }
          },
          _button_action_mrp_workcenter_load_report_graph: {
            _attr: {
              name: 'action_mrp_workcenter_load_report_graph',
              type: 'action',
              icon: 'fa-bar-chart',
              context: {
                search_default_workcenter_id: 'todo===id',
                search_default_ready: true,
                search_default_waiting: true,
                search_default_pending: true,
                search_default_progress: true
              },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_value',
                  text: 'Minutes'
                },
                workcenter_load: { widget: 'statinfo' }
              },
              _span_168: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Load'
                }
              }
            }
          },
          _button_mrp_workorder_report: {
            _attr: {
              name: 'mrp_workorder_report',
              type: 'action',
              icon: 'fa-bar-chart',
              context: {
                search_default_workcenter_id: 'todo===id',
                search_default_thisyear: true
              },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_value',
                  text: '%'
                },
                performance: { widget: 'statinfo' }
              },
              _span_471: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Performance'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group: {
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            name: {
              string: 'Work Center Name',
              required: 'True'
            },
            tag_ids: {
              widget: 'many2many_tags',
              color_field: 'color'
            },
            alternative_workcenter_ids: { widget: 'many2many_tags' }
          },
          _group_145: {
            code: {},
            resource_calendar_id: { required: '1' },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          }
        },
        _notebook: {
          _page_general_info: {
            _attr: {
              name: 'general_info',
              string: 'General Information'
            },
            _group: {
              _group_capacity: {
                _attr: {
                  name: 'capacity',
                  string: 'Production Information'
                },
                _label_time_efficiency: { for: 'time_efficiency' },
                _div: {
                  _attr: {
                    class: 'o_row',
                    text: '%'
                  },
                  time_efficiency: {}
                },
                default_capacity: {},
                _label_oee_target: { for: 'oee_target' },
                _div_789: {
                  _attr: {
                    class: 'o_row',
                    text: '%'
                  },
                  oee_target: {}
                }
              },
              _group_costing: {
                _attr: {
                  name: 'costing',
                  string: 'Costing Information'
                },
                _label_costs_hour: { for: 'costs_hour' },
                _div: {
                  _attr: {
                    id: 'costs_hour',
                    text: 'per workcenter'
                  },
                  costs_hour: {
                    widget: 'monetary',
                    class: 'oe_inline'
                  }
                }
              },
              _group: {
                _label_time_start: { for: 'time_start' },
                _div: {
                  _attr: { text: 'minutes' },
                  time_start: {
                    widget: 'float_time',
                    class: 'oe_inline'
                  }
                },
                _label_time_stop: { for: 'time_stop' },
                _div_497: {
                  _attr: { text: 'minutes' },
                  time_stop: {
                    widget: 'float_time',
                    class: 'oe_inline'
                  }
                }
              }
            },
            _separator: {
              _attr: { string: 'Description' }
            },
            note: { placeholder: 'Description of the work center...' }
          },
          _page_capacity: {
            _attr: {
              name: 'capacity',
              string: 'Specific Capacities'
            },
            capacity_ids: {
              context: { default_workcenter_id: 'todo===id' },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      product_id: {},
                      product_uom_id: { groups: 'uom.group_uom' },
                      capacity: {},
                      time_start: { optional: 'hide' },
                      time_stop: { optional: 'hide' }
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

  view_mrp_workcenter_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter',
    type: 'search',
    arch: {
      name: {
        string: 'Work Center',
        filter_domain: { todo_ctx: "['|', ('name', 'ilike', self), ('code', 'ilike', self)]" }
      },
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By...' },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        }
      }
    }
  },

  mrp_workcenter_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Centers',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter',
    search_view_id: 'view_mrp_workcenter_search',
    views: {
      tree: 'mrp_workcenter_tree_view',
      form: '=======todo=========='
    }
  },

  mrp_workcenter_kanban_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Work Centers Overview',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter',
    search_view_id: 'view_mrp_workcenter_search',
    views: {
      tree: 'mrp_workcenter_kanban',
      form: '=======todo=========='
    }
  }
}
