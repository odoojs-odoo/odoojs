export default {
  utm_medium_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.medium',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        active: { invisible: '1' }
      }
    }
  },

  utm_medium_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.medium',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          active: { widget: 'boolean_toggle' }
        }
      }
    }
  },

  utm_medium_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.medium',
    type: 'search',
    arch: {
      name: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  utm_medium_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Mediums',
    res_model: 'utm.medium',
    search_view_id: 'utm_medium_view_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
