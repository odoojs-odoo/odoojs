export default {
  ir_logging_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.logging',
    type: 'form',
    arch: {
      sheet: {
        _group_creation_details: {
          _attr: {
            name: 'creation_details',
            string: 'Creation details'
          },
          create_date: {},
          create_uid: {},
          dbname: {}
        },
        _group_log_details: {
          _attr: {
            name: 'log_details',
            string: 'Logging details'
          },
          type: {},
          name: {},
          level: {},
          path: {},
          line: {},
          func: {},
          message: {}
        }
      }
    }
  },

  ir_logging_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.logging',
    type: 'tree',
    arch: {
      sheet: {
        create_date: {},
        create_uid: {},
        dbname: {},
        type: {},
        name: {},
        level: {},
        path: {},
        line: {},
        func: {}
      }
    }
  },

  ir_logging_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.logging',
    type: 'search',
    arch: {
      dbname: {},
      type: {},
      name: {},
      level: {},
      message: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_database: {
          _attr: {
            name: 'database',
            string: 'Database',
            domain: [],
            context: {
              group_by: 'dbname'
            }
          }
        },
        _filter_group_by_level: {
          _attr: {
            name: 'group_by_level',
            string: 'Level',
            domain: [],
            context: {
              group_by: 'level'
            }
          }
        },
        _filter_group_by_type: {
          _attr: {
            name: 'group_by_type',
            string: 'Type',
            domain: [],
            context: {
              group_by: 'type'
            }
          }
        },
        _filter_group_by_month: {
          _attr: {
            name: 'group_by_month',
            string: 'Creation Date',
            domain: [],
            context: {
              group_by: 'create_date'
            }
          }
        }
      }
    }
  },

  ir_logging_all_act: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Logging',
    res_model: 'ir.logging',
    search_view_id: 'ir_logging_search_view',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
