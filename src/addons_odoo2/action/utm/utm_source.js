export default {
  utm_source_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.source',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  utm_source_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.source',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {}
        }
      }
    }
  },

  utm_source_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sources',
    res_model: 'utm.source',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
