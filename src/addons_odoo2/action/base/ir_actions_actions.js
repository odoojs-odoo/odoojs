export default {
  action_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.actions',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          type: {}
        }
      }
    }
  },

  action_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.actions',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        type: {}
      }
    }
  },

  action_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.actions',
    type: 'search',
    arch: {
      name: {
        string: 'Action',
        filter_domain: { todo_ctx: "['|', ('name','ilike',self), ('type','ilike',self)]" }
      }
    }
  },

  ir_sequence_actions: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Actions',
    type: 'ir.actions.act_window',
    res_model: 'ir.actions.actions',
    search_view_id: 'action_view_search',
    views: {
      tree: 'action_view_tree',
      form: '=======todo=========='
    }
  }
}
