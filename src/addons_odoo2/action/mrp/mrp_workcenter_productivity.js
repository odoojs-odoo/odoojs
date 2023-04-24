export default {
  oee_pie_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'otherview',
    arch: {}
  },

  mrp_workcenter_productivity_report_oee: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Overall Equipment Effectiveness',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter.productivity',
    search_view_id: 'tooooooodoooooo',
    domain: "[['workcenter_id','=',active_id]]",
    context: { search_default_thismonth: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mrp_workcenter_productivity_report_blocked: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Productivity Losses',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter.productivity',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'search_default_availability': '1',\n                                   'search_default_performance': '1',\n                                   'search_default_quality': '1',\n                                   'default_workcenter_id': active_id,\n                                   'search_default_workcenter_id': [active_id]}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  oee_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'search',
    arch: {
      workcenter_id: {},
      loss_id: {},
      _separator: {},
      _filter_availability: {
        _attr: {
          name: 'availability',
          string: 'Availability Losses',
          domain: [['loss_type', '=', 'availability']]
        }
      },
      _filter_performance: {
        _attr: {
          name: 'performance',
          string: 'Performance Losses',
          domain: [['loss_type', '=', 'performance']]
        }
      },
      _filter_quality: {
        _attr: {
          name: 'quality',
          string: 'Quality Losses',
          domain: [['loss_type', '=', 'quality']]
        }
      },
      _filter_productive: {
        _attr: {
          name: 'productive',
          string: 'Fully Productive',
          domain: [['loss_type', '=', 'productive']]
        }
      },
      _filter_filter_date_start: {
        _attr: {
          name: 'filter_date_start',
          string: 'Date',
          date: 'date_start'
        }
      },
      _separator_160: {},
      _group: {
        _attr: { string: 'Group by...' },
        _filter_user: {
          _attr: {
            name: 'user',
            string: 'User',
            context: { group_by: 'create_uid' }
          }
        },
        _filter_workcenter_group: {
          _attr: {
            name: 'workcenter_group',
            string: 'Workcenter',
            context: { group_by: 'workcenter_id' }
          }
        },
        _filter_loss_group: {
          _attr: {
            name: 'loss_group',
            string: 'Loss Reason',
            context: { group_by: 'loss_id' }
          }
        }
      }
    }
  },

  oee_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            production_id: {},
            workorder_id: {},
            workcenter_id: {},
            loss_id: {},
            company_id: { invisible: '1' }
          },
          _group_721: {
            date_start: {},
            date_end: {},
            duration: {},
            company_id: {}
          },
          description: {}
        }
      }
    }
  },

  oee_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'tree',
    arch: {
      sheet: {
        date_start: {},
        date_end: {},
        workcenter_id: {},
        user_id: {},
        loss_id: {},
        duration: { string: 'Duration (minutes)' },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  oee_graph_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'otherview',
    arch: {}
  },

  oee_pivot_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'otherview',
    arch: {}
  },

  mrp_workcenter_productivity_report: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Overall Equipment Effectiveness',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter.productivity',
    search_view_id: 'tooooooodoooooo',
    domain: '[]',
    context: {
      search_default_workcenter_group: 1,
      search_default_loss_group: 2,
      create: false,
      edit: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mrp_workcenter_block_wizard_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          loss_id: {
            domain: [['manual', '=', true]],
            class: 'oe_inline'
          },
          description: { placeholder: 'Add a description...' },
          workcenter_id: { invisible: '1' },
          company_id: { invisible: '1' }
        },
        _footer: {
          _button_button_block: {
            _attr: {
              name: 'button_block',
              type: 'object',
              string: 'Block',
              class: 'btn-danger text-uppercase'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  act_mrp_block_workcenter: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Block Workcenter',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter.productivity',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'default_workcenter_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  act_mrp_block_workcenter_wo: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Block Workcenter',
    type: 'ir.actions.act_window',
    res_model: 'mrp.workcenter.productivity',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
