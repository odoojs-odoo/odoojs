export default {
  account_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account.tag',
    type: 'form',

    arch: {
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },
        _title: { display_name: {} },

        _group_name: {
          active: { invisible: '1' },
          name: {},
          applicability: {},
          tax_negate: {
            readonly: '1',
            invisible({ record }) {
              // 'invisible': [('applicability', '!=', 'taxes')]
              const { applicability } = record
              return applicability !== 'taxes'
            }
          },
          country_id: {
            invisible({ record }) {
              // 'invisible': [('applicability', '!=', 'taxes')]
              const { applicability } = record
              return applicability !== 'taxes'
            }
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
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          archived: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_account_account_tag: {
    _odoo_model: 'ir.actions',
    name: 'Account Tags',
    type: 'ir.actions.act_window',
    res_model: 'account.account.tag',
    search_view_id: 'account_tag_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'account_tag_view_tree',
      form: 'account_tag_view_form'
    }
  }
}
