export default {
  ir_filters_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.filters',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          user_id: {
            string: 'Available for User'
          },
          model_id: {},
          is_default: {},
          action_id: {},
          active: {
            widget: 'boolean_toggle'
          }
        },
        _group_402: {
          domain: {
            widget: 'domain',
            model: 'model_id'
          },
          context: {},
          sort: {}
        }
      }
    }
  },

  ir_filters_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.filters',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model_id: {},
        user_id: {},
        is_default: {},
        action_id: {},
        domain: {
          groups: 'base.group_no_one'
        },
        context: {
          groups: 'base.group_no_one'
        },
        sort: {
          groups: 'base.group_no_one'
        }
      }
    }
  },

  ir_filters_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.filters',
    type: 'search',
    arch: {
      name: {
        string: 'Filter Name'
      },
      _filter_user: {
        _attr: {
          name: 'user',
          string: 'User',
          domain: "[('user_id', '!=', False)]"
        }
      },
      _filter_shared: {
        _attr: {
          name: 'shared',
          string: 'Shared',
          domain: "[('user_id', '=', False)]"
        }
      },
      _filter_my_filters: {
        _attr: {
          name: 'my_filters',
          string: 'My filters',
          domain: {
            todo: "[('user_id','=',uid)]"
          }
        }
      },
      _separator: {},
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
        _filter_user: {
          _attr: {
            name: 'user',
            string: 'User',
            domain: "[]",
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_model: {
          _attr: {
            name: 'model',
            string: 'Model',
            domain: "[]",
            context: {
              group_by: 'model_id'
            }
          }
        }
      },
      model_id: {},
      user_id: {}
    }
  },

  actions_ir_filters_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'User-defined Filters',
    type: 'ir.actions.act_window',
    res_model: 'ir.filters',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}