export default {
  crm_team_member_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_tree',
    arch: {
      sheet: {
        user_id: {
          position: 'after',
          __todo__after: {
            assignment_enabled: { invisible: '1' },
            assignment_optout: {},
            assignment_max: {},
            lead_month_count: {}
          }
        }
      }
    }
  },

  crm_team_member_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_details')]",
            position: 'after'
          },
          assignment_enabled: { invisible: '1' },
          assignment_optout: { invisible: '1' },
          _div: {
            _attr: {
              invisible: ['|', ['assignment_enabled', '=', false], ['assignment_optout', '=', true]],
              class: 'o_member_assignment'
            },
            assignment_max: { invisible: '1' },
            lead_month_count: {
              widget: 'gauge',
              invisible: [['assignment_max', '=', 0]],
              max_field: 'assignment_max'
            }
          }
        }
      }
    }
  },

  crm_team_member_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='member_partner_info']",
            position: 'after'
          },
          _group_group_assign: {
            _attr: {
              name: 'group_assign',
              invisible: [['assignment_enabled', '=', false]]
            },
            assignment_enabled: { invisible: '1' },
            assignment_optout: {},
            _label_lead_month_count: {
              for: 'lead_month_count',
              invisible: [['assignment_optout', '=', true]]
            },
            _div: {
              _attr: { invisible: [['assignment_optout', '=', true]] },
              lead_month_count: { class: 'oe_inline' },
              _span: {
                _attr: {
                  class: 'oe_inline',
                  text: '/'
                }
              },
              assignment_max: { class: 'oe_inline' },
              _span_774: {
                _attr: {
                  class: 'oe_inline',
                  text: '(max)'
                }
              }
            },
            assignment_domain: {
              string: 'Domain',
              widget: 'domain',
              invisible: ['|', ['assignment_max', '=', 0], ['assignment_optout', '=', true]],
              model: 'crm.lead'
            }
          }
        }
      }
    }
  }
}
