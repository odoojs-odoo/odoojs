// ok
export default {
  crm_team_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'tree',
    fields: {
      // sequence: {},
      name: {},
      active: { invisible: '1' },
      user_id: {},
      company_id: {}
    }
  },

  crm_team_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          _span: 2,
          name: {}
        },
        _group_name2: {
          active: { invisible: '1' },
          sequence: { invisible: '1' },

          is_membership_multi: { invisible: '1' },
          user_id: {
            widget: 'many2one_avatar_user',
            domain: [['share', '=', false]]
          },
          company_id: {},
          currency_id: { invisible: '1' },
          member_company_ids: { invisible: '1' }
        },
        _group_member_ids: {
          _span: 2,
          member_ids: {
            widget: 'x2many_tree',

            views: {
              tree: {
                fields: {
                  name: {}
                }
              },
              form: {
                fields: {
                  display_name: {}
                }
              }
            }
          }
        }
      }
    }
  },

  crm_team_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'search',
    arch: {
      fields: {
        name: {},
        user_id: {},
        member_ids: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  crm_team_action_config: {
    _odoo_model: 'ir.actions',
    name: 'Sales Teams',
    type: 'ir.actions.act_window',
    res_model: 'crm.team',
    search_view_id: 'crm_team_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'crm_team_view_tree',
      form: 'crm_team_view_form'
    }
  }
}
