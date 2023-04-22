export default {
  view_crm_lead2opportunity_partner_mass: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead2opportunity.partner.mass',
    type: 'form',
    arch: {
      sheet: {
        lead_tomerge_ids: { invisible: '1' },
        _separator: {
          _attr: { string: 'Conversion Options' }
        },
        _group: {
          name: {
            widget: 'radio',
            class: 'oe_inline'
          },
          deduplicate: { class: 'oe_inline' }
        },
        _group_534: {
          _attr: { string: 'Assign these opportunities to' },
          team_id: {},
          user_ids: {
            widget: 'many2many_tags',
            domain: [['share', '=', false]]
          },
          force_assignment: {}
        },
        _label_duplicated_lead_ids: {
          for: 'duplicated_lead_ids',
          string: 'Leads with existing duplicates (for information)',
          invisible: [['deduplicate', '=', false]]
        },
        _group_212: {
          _attr: { invisible: [['deduplicate', '=', false]] },
          duplicated_lead_ids: {
            readonly: '1',
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
        _group_474: {
          _attr: {
            string: 'Customers',
            invisible: [['name', '!=', 'convert']]
          },
          action: {
            widget: 'radio',
            class: 'oe_inline'
          },
          _group: {
            partner_id: {
              widget: 'res_partner_many2one',
              required: [['action', '=', 'exist']],
              invisible: [['action', '!=', 'exist']],
              context: { show_vat: true },
              class: 'oe_inline'
            }
          }
        },
        _footer: {
          _button_action_mass_convert: {
            _attr: {
              name: 'action_mass_convert',
              type: 'object',
              string: 'Convert to Opportunities',
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

  action_crm_send_mass_convert: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Convert to opportunities',
    res_model: 'crm.lead2opportunity.partner.mass',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: 'view_crm_lead2opportunity_partner_mass',
      form: '=======todo=========='
    }
  }
}
