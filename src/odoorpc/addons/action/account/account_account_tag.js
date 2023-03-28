export default {
  account_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account.tag',
    type: 'form',

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          name: {},
          active: { invisible: '1', widget: 'web_ribbon' }
        },

        _group_logo: {
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
    fields: {
      name: {},
      applicability: {}
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
