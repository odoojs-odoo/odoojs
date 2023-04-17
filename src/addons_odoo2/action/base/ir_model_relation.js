export default {
  view_model_relation_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.relation',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          module: {},
          model: {}
        }
      }
    }
  },

  view_model_relation_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model.relation',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        module: {},
        model: {}
      }
    }
  },

  action_model_relation: {
    _odoo_model: 'ir.actions.act_window',
    name: 'ManyToMany Relations',
    res_model: 'ir.model.relation',
    views: {
      tree: 'view_model_relation_list',
      form: '=======todo=========='
    }
  }
}
