export default {
  utm_stage_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.stage',
    type: 'search',
    arch: {
      name: {}
    }
  },

  utm_stage_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.stage',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {}
      }
    }
  },

  action_view_utm_stage: {
    _odoo_model: 'ir.actions.act_window',
    name: 'UTM Stages',
    res_model: 'utm.stage',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
