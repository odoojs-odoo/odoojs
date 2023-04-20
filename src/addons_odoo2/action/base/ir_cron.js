export default {
  ir_cron_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron',
    inherit_id: 'base.view_server_action_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@name='create_action']",
            position: 'replace'
          },
          _button_method_direct_trigger: {
            _attr: {
              name: 'method_direct_trigger',
              type: 'object',
              string: 'Run Manually',
              invisible: [['state', '!=', 'code']],
              class: 'oe_highlight'
            }
          }
        },
        _xpath_889: {
          _attr: {
            expr: "//button[@name='unlink_action']",
            position: 'replace'
          }
        },
        _xpath_168: {
          _attr: {
            expr: "//button[@name='run']",
            position: 'replace'
          }
        },
        _xpath_105: {
          _attr: {
            expr: "//group[@name='action_content']",
            position: 'inside'
          },
          user_id: {},
          _label_interval_number: {
            for: 'interval_number',
            string: 'Execute Every'
          },
          _div: {
            interval_number: {
              class: 'oe_inline'
            },
            interval_type: {
              class: 'oe_inline'
            }
          },
          active: {
            widget: 'boolean_toggle'
          },
          nextcall: {},
          numbercall: {},
          priority: {},
          doall: {}
        },
        state: {
          position: 'attributes',
          invisible: '1'
        }
      }
    }
  },

  ir_cron_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron',
    type: 'tree',
    arch: {
      sheet: {
        priority: {},
        name: {},
        model_id: {},
        nextcall: {},
        interval_number: {},
        interval_type: {},
        numbercall: {},
        user_id: {
          invisible: '1'
        },
        active: {}
      }
    }
  },

  ir_cron_view_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron',
    type: 'otherview',
    arch: {}
  },

  ir_cron_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.cron',
    type: 'search',
    arch: {
      name: {
        string: 'Scheduled Action'
      },
      user_id: {},
      model_id: {},
      nextcall: {},
      active: {},
      _separator: {},
      _filter_all: {
        _attr: {
          name: 'all',
          string: 'All',
          domain: ['|', ['active', '=', false], ['active', '=', true]]
        }
      },
      _separator_997: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_user: {
          _attr: {
            name: 'user',
            string: 'User',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_execution: {
          _attr: {
            name: 'execution',
            string: 'Execution',
            domain: [],
            context: {
              group_by: 'nextcall'
            }
          }
        },
        _filter_groupby_model_id: {
          _attr: {
            name: 'groupby_model_id',
            string: 'Model',
            domain: [],
            context: {
              group_by: 'model_id'
            }
          }
        }
      }
    }
  },

  ir_cron_act: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Scheduled Actions',
    res_model: 'ir.cron',
    search_view_id: 'tooooooodoooooo',
    context: {
      search_default_all: 1
    },
    views: {
      tree: 'ir_cron_view_tree',
      form: '=======todo=========='
    }
  }
}
