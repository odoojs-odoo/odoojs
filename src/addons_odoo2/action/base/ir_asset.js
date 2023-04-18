export default {
  asset_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.asset',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            name: {},
            bundle: {},
            directive: {},
            sequence: {},
            active: {
              widget: 'boolean_toggle'
            }
          },
          _group_803: {
            target: {
              invisible: [['directive', '!=', 'replace']]
            },
            path: {}
          }
        }
      }
    }
  },

  asset_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.asset',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        bundle: {},
        sequence: {},
        active: {}
      }
    }
  },

  asset_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.asset',
    type: 'search',
    arch: {
      name: {},
      bundle: {},
      directive: {},
      sequence: {},
      path: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: [['active', '=', true]]
        }
      }
    }
  },

  action_asset: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Assets',
    type: 'ir.actions.act_window',
    res_model: 'ir.asset',
    context: {
      search_default_active: 1
    },
    views: {
      tree: 'asset_view_tree',
      form: '=======todo=========='
    }
  }
}
