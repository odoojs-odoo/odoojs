// ok
export default {
  crm_team_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      active: {},
      user_id: {},
      company_id: {}
    }
  },

  crm_team_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'form',
    fields: {
      name: {},
      user_id: {
        domain: [['share', '=', false]]
      },
      company_id: {},

      // display_name: {},
      // sequence: {},
      // active: {},

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
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  crm_team_action_config: {
    _odoo_model: 'ir.actions',
    name: '销售团队',
    type: 'ir.actions.act_window',
    res_model: 'crm.team',
    domain: [],
    context: {}
  }
}
