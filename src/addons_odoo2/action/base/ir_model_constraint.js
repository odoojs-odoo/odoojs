export default {
  view_model_constraint_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.constraint',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          type: {},
          name: {},
          module: {},
          model: {}
        },
        _group_314: {
          message: {}
        }
      }
    }
  },

  view_model_constraint_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.constraint',
    type: 'tree',
    arch: {
      sheet: {
        type: {},
        name: {},
        module: {},
        model: {}
      }
    }
  },

  view_model_constraint_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.constraint',
    type: 'search',
    arch: {
      model: {},
      name: {},
      message: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_module: {
          _attr: {
            name: 'module',
            string: 'Module',
            context: {
              group_by: 'module'
            }
          }
        },
        _filter_model: {
          _attr: {
            name: 'model',
            string: 'Model',
            context: {
              group_by: 'model'
            }
          }
        },
        _filter_type: {
          _attr: {
            name: 'type',
            string: 'Constraint type',
            context: {
              group_by: 'type'
            }
          }
        }
      }
    }
  },

  action_model_constraint: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Model Constraints',
    search_view_id: 'view_model_constraint_search',
    res_model: 'ir.model.constraint',
    views: {
      tree: 'view_model_constraint_list',
      form: '=======todo=========='
    }
  }
}
