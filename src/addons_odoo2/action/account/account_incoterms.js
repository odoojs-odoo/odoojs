export default {
  view_incoterms_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.incoterms',
    type: 'tree',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
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
            attrs: {
              invisible: "[('active', '=', True)]"
            },
            title: 'Archived'
          }
        },
        _group: {
          active: {
            invisible: '1'
          },
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
          domain: "[('active', '=', False)]"
        }
      }
    }
  },

  action_incoterms_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Incoterms',
    type: 'ir.actions.act_window',
    res_model: 'account.incoterms',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
