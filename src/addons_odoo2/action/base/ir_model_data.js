export default {
  view_model_data_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.data',
    type: 'form',
    arch: {
      sheet: {
        _h1: {
          complete_name: {}
        },
        _group: {
          _group: {
            module: {},
            name: {},
            noupdate: {},
            write_date: {},
            create_date: {}
          },
          _group_752: {
            display_name: {},
            model: {},
            res_id: {},
            reference: {
              string: 'Record',
              widget: 'reference'
            }
          }
        }
      }
    }
  },

  view_model_data_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.data',
    type: 'tree',
    arch: {
      sheet: {
        complete_name: {},
        display_name: {},
        model: { groups: 'base.group_no_one' },
        module: { invisible: '1' },
        res_id: {}
      }
    }
  },

  view_model_data_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.data',
    type: 'search',
    arch: {
      name: {
        string: 'External Identifier',
        filter_domain: { todo_ctx: "[('name','ilike',self)]" }
      },
      _filter_updatable: {
        _attr: {
          name: 'updatable',
          string: 'Updatable',
          domain: [['noupdate', '=', false]]
        }
      },
      module: {},
      model: {},
      res_id: {},
      noupdate: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_by_module: {
          _attr: {
            name: 'group_by_module',
            string: 'Module',
            domain: [],
            context: { group_by: 'module' }
          }
        },
        _filter_group_by_object: {
          _attr: {
            name: 'group_by_object',
            string: 'Model',
            domain: [],
            context: { group_by: 'model' }
          }
        }
      }
    }
  },

  action_model_data: {
    _odoo_model: 'ir.actions.act_window',
    name: 'External Identifiers',
    res_model: 'ir.model.data',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_model_data_list',
      form: '=======todo=========='
    }
  }
}
