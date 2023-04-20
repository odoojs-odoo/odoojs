export default {
  ir_profile_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.profile',
    type: 'search',
    arch: {
      name: {
        string: 'Name'
      },
      session: {
        string: 'Session'
      },
      _filter_group_session: {
        _attr: {
          name: 'group_session',
          string: 'Session',
          context: {
            group_by: 'session'
          }
        }
      }
    }
  },

  ir_profile_view_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.profile',
    type: 'tree',
    arch: {
      sheet: {
        create_date: {},
        session: {},
        name: {},
        entry_count: {},
        sql_count: {
          optional: 'hide'
        },
        speedscope_url: {
          widget: 'url'
        },
        duration: {}
      }
    }
  },

  ir_profile_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.profile',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          session: {},
          entry_count: {},
          sql_count: {
            invisible: [['sql_count', '=', 0]]
          },
          speedscope_url: {
            widget: 'url'
          }
        },
        _group_717: {
          _attr: {
            invisible: [['qweb', '=', false]]
          },
          qweb: {
            widget: 'profiling_qweb_view'
          }
        }
      }
    }
  },

  action_menu_ir_profile: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Ir profile',
    type: 'ir.actions.act_window',
    res_model: 'ir.profile',
    search_view_id: 'tooooooodoooooo',
    context: {
      search_default_group_session: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
