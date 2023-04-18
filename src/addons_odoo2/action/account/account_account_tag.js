export default {
  account_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account.tag',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['active', '=', true]],
            title: 'Archived'
          }
        },
        _group: {
          active: {
            invisible: '1'
          },
          name: {},
          applicability: {},
          tax_negate: {
            invisible: [['applicability', '!=', 'taxes']]
          },
          country_id: {
            invisible: [['applicability', '!=', 'taxes']],
            no_open: true,
            no_create: true
          }
        }
      }
    }
  },

  account_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        applicability: {}
      }
    }
  },

  account_tag_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account.tag',
    type: 'search',
    arch: {
      name: {},
      _separator: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  }
}
