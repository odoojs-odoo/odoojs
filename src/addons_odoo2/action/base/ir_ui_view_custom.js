export default {
  view_view_custom_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view.custom',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          user_id: {},
          ref_id: {},
          _separator: {
            _attr: { string: 'View Architecture' }
          },
          arch: {}
        }
      }
    }
  },

  view_view_custom_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view.custom',
    type: 'tree',
    arch: {
      sheet: {
        user_id: {},
        ref_id: {}
      }
    }
  },

  view_view_custom_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.ui.view.custom',
    type: 'search',
    arch: {
      user_id: {},
      ref_id: {}
    }
  },

  action_ui_view_custom: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Customized Views',
    type: 'ir.actions.act_window',
    res_model: 'ir.ui.view.custom',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
