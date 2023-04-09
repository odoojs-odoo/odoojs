// ok
export default {
  crm_team_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'tree',
    fields: {
      sequence: { widget: 'handle' },
      name: { readonly: '1' },
      active: { invisible: '1' },
      user_id: {
        domain: [['share', '=', false]],
        widget: 'many2one_avatar_user'
      },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  crm_team_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'form',
    arch: {
      sheet: {
        _div_alert: {
          _attr: {
            invisible({ record }) {
              //  'invisible': ['|', ('is_membership_multi', '=', True),
              // ('member_warning', '=', False)]
              const { is_membership_multi, member_warning } = record
              return is_membership_multi || !member_warning
            }
          },
          member_warning: {}
        },

        _div_button_box: {},

        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // 'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _div_title: {
          _h1: {
            name: { string: 'Sales Team', placeholder: 'e.g. North America' }
          }
        },

        _group: {
          _group_left: {
            _attr: { name: 'left', string: 'Team Details' },
            active: { invisible: '1' },
            sequence: { invisible: '1' },
            is_membership_multi: { invisible: '1' },

            user_id: {
              widget: 'many2one_avatar_user',
              domain: [['share', '=', false]]
            },
            company_id: { groups: 'base.group_multi_company' },
            currency_id: { invisible: '1' },
            member_company_ids: { invisible: '1' }
          },

          _group_right: {}
        },

        _notebook: {
          _page_members_users: {
            _attr: { string: 'Members', name: 'members_users' },
            member_ids: {
              widget: 'x2many_tree',
              views: {
                tree: { fields: { name: {} } },
                form: {
                  arch: {
                    sheet: {
                      name: {}
                    }
                  }
                }
              }
            },
            crm_team_member_ids: {
              widget: 'x2many_tree',
              invisible({ record }) {
                // 'invisible': ['|', ('is_membership_multi', '=', True),
                // ('is_membership_multi', '=', False)]
                const { is_membership_multi } = record
                return is_membership_multi || !is_membership_multi
              },
              context({ active_id }) {
                return {
                  kanban_view_ref:
                    'sales_team.crm_team_member_view_kanban_from_team',
                  form_view_ref:
                    'sales_team.crm_team_member_view_form_from_team',
                  tree_view_ref:
                    'sales_team.crm_team_member_view_tree_from_team',
                  default_crm_team_id: active_id
                }
              },
              views: {
                tree: { fields: { name: {} } },
                form: {
                  arch: {
                    sheet: {
                      name: {}
                    }
                  }
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
