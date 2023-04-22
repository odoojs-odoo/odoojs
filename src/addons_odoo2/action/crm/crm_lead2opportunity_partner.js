export default {
  view_crm_lead2opportunity_partner: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead2opportunity.partner',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          _attr: { name: 'name' },
          name: { widget: 'radio' }
        },
        _group: {
          _attr: { string: 'Assign this opportunity to' },
          user_id: { domain: [['share', '=', false]] },
          team_id: {
            no_open: true,
            no_create: true
          }
        },
        _group_614: {
          _attr: {
            string: 'Opportunities',
            invisible: [['name', '!=', 'merge']]
          },
          lead_id: { invisible: '1' },
          duplicated_lead_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    create_date: { widget: 'date' },
                    name: {},
                    type: {},
                    contact_name: {},
                    country_id: {
                      invisible: "context.get['invisible_country', True]",
                      no_open: true,
                      no_create: true
                    },
                    email_from: {},
                    stage_id: {},
                    user_id: {},
                    team_id: {}
                  }
                }
              }
            }
          }
        },
        _group_action: {
          _attr: {
            name: 'action',
            string: 'Customer',
            invisible: [['name', '!=', 'convert']]
          },
          action: { widget: 'radio' },
          _group: {
            partner_id: {
              widget: 'res_partner_many2one',
              required: [['action', '=', 'exist']],
              invisible: [['action', '!=', 'exist']],
              context: {
                res_partner_search_mode: 'customer',
                show_vat: true
              }
            }
          }
        },
        _footer: {
          _button_action_apply: {
            _attr: {
              name: 'action_apply',
              type: 'object',
              string: 'Create Opportunity',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_crm_lead2opportunity_partner: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Convert to opportunity',
    type: 'ir.actions.act_window',
    res_model: 'crm.lead2opportunity.partner',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_crm_lead2opportunity_partner',
      form: '=======todo=========='
    }
  }
}
