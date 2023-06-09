export default {
  view_incoterms_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'tree',
    arch: {
      sheet: {
        active: { invisible: '1' },
        code: {},
        name: {}
      }
    }
  },

  account_incoterms_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          active: { invisible: '1' },
          name: {},
          code: {}
        }
      }
    }
  },

  account_incoterms_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
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

  action_incoterms_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Incoterms',
    type: 'ir.actions.act_window',
    res_model: 'account.incoterms',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
