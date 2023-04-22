export default {
  crm_case_tree_view_oppor: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_crm__action_lead_mass_mail: {
            _attr: {
              name: 'crm.action_lead_mass_mail',
              type: 'action',
              string: 'Email'
            }
          }
        },
        // company_id: { invisible: '1' },
        user_company_ids: { invisible: '1' },
        date_deadline: { invisible: '1' },
        create_date: { optional: 'hide' },
        name: { string: 'Opportunity', readonly: '1' },
        partner_id: { optional: 'hide' },
        contact_name: { optional: 'show' },
        email_from: {},
        phone: { class: 'o_force_ltr' },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        },
        city: { optional: 'hide' },
        state_id: { optional: 'hide' },
        country_id: {
          optional: 'hide',
          no_open: true,
          no_create: true
        },
        user_id: {
          widget: 'many2one_avatar_user',
          domain: [['share', '=', false]],
          optional: 'show'
        },
        team_id: { optional: 'hide' },
        priority: { widget: 'priority', optional: 'hide' },
        activity_ids: { widget: 'list_activity' },
        activity_user_id: {
          string: 'Activity by',
          widget: 'many2one_avatar_user',
          optional: 'hide'
        },
        my_activity_date_deadline: {
          string: 'My Deadline',
          widget: 'remaining_days',
          allow_order: '1'
        },
        activity_calendar_event_id: { invisible: '1' },
        campaign_id: { optional: 'hide' },
        medium_id: { optional: 'hide' },
        source_id: { optional: 'hide' },
        company_currency: { invisible: '1' },
        expected_revenue: {
          widget: 'monetary',
          optional: 'show',
          currency_field: 'company_currency'
        },
        _field_date_deadline_415: {
          date_deadline: { optional: 'hide' }
        },
        recurring_revenue_monthly: {
          widget: 'monetary',
          groups: 'crm.group_use_recurring_revenues',
          optional: 'show',
          currency_field: 'company_currency'
        },
        recurring_revenue: {
          widget: 'monetary',
          groups: 'crm.group_use_recurring_revenues',
          optional: 'hide',
          currency_field: 'company_currency'
        },
        recurring_plan: {
          groups: 'crm.group_use_recurring_revenues',
          optional: 'hide'
        },
        stage_id: { optional: 'show' },
        active: { invisible: '1' },
        probability: {
          string: 'Probability (%)',
          optional: 'hide'
        },
        tag_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color'
        },
        referred: { invisible: '1' },
        message_needaction: { invisible: '1' },
        _button_crm__action_lead_mail_compose: {
          _attr: {
            name: 'crm.action_lead_mail_compose',
            type: 'action',
            string: 'Email',
            icon: 'fa-envelope'
          }
        },
        _button_action_reschedule_meeting: {
          _attr: {
            name: 'action_reschedule_meeting',
            type: 'object',
            string: 'Reschedule',
            icon: 'fa-calendar',
            invisible: [
              '|',
              ['my_activity_date_deadline', '=', false],
              ['activity_calendar_event_id', '=', false]
            ],
            class: 'text-warning'
          }
        },
        _button_action_snooze: {
          _attr: {
            name: 'action_snooze',
            type: 'object',
            string: 'Snooze 7d',
            icon: 'fa-bell-slash',
            invisible: [
              '|',
              ['my_activity_date_deadline', '=', false],
              ['activity_calendar_event_id', '!=', false]
            ],
            class: 'text-warning'
          }
        }
      }
    }
  },

  crm_lead_view_list_activities: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    inherit_id: 'crm.crm_case_tree_view_oppor',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_default_order: {
            _attr: {
              name: 'default_order',
              text: 'my_activity_date_deadline',
              default_order: 'my_activity_date_deadline'
            }
          }
        },
        user_id: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        team_id: {
          position: 'attributes',
          __todo__optional: 'hide'
        }
      }
    }
  },

  view_crm_case_leads_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Lead',
          filter_domain(self) {
            return [
              [
                '|',
                '|',
                '|',
                ['partner_name', 'ilike', self],
                ['email_from', 'ilike', self],
                ['contact_name', 'ilike', self],
                ['name', 'ilike', self]
              ]
            ]
          }
        },
        tag_ids: {
          string: 'Tag',
          filter_domain(self) {
            return [[['tag_ids', 'ilike', self]]]
          }
        },
        user_id: {},
        team_id: {},
        country_id: {},
        city: {},
        phone_mobile_search: {},
        lang_id: {},
        create_date: {},
        source_id: {},
        medium_id: {},
        campaign_id: {},
        activity_state: {}
      },

      filters: {
        group_for_me: {
          assigned_to_me: {
            name: 'assigned_to_me',
            string: 'My Leads',
            help: 'Leads that are assigned to me',
            domain({ env }) {
              return [['user_id', '=', env.uid]]
            }
          },
          unassigned_leads: {
            name: 'unassigned_leads',
            string: 'Unassigned',
            help: 'Leads that are not assigned',
            domain: [
              ['user_id', '=', false],
              ['type', '=', 'lead']
            ]
          }
        },
        group_lost: {
          lost: {
            name: 'lost',
            string: 'Lost',
            domain: ['&', ['probability', '=', 0], ['active', '=', false]]
          }
        },
        group_filter_creation_date: {
          filter_creation_date: {
            name: 'filter_creation_date',
            string: 'Creation Date',
            date: 'create_date'
          },
          filter_date_closed: {
            filter_date_closed: {
              name: 'filter_date_closed',
              date: 'date_closed'
            }
          }
        },
        group_inactive: {
          inactive: {
            name: 'inactive',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  view_crm_case_my_activities_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    inherit_id: 'crm.view_crm_case_leads_filter',
    arch: {}
  },

  crm_lead_action_my_activities: {
    _odoo_model: 'ir.actions.act_window',
    name: 'My Activities',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_my_activities_filter',
    domain: [['activity_ids', '!=', false]],
    context: {
      default_type: 'opportunity',
      search_default_assigned_to_me: 1
    },
    views: {
      tree: 'crm_lead_view_list_activities',
      form: '=======todo=========='
    }
  }
}
