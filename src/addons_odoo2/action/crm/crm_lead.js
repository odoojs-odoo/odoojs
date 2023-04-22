export default {
  crm_case_form_view_salesteams_lead: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Leads',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_leads_filter',
    domain: "['|', ['type','=','lead'], ['type','=',False]]",
    context: { todo_ctx: "{\n                    'search_default_team_id': [active_id],\n                    'default_team_id': active_id,\n                    'default_type': 'lead',\n                }\n            " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_case_form_view_salesteams_opportunity: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Opportunities',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_opportunities_filter',
    domain: "[['type','=','opportunity']]",
    context: { todo_ctx: "{\n                    'search_default_team_id': [active_id],\n                    'default_team_id': active_id,\n                    'default_type': 'opportunity',\n                    'default_user_id': uid,\n                }\n            " },
    views: {
      tree: 'crm.crm_case_kanban_view_leads',
      form: '=======todo=========='
    }
  },

  crm_lead_action_team_overdue_opportunity: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Overdue Opportunities',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_opportunities_filter',
    domain: "[['type','=','opportunity']]",
    context: { todo_ctx: "{\n                    'search_default_team_id': [active_id],\n                    'search_default_overdue_opp': 1,\n                    'default_team_id': active_id,\n                    'default_type': 'opportunity',\n                    'default_user_id': uid,\n                }\n            " },
    views: {
      tree: 'crm.crm_case_kanban_view_leads',
      form: '=======todo=========='
    }
  },

  action_report_crm_lead_salesteam: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Leads Analysis',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_leads_filter',
    domain: '[]',
    context: { todo_ctx: "{'search_default_team_id': [active_id], 'search_default_filter_create_date': 1}}" },
    views: {
      tree: 'crm_lead_view_graph',
      form: '=======todo=========='
    }
  },

  action_report_crm_lead_salesteam_view_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'crm_lead_view_graph',
    act_window_id: 'action_report_crm_lead_salesteam'
  },

  action_report_crm_lead_salesteam_view_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'crm_lead_view_pivot',
    act_window_id: 'action_report_crm_lead_salesteam'
  },

  action_report_crm_lead_salesteam_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm_lead_view_tree_reporting',
    act_window_id: 'action_report_crm_lead_salesteam'
  },

  action_report_crm_opportunity_salesteam: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Pipeline Analysis',
    res_model: 'crm.lead',
    search_view_id: 'crm.crm_opportunity_report_view_search',
    domain: '[]',
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'tree_view_ref': 'crm.crm_case_tree_view_oppor',\n                'search_default_filter_opportunity': True,\n                'search_default_filter_create_date': 1}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_crm_tag_kanban_view_salesteams_oppor11: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'crm_case_kanban_view_leads',
    act_window_id: 'crm_case_form_view_salesteams_opportunity'
  },

  action_crm_tag_tree_view_salesteams_oppor11: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm_case_tree_view_oppor',
    act_window_id: 'crm_case_form_view_salesteams_opportunity'
  },

  action_opportunity_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'New Opportunity',
    type: 'ir.actions.act_window',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_opportunities_filter',
    domain: "[['type','=','opportunity']]",
    context: { todo_ctx: "{\n                    'search_default_team_id': [active_id],\n                    'default_team_id': active_id,\n                    'default_type': 'opportunity',\n                    'default_user_id': uid,\n            }\n            " },
    views: {
      tree: 'crm_lead_view_form',
      form: '=======todo=========='
    }
  },

  crm_lead_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'form',
    arch: {
      header: {
        _button_action_set_won_rainbowman: {
          _attr: {
            name: 'action_set_won_rainbowman',
            type: 'object',
            string: 'Won',
            title: 'Mark as won',
            invisible: ['|', '|', ['active', '=', false], ['probability', '=', 100], ['type', '=', 'lead']],
            class: 'oe_highlight'
          }
        },
        _button_crm__crm_lead_lost_action: {
          _attr: {
            name: 'crm.crm_lead_lost_action',
            type: 'action',
            string: 'Lost',
            title: 'Mark as lost',
            invisible: ['|', ['type', '=', 'lead'], '&', ['active', '=', false], ['probability', '<', 100]],
            context: { todo_ctx: "{'default_lead_id': active_id}" }
          }
        },
        _button_crm__action_crm_lead2opportunity_partner: {
          _attr: {
            name: 'crm.action_crm_lead2opportunity_partner',
            type: 'action',
            string: 'Convert to Opportunity',
            help: 'Convert to Opportunity',
            invisible: ['|', ['type', '=', 'opportunity'], ['active', '=', false]],
            class: 'oe_highlight'
          }
        },
        _button_toggle_active: {
          _attr: {
            name: 'toggle_active',
            type: 'object',
            string: 'Restore',
            invisible: ['|', ['probability', '>', 0], ['active', '=', true]]
          }
        },
        _button_action_set_lost: {
          _attr: {
            name: 'action_set_lost',
            type: 'object',
            string: 'Lost',
            title: 'Mark as lost',
            invisible: ['|', ['type', '=', 'opportunity'], '&', ['probability', '=', 0], ['active', '=', false]]
          }
        },
        stage_id: {
          widget: 'statusbar',
          domain: { todo_ctx: "['|', ('team_id', '=', team_id), ('team_id', '=', False)]" },
          invisible: ['|', ['active', '=', false], ['type', '=', 'lead']],
          class: 'o_field_statusbar',
          clickable: '1',
          fold_field: 'fold'
        }
      },
      sheet: {
        active: { invisible: '1' },
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_schedule_meeting: {
            _attr: {
              name: 'action_schedule_meeting',
              type: 'object',
              icon: 'fa-calendar',
              invisible: [['type', '=', 'lead']],
              context: { todo_ctx: "{'partner_id': partner_id}" },
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_stat_info' },
              calendar_event_count: { class: 'o_stat_value' },
              _span: {
                _attr: {
                  invisible: [['calendar_event_count', '<', 2]],
                  class: 'o_stat_text',
                  text: 'Meetings'
                }
              },
              _span_363: {
                _attr: {
                  invisible: [['calendar_event_count', '>', 1]],
                  class: 'o_stat_text',
                  text: 'Meeting'
                }
              }
            }
          },
          _button_action_show_potential_duplicates: {
            _attr: {
              name: 'action_show_potential_duplicates',
              type: 'object',
              icon: 'fa-star',
              invisible: [['duplicate_lead_count', '<', 1]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_stat_info' },
              duplicate_lead_count: { class: 'o_stat_value' },
              _span: {
                _attr: {
                  invisible: [['duplicate_lead_count', '<', 2]],
                  class: 'o_stat_text',
                  text: 'Similar Leads'
                }
              },
              _span_339: {
                _attr: {
                  invisible: [['duplicate_lead_count', '>', 1]],
                  class: 'o_stat_text',
                  text: 'Similar Lead'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Lost',
            bg_color: 'bg-danger',
            invisible: ['|', ['probability', '>', 0], ['active', '=', true]]
          }
        },
        _widget_web_ribbon_345: {
          _attr: {
            name: 'web_ribbon',
            title: 'Won',
            invisible: [['probability', '<', 100]]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            name: {
              class: 'text-break',
              placeholder: 'e.g. Product Pricing'
            }
          },
          _h2: {
            _attr: { class: 'd-flex gap-2 g-0 align-items-end pb-3' },
            _div: {
              _attr: { invisible: [['type', '=', 'lead']] },
              _label_expected_revenue: {
                for: 'expected_revenue',
                class: 'oe_edit_only pb-1'
              },
              _div: {
                _attr: { class: 'd-flex align-items-end' },
                company_currency: { invisible: '1' },
                expected_revenue: {
                  widget: 'monetary',
                  class: 'oe_inline o_input_8ch',
                  currency_field: 'company_currency'
                },
                _span: {
                  _attr: {
                    groups: 'crm.group_use_recurring_revenues',
                    class: 'oe_grey p-2',
                    text: '+'
                  }
                },
                _span_297: {
                  _attr: {
                    groups: '!crm.group_use_recurring_revenues',
                    class: 'oe_grey p-2',
                    text: 'at'
                  }
                }
              }
            },
            _div_721: {
              _attr: {
                groups: 'crm.group_use_recurring_revenues',
                invisible: [['type', '=', 'lead']]
              },
              recurring_revenue: {
                widget: 'monetary',
                class: 'oe_inline o_input_10ch',
                currency_field: 'company_currency'
              }
            },
            _div_151: {
              _attr: {
                groups: 'crm.group_use_recurring_revenues',
                invisible: [['type', '=', 'lead']]
              },
              _div: {
                _attr: { class: 'd-flex align-items-end ps-2' },
                recurring_plan: {
                  required: [['recurring_revenue', '!=', 0]],
                  class: 'oe_inline o_input_12ch',
                  placeholder: 'E.g. Monthly',
                  no_create: true,
                  no_open: true
                },
                _span: {
                  _attr: {
                    class: 'oe_grey p-2',
                    text: 'at'
                  }
                }
              }
            },
            _div_624: {
              _div: {
                _attr: { class: 'oe_edit_only d-md-flex align-items-center' },
                _label_probability: { for: 'probability' },
                _div: {
                  _attr: { class: 'd-flex align-items-center' },
                  _button_action_set_automated_probability: {
                    _attr: {
                      name: 'action_set_automated_probability',
                      type: 'object',
                      invisible: [['is_automated_probability', '=', true]],
                      class: 'ps-0 ps-md-2 btn btn-link'
                    },
                    _i: {
                      _attr: {
                        title: 'Switch to automatic probability',
                        class: 'fa fa-gear'
                      }
                    }
                  },
                  _small: {
                    _attr: {
                      invisible: [['is_automated_probability', '=', true]],
                      class: 'oe_grey h6 mb0 d-flex',
                      text: '%'
                    },
                    automated_probability: {
                      class: 'mb0',
                      force_save: '1'
                    }
                  }
                }
              },
              _div_972: {
                _attr: { class: 'd-inline-block' },
                is_automated_probability: { invisible: '1' },
                probability: {
                  widget: 'float',
                  class: 'oe_inline o_input_6ch'
                },
                _span: {
                  _attr: {
                    class: 'oe_grey',
                    text: '%'
                  }
                }
              }
            }
          }
        },
        _group: {
          _group_lead_partner: {
            _attr: {
              name: 'lead_partner',
              invisible: [['type', '=', 'opportunity']]
            },
            is_partner_visible: { invisible: '1' },
            partner_id: {
              widget: 'res_partner_many2one',
              invisible: [['is_partner_visible', '=', false]],
              context: { todo_ctx: "{                                         'default_name': contact_name,                                         'default_title': title,                                         'default_street': street,                                         'default_street2': street2,                                         'default_city': city,                                         'default_state_id': state_id,                                         'default_zip': zip,                                         'default_country_id': country_id,                                         'default_function': function,                                         'default_phone': phone,                                         'default_mobile': mobile,                                         'default_email': email_from,                                         'default_user_id': user_id,                                         'default_team_id': team_id,                                         'default_website': website,                                         'default_lang': lang_code,                                         'show_vat': True                                     }" }
            },
            partner_name: {},
            _label_street: {
              for: 'street',
              string: 'Address'
            },
            _div: {
              _attr: { class: 'o_address_format' },
              street: {
                class: 'o_address_street',
                placeholder: 'Street...'
              },
              street2: {
                class: 'o_address_street',
                placeholder: 'Street 2...'
              },
              city: {
                class: 'o_address_city',
                placeholder: 'City'
              },
              state_id: {
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true
              },
              zip: {
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              country_id: {
                class: 'o_address_country',
                placeholder: 'Country',
                no_open: true,
                no_create: true
              }
            },
            website: {
              widget: 'url',
              placeholder: 'e.g. https://www.odoo.com'
            },
            lang_active_count: { invisible: '1' },
            lang_code: { invisible: '1' },
            lang_id: {
              invisible: [['lang_active_count', '<=', 1]],
              no_quick_create: true,
              no_create_edit: true,
              no_open: true
            }
          },
          _group_opportunity_partner: {
            _attr: {
              name: 'opportunity_partner',
              invisible: [['type', '=', 'lead']]
            },
            partner_id: {
              string: 'Customer',
              widget: 'res_partner_many2one',
              context: { todo_ctx: "{'res_partner_search_mode': type == 'opportunity' and 'customer' or False,                                         'default_name': contact_name or partner_name,                                         'default_street': street,                                         'default_is_company': type == 'opportunity' and contact_name == False,                                         'default_company_name': type == 'opportunity' and partner_name,                                         'default_street2': street2,                                         'default_city': city,                                         'default_title': title,                                         'default_state_id': state_id,                                         'default_zip': zip,                                         'default_country_id': country_id,                                         'default_function': function,                                         'default_phone': phone,                                         'default_mobile': mobile,                                         'default_email': email_from,                                         'default_user_id': user_id,                                         'default_team_id': team_id,                                         'default_website': website,                                         'default_lang': lang_code,                                         'show_vat': True,                                     }" }
            },
            is_blacklisted: { invisible: '1' },
            partner_is_blacklisted: { invisible: '1' },
            phone_blacklisted: { invisible: '1' },
            mobile_blacklisted: { invisible: '1' },
            email_state: { invisible: '1' },
            phone_state: { invisible: '1' },
            partner_email_update: { invisible: '1' },
            partner_phone_update: { invisible: '1' },
            _label_email_from: {
              for: 'email_from',
              class: 'oe_inline'
            },
            _div: {
              _attr: { class: 'o_row o_row_readonly' },
              _button_mail_action_blacklist_remove: {
                _attr: {
                  name: 'mail_action_blacklist_remove',
                  type: 'object',
                  title: 'This email is blacklisted for mass mailings. Click to unblacklist.',
                  groups: 'base.group_user',
                  invisible: [['is_blacklisted', '=', false]],
                  context: { todo_ctx: "{'default_email': email_from}" },
                  class: 'fa fa-ban text-danger'
                }
              },
              email_from: {
                string: 'Email',
                widget: 'email'
              },
              _span: {
                _attr: {
                  title: 'By saving this change, the customer email will also be updated.',
                  invisible: [['partner_email_update', '=', false]],
                  class: 'fa fa-exclamation-triangle text-warning oe_edit_only'
                }
              }
            },
            _label_phone: {
              for: 'phone',
              class: 'oe_inline'
            },
            _div_108: {
              _attr: { class: 'o_row o_row_readonly' },
              _button_phone_action_blacklist_remove: {
                _attr: {
                  name: 'phone_action_blacklist_remove',
                  type: 'object',
                  title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                  groups: 'base.group_user',
                  invisible: [['phone_blacklisted', '=', false]],
                  context: { todo_ctx: "{'default_phone': phone}" },
                  class: 'fa fa-ban text-danger'
                }
              },
              phone: { widget: 'phone' },
              _span: {
                _attr: {
                  title: 'By saving this change, the customer phone number will also be updated.',
                  invisible: [['partner_phone_update', '=', false]],
                  class: 'fa fa-exclamation-triangle text-warning oe_edit_only'
                }
              }
            },
            lost_reason_id: { invisible: [['active', '=', true]] },
            date_conversion: { invisible: '1' },
            user_company_ids: { invisible: '1' }
          },
          _group_lead_info: {
            _attr: {
              name: 'lead_info',
              invisible: [['type', '=', 'opportunity']]
            },
            _label_contact_name: { for: 'contact_name' },
            _div: {
              _attr: { class: 'o_row' },
              contact_name: {},
              title: {
                domain: [],
                placeholder: 'Title',
                no_open: true
              }
            },
            is_blacklisted: { invisible: '1' },
            phone_blacklisted: { invisible: '1' },
            email_state: { invisible: '1' },
            phone_state: { invisible: '1' },
            partner_email_update: { invisible: '1' },
            partner_phone_update: { invisible: '1' },
            _label_email_from_group_lead_info: {
              for: 'email_from_group_lead_info',
              class: 'oe_inline'
            },
            _div_655: {
              _attr: { class: 'o_row o_row_readonly' },
              _button_mail_action_blacklist_remove: {
                _attr: {
                  name: 'mail_action_blacklist_remove',
                  type: 'object',
                  title: 'This email is blacklisted for mass mailings. Click to unblacklist.',
                  groups: 'base.group_user',
                  invisible: [['is_blacklisted', '=', false]],
                  context: { todo_ctx: "{'default_email': email_from}" },
                  class: 'fa fa-ban text-danger'
                }
              },
              email_from: {
                string: 'Email',
                widget: 'email'
              },
              _span: {
                _attr: {
                  title: 'By saving this change, the customer email will also be updated.',
                  invisible: [['partner_email_update', '=', false]],
                  class: 'fa fa-exclamation-triangle text-warning oe_edit_only'
                }
              }
            },
            email_cc: { groups: 'base.group_no_one' },
            function: {},
            _label_phone_group_lead_info: {
              for: 'phone_group_lead_info',
              class: 'oe_inline'
            },
            _div_552: {
              _attr: { class: 'o_row o_row_readonly' },
              _button_phone_action_blacklist_remove: {
                _attr: {
                  name: 'phone_action_blacklist_remove',
                  type: 'object',
                  title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                  groups: 'base.group_user',
                  invisible: [['phone_blacklisted', '=', false]],
                  context: { todo_ctx: "{'default_phone': phone}" },
                  class: 'fa fa-ban text-danger'
                }
              },
              phone: { widget: 'phone' },
              _span: {
                _attr: {
                  title: 'By saving this change, the customer phone number will also be updated.',
                  invisible: [['partner_phone_update', '=', false]],
                  class: 'fa fa-exclamation-triangle text-warning oe_edit_only'
                }
              }
            },
            _label_mobile: {
              for: 'mobile',
              class: 'oe_inline'
            },
            _div_574: {
              _attr: { class: 'o_row o_row_readonly' },
              _button_phone_action_blacklist_remove: {
                _attr: {
                  name: 'phone_action_blacklist_remove',
                  type: 'object',
                  title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                  groups: 'base.group_user',
                  invisible: [['mobile_blacklisted', '=', false]],
                  context: { todo_ctx: "{'default_phone': mobile}" },
                  class: 'fa fa-ban text-danger'
                }
              },
              mobile: {
                string: 'Mobile',
                widget: 'phone'
              }
            }
          },
          type: { invisible: '1' },
          _group: {
            _attr: { invisible: [['type', '=', 'lead']] },
            user_id: {
              widget: 'many2one_avatar_user',
              context: { todo_ctx: "{'default_sales_team_id': team_id}" }
            },
            _label_date_deadline: { for: 'date_deadline' },
            _div: {
              _attr: { class: 'o_lead_opportunity_form_inline_fields' },
              date_deadline: { class: 'oe_inline' },
              priority: {
                widget: 'priority',
                class: 'oe_inline align-top'
              }
            },
            tag_ids: {
              widget: 'many2many_tags',
              color_field: 'color',
              no_create_edit: true
            }
          },
          _group_393: {
            _attr: { invisible: [['type', '=', 'opportunity']] },
            user_id: {
              widget: 'many2one_avatar_user',
              context: { todo_ctx: "{'default_sales_team_id': team_id}" }
            },
            team_id: {
              no_open: true,
              no_create: true
            }
          },
          _group_lead_priority: {
            _attr: {
              name: 'lead_priority',
              invisible: [['type', '=', 'opportunity']]
            },
            priority: { widget: 'priority' },
            tag_ids: {
              widget: 'many2many_tags',
              color_field: 'color',
              no_create_edit: true
            }
          }
        },
        lead_properties: { invisible: [['team_id', '=', false]] },
        _notebook: {
          _page_internal_notes: {
            _attr: {
              name: 'internal_notes',
              string: 'Internal Notes'
            },
            description: {
              placeholder: 'Add a description...',
              options: "{'collaborative': true}"
            }
          },
          _page_extra: {
            _attr: {
              name: 'extra',
              string: 'Extra Info',
              invisible: [['type', '=', 'opportunity']]
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Email',
                  groups: 'base.group_no_one'
                },
                message_bounce: { readonly: '1' }
              },
              _group_categorization: {
                _attr: {
                  name: 'categorization',
                  string: 'Marketing'
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                campaign_id: {
                  create_name_field: 'title',
                  always_reload: true
                },
                medium_id: {},
                source_id: {},
                referred: {}
              },
              _group_647: {
                _attr: { string: 'Analysis' },
                date_open: {},
                date_closed: {}
              }
            }
          },
          _page_lead: {
            _attr: {
              name: 'lead',
              string: 'Extra Information',
              invisible: [['type', '=', 'lead']]
            },
            _group: {
              _group: {
                _attr: { string: 'Contact Information' },
                partner_name: {},
                _label_street_page_lead: {
                  for: 'street_page_lead',
                  string: 'Address'
                },
                _div: {
                  _attr: { class: 'o_address_format' },
                  street: {
                    class: 'o_address_street',
                    placeholder: 'Street...'
                  },
                  street2: {
                    class: 'o_address_street',
                    placeholder: 'Street 2...'
                  },
                  city: {
                    class: 'o_address_city',
                    placeholder: 'City'
                  },
                  state_id: {
                    class: 'o_address_state',
                    placeholder: 'State',
                    no_open: true
                  },
                  zip: {
                    class: 'o_address_zip',
                    placeholder: 'ZIP'
                  },
                  country_id: {
                    class: 'o_address_country',
                    placeholder: 'Country',
                    no_open: true,
                    no_create: true
                  }
                },
                website: {
                  widget: 'url',
                  placeholder: 'e.g. https://www.odoo.com'
                },
                lang_active_count: { invisible: '1' },
                lang_id: {
                  invisible: [['lang_active_count', '<=', 1]],
                  no_quick_create: true,
                  no_create_edit: true,
                  no_open: true
                }
              },
              _group_187: {
                _attr: { class: 'mt48' },
                _label_contact_name_page_lead: { for: 'contact_name_page_lead' },
                _div: {
                  _attr: { class: 'o_row' },
                  contact_name: {},
                  title: {
                    domain: [],
                    placeholder: 'Title',
                    no_open: true
                  }
                },
                function: {},
                _label_mobile_page_lead: {
                  for: 'mobile_page_lead',
                  class: 'oe_inline'
                },
                _div_506: {
                  _attr: { class: 'o_row o_row_readonly' },
                  _button_phone_action_blacklist_remove: {
                    _attr: {
                      name: 'phone_action_blacklist_remove',
                      type: 'object',
                      title: 'This phone number is blacklisted for SMS Marketing. Click to unblacklist.',
                      groups: 'base.group_user',
                      invisible: [['mobile_blacklisted', '=', false]],
                      context: { todo_ctx: "{'default_phone': mobile}" },
                      class: 'fa fa-ban text-danger'
                    }
                  },
                  mobile: { widget: 'phone' }
                }
              },
              _group_447: {
                _attr: { string: 'Marketing' },
                campaign_id: {
                  create_name_field: 'title',
                  always_reload: true
                },
                medium_id: {},
                source_id: {},
                referred: {}
              },
              _group_Misc: {
                _attr: {
                  name: 'Misc',
                  string: 'Tracking'
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                team_id: {
                  no_open: true,
                  no_create: true
                },
                day_open: {},
                day_close: {},
                type: { invisible: '1' }
              }
            }
          }
        }
      }
    }
  },

  crm_case_tree_view_leads: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        user_company_ids: { invisible: '1' },
        date_deadline: { invisible: '1' },
        create_date: { optional: 'hide' },
        name: {
          string: 'Lead',
          readonly: '1'
        },
        contact_name: { optional: 'hide' },
        partner_name: { optional: 'hide' },
        email_from: { optional: 'show' },
        phone: {
          class: 'o_force_ltr',
          optional: 'show'
        },
        _field_company_id_532: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'show'
          }
        },
        city: { optional: 'show' },
        state_id: { optional: 'hide' },
        country_id: {
          optional: 'show',
          no_open: true,
          no_create: true
        },
        partner_id: { invisible: '1' },
        user_id: {
          widget: 'many2one_avatar_user',
          domain: [['share', '=', false]],
          optional: 'show'
        },
        team_id: { optional: 'show' },
        active: { invisible: '1' },
        campaign_id: { optional: 'hide' },
        referred: { invisible: '1' },
        medium_id: { optional: 'hide' },
        source_id: { optional: 'hide' },
        probability: {
          string: 'Probability (%)',
          optional: 'hide'
        },
        message_needaction: { invisible: '1' },
        tag_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color'
        },
        priority: { optional: 'hide' }
      }
    }
  },

  view_crm_lead_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_case_calendar_view_leads: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  quick_create_opportunity_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          partner_id: {
            string: 'Organization / Contact',
            widget: 'res_partner_many2one',
            context: { todo_ctx: "{                             'res_partner_search_mode': type == 'opportunity' and 'customer' or False,                             'default_name': contact_name or partner_name,                             'default_is_company': type == 'opportunity' and contact_name == False,                             'default_company_name': type == 'opportunity' and partner_name,                             'default_phone': phone,                             'default_email': email_from,                             'default_user_id': user_id,                             'default_team_id': team_id,                             'show_vat': True}" }
          },
          name: { placeholder: 'e.g. Product Pricing' },
          email_from: { string: 'Email' },
          phone: { string: 'Phone' },
          _label_expected_revenue: { for: 'expected_revenue' },
          _div: {
            _div: {
              _attr: { class: 'o_row' },
              expected_revenue: {
                widget: 'monetary',
                class: 'oe_inline me-5',
                currency_field: 'company_currency'
              },
              priority: {
                widget: 'priority',
                class: 'oe_inline'
              }
            },
            _div_756: {
              _attr: {
                groups: 'crm.group_use_recurring_revenues',
                class: 'o_row'
              },
              recurring_revenue: {
                widget: 'monetary',
                class: 'oe_inline',
                currency_field: 'company_currency'
              },
              recurring_plan: {
                required: [['recurring_revenue', '!=', 0]],
                class: 'oe_inline',
                placeholder: 'E.g. Monthly',
                no_create: true,
                no_open: true
              }
            }
          },
          company_currency: { invisible: '1' },
          company_id: { invisible: '1' },
          user_id: { invisible: '1' },
          user_company_ids: { invisible: '1' },
          team_id: { invisible: '1' },
          type: { invisible: '1' },
          partner_name: { invisible: '1' },
          contact_name: { invisible: '1' },
          country_id: { invisible: '1' },
          state_id: { invisible: '1' },
          city: { invisible: '1' },
          street: { invisible: '1' },
          street2: { invisible: '1' },
          zip: { invisible: '1' },
          mobile: { invisible: '1' },
          website: { invisible: '1' },
          function: { invisible: '1' },
          title: { invisible: '1' },
          activity_ids: { invisible: '1' }
        }
      }
    }
  },

  crm_lead_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_case_kanban_view_leads: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_lead_view_kanban_forecast: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    inherit_id: 'crm.crm_case_kanban_view_leads',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'attributes'
          },
          _attribute_default_group_by: {
            _attr: {
              name: 'default_group_by',
              text: 'date_deadline',
              default_group_by: 'date_deadline'
            }
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'forecast_kanban',
              js_class: 'forecast_kanban'
            }
          }
        },
        _xpath_186: {
          _attr: {
            expr: '//kanban',
            position: 'inside'
          },
          date_deadline: {}
        },
        _xpath_103: {
          _attr: {
            expr: "//field[@name='expected_revenue']",
            position: 'replace'
          },
          prorated_revenue: {}
        },
        _xpath_200: {
          _attr: {
            expr: '//progressbar',
            position: 'attributes'
          },
          _attribute_sum_field: {
            _attr: {
              name: 'sum_field',
              text: 'prorated_revenue',
              sum_field: 'prorated_revenue'
            }
          }
        },
        _xpath_836: {
          _attr: {
            expr: "//t[@t-set='lost_ribbon']",
            position: 'after'
          },
          _t: {}
        },
        _xpath_277: {
          _attr: {
            expr: "//div[contains(@t-attf-class, 'oe_kanban_card')]",
            position: 'attributes'
          },
          _attribute_t$dash$attf$dash$class: {
            _attr: {
              name: 't-attf-class',
              text: "#{!selection_mode ? kanban_color(record.color.raw_value) : ''}\n                        #{lost_ribbon || won_ribbon ? 'oe_kanban_card_ribbon' : ''}\n                        oe_kanban_global_click oe_kanban_card d-flex flex-column",
              t-attf-class: "#{!selection_mode ? kanban_color(record.color.raw_value) : ''}\n                        #{lost_ribbon || won_ribbon ? 'oe_kanban_card_ribbon' : ''}\n                        oe_kanban_global_click oe_kanban_card d-flex flex-column"
            }
          }
        },
        _xpath_894: {
          _attr: {
            expr: "//div[hasclass('ribbon')]",
            position: 'replace'
          },
          _div: {
            _attr: {
              invisible: ['&', '|', ['probability', '>', 0], ['active', '=', true], '|', ['probability', '<', 100], ['active', '=', false]],
              class: 'ribbon ribbon-top-right'
            },
            _span: {
              _attr: {
                class: 'bg-success',
                text: 'Won'
              }
            },
            _span_131: {
              _attr: {
                class: 'bg-danger',
                text: 'Lost'
              }
            }
          }
        },
        _xpath_726: {
          _attr: {
            expr: "//div[hasclass('o_kanban_record_subtitle')]",
            position: 'replace'
          },
          _div: {
            _attr: { class: 'o_kanban_record_subtitle' },
            _t: {
              prorated_revenue: {
                widget: 'monetary',
                currency_field: 'company_currency'
              },
              _span: {
                _attr: {
                  groups: 'crm.group_use_recurring_revenues',
                  text: '+'
                }
              }
            },
            _t_990: {
              recurring_revenue: {
                widget: 'monetary',
                groups: 'crm.group_use_recurring_revenues',
                currency_field: 'company_currency'
              },
              recurring_plan: { groups: 'crm.group_use_recurring_revenues' }
            }
          }
        }
      }
    }
  },

  view_crm_case_leads_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'search',
    arch: {
      name: {
        string: 'Lead',
        filter_domain: { todo_ctx: "['|','|','|',('partner_name', 'ilike', self),('email_from', 'ilike', self), ('contact_name', 'ilike', self), ('name', 'ilike', self)]" }
      },
      tag_ids: {
        string: 'Tag',
        filter_domain: { todo_ctx: "[('tag_ids', 'ilike', self)]" }
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
      activity_state: {},
      _separator: {},
      _filter_assigned_to_me: {
        _attr: {
          name: 'assigned_to_me',
          string: 'My Leads',
          help: 'Leads that are assigned to me',
          domain: { todo_ctx: "[('user_id', '=', uid)]" }
        }
      },
      _filter_unassigned_leads: {
        _attr: {
          name: 'unassigned_leads',
          string: 'Unassigned',
          help: 'Leads that are not assigned',
          domain: [['user_id', '=', false], ['type', '=', 'lead']]
        }
      },
      _separator_623: {},
      _filter_lost: {
        _attr: {
          name: 'lost',
          string: 'Lost',
          domain: ['&', ['probability', '=', 0], ['active', '=', false]]
        }
      },
      _separator_554: {},
      _filter_filter_creation_date: {
        _attr: {
          name: 'filter_creation_date',
          string: 'Creation Date',
          date: 'create_date'
        }
      },
      _filter_filter_date_closed: {
        _attr: {
          name: 'filter_date_closed',
          date: 'date_closed'
        }
      },
      _separator_123: {},
      _separator_412: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all opportunities for which the next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _separator_359: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            context: { group_by: 'user_id' }
          }
        },
        _filter_saleschannel: {
          _attr: {
            name: 'saleschannel',
            string: 'Sales Team',
            context: { group_by: 'team_id' }
          }
        },
        _filter_city: {
          _attr: {
            name: 'city',
            string: 'City',
            context: { group_by: 'city' }
          }
        },
        _filter_country: {
          _attr: {
            name: 'country',
            string: 'Country',
            context: { group_by: 'country_id' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            context: { group_by: 'company_id' }
          }
        },
        _filter_compaign: {
          _attr: {
            name: 'compaign',
            string: 'Campaign',
            domain: [],
            context: { group_by: 'campaign_id' }
          }
        },
        _filter_medium: {
          _attr: {
            name: 'medium',
            string: 'Medium',
            domain: [],
            context: { group_by: 'medium_id' }
          }
        },
        _filter_source: {
          _attr: {
            name: 'source',
            string: 'Source',
            domain: [],
            context: { group_by: 'source_id' }
          }
        },
        _separator: {},
        _filter_month: {
          _attr: {
            name: 'month',
            string: 'Creation Date',
            context: { group_by: 'create_date:month' }
          }
        },
        _filter_date_closed: {
          _attr: {
            name: 'date_closed',
            string: 'Closed Date',
            context: { group_by: 'date_closed' }
          }
        }
      }
    }
  },

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
        company_id: { invisible: '1' },
        user_company_ids: { invisible: '1' },
        date_deadline: { invisible: '1' },
        create_date: { optional: 'hide' },
        name: {
          string: 'Opportunity',
          readonly: '1'
        },
        partner_id: { optional: 'hide' },
        contact_name: { optional: 'show' },
        email_from: {},
        phone: { class: 'o_force_ltr' },
        _field_company_id_941: {
          company_id: {
            groups: 'base.group_multi_company',
            optional: 'show'
          }
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
        priority: {
          widget: 'priority',
          optional: 'hide'
        },
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
            invisible: ['|', ['my_activity_date_deadline', '=', false], ['activity_calendar_event_id', '=', false]],
            class: 'text-warning'
          }
        },
        _button_action_snooze: {
          _attr: {
            name: 'action_snooze',
            type: 'object',
            string: 'Snooze 7d',
            icon: 'fa-bell-slash',
            invisible: ['|', ['my_activity_date_deadline', '=', false], ['activity_calendar_event_id', '!=', false]],
            class: 'text-warning'
          }
        }
      }
    }
  },

  crm_lead_view_tree_forecast: {
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
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'forecast_list',
              js_class: 'forecast_list'
            }
          }
        },
        _xpath_975: {
          _attr: {
            expr: "//field[@name='expected_revenue']",
            position: 'attributes'
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'hide',
              optional: 'hide'
            }
          }
        },
        _xpath_973: {
          _attr: {
            expr: "//field[@name='expected_revenue']",
            position: 'after'
          },
          prorated_revenue: {
            widget: 'monetary',
            optional: 'show',
            currency_field: 'company_currency'
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

  view_crm_case_my_activities_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    inherit_id: 'crm.view_crm_case_leads_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='activities_overdue']",
            position: 'replace'
          },
          _filter_activities_overdue: {
            _attr: {
              name: 'activities_overdue',
              string: 'Late Activities',
              help: 'Show all opportunities for which the next action date is before today',
              domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
            }
          }
        },
        _xpath_900: {
          _attr: {
            expr: "//filter[@name='activities_today']",
            position: 'replace'
          },
          _filter_activities_today: {
            _attr: {
              name: 'activities_today',
              string: 'Today Activities',
              domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
            }
          }
        },
        _xpath_940: {
          _attr: {
            expr: "//filter[@name='activities_upcoming_all']",
            position: 'replace'
          },
          _filter_activities_upcoming_all: {
            _attr: {
              name: 'activities_upcoming_all',
              string: 'Future Activities',
              domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
            }
          }
        },
        _xpath_181: {
          _attr: {
            expr: "//filter[@name='assigned_to_me']",
            position: 'replace'
          },
          _filter_assigned_to_me: {
            _attr: {
              name: 'assigned_to_me',
              string: 'My Activities',
              help: 'Opportunities that are assigned to me',
              domain: { todo_ctx: "[('activity_user_id','=',uid)]" }
            }
          }
        }
      }
    }
  },

  crm_lead_view_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_lead_view_graph_forecast: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_lead_view_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  crm_lead_view_pivot_forecast: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'otherview',
    arch: {}
  },

  view_crm_case_opportunities_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    type: 'search',
    arch: {
      name: {
        string: 'Opportunity',
        filter_domain: { todo_ctx: "[                         '|', '|', '|', '|',                         ('partner_id', 'ilike', self),                         ('partner_name', 'ilike', self),                         ('email_from', 'ilike', self),                         ('name', 'ilike', self),                         ('contact_name', 'ilike', self)]" }
      },
      partner_id: {
        string: 'Customer',
        filter_domain: { todo_ctx: "[                         '|', '|', '|',                         ('partner_id', 'ilike', self),                         ('partner_name', 'ilike', self),                         ('email_from', 'ilike', self),                         ('contact_name', 'ilike', self)]" },
        operator: 'child_of'
      },
      tag_ids: {
        string: 'Tag',
        filter_domain: { todo_ctx: "[('tag_ids', 'ilike', self)]" }
      },
      user_id: {},
      team_id: {},
      stage_id: { domain: [] },
      country_id: {},
      city: {},
      phone_mobile_search: {},
      activity_state: {},
      _separator: {},
      _filter_assigned_to_me: {
        _attr: {
          name: 'assigned_to_me',
          string: 'My Pipeline',
          help: 'Opportunities that are assigned to me',
          domain: { todo_ctx: "[('user_id', '=', uid)]" }
        }
      },
      _filter_unassigned: {
        _attr: {
          name: 'unassigned',
          string: 'Unassigned',
          help: 'No salesperson',
          domain: [['user_id', '=', false]]
        }
      },
      _filter_open_opportunities: {
        _attr: {
          name: 'open_opportunities',
          string: 'Open Opportunities',
          help: 'Open Opportunities',
          domain: [['probability', '<', 100], ['type', '=', 'opportunity']]
        }
      },
      _separator_745: {},
      _filter_message_needaction: {
        _attr: {
          name: 'message_needaction',
          string: 'Unread Messages',
          domain: [['message_needaction', '=', true]]
        }
      },
      _separator_211: {},
      _filter_creation_date: {
        _attr: {
          name: 'creation_date',
          string: 'Creation Date',
          date: 'create_date'
        }
      },
      _filter_close_date: {
        _attr: {
          name: 'close_date',
          string: 'Closed Date',
          date: 'date_closed'
        }
      },
      _separator_419: {},
      _filter_won: {
        _attr: {
          name: 'won',
          string: 'Won',
          domain: ['&', ['active', '=', true], ['stage_id.is_won', '=', true]]
        }
      },
      _filter_lost: {
        _attr: {
          name: 'lost',
          string: 'Lost',
          domain: ['&', ['active', '=', false], ['probability', '=', 0]]
        }
      },
      _separator_734: {},
      _filter_overdue_opp: {
        _attr: {
          name: 'overdue_opp',
          string: 'Overdue Opportunities',
          invisible: '1',
          domain: { todo_ctx: "['&', ('date_closed', '=', False), ('date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all opportunities for which the next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _separator_193: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            context: { group_by: 'user_id' }
          }
        },
        _filter_saleschannel: {
          _attr: {
            name: 'saleschannel',
            string: 'Sales Team',
            context: { group_by: 'team_id' }
          }
        },
        _filter_stage: {
          _attr: {
            name: 'stage',
            string: 'Stage',
            context: { group_by: 'stage_id' }
          }
        },
        _filter_city: {
          _attr: {
            name: 'city',
            string: 'City',
            context: { group_by: 'city' }
          }
        },
        _filter_country: {
          _attr: {
            name: 'country',
            string: 'Country',
            context: { group_by: 'country_id' }
          }
        },
        _filter_lostreason: {
          _attr: {
            name: 'lostreason',
            string: 'Lost Reason',
            context: { group_by: 'lost_reason_id' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            context: { group_by: 'company_id' }
          }
        },
        _filter_compaign: {
          _attr: {
            name: 'compaign',
            string: 'Campaign',
            domain: [],
            context: { group_by: 'campaign_id' }
          }
        },
        _filter_medium: {
          _attr: {
            name: 'medium',
            string: 'Medium',
            domain: [],
            context: { group_by: 'medium_id' }
          }
        },
        _filter_source: {
          _attr: {
            name: 'source',
            string: 'Source',
            domain: [],
            context: { group_by: 'source_id' }
          }
        },
        _separator: {},
        _filter_month: {
          _attr: {
            name: 'month',
            string: 'Creation Date',
            invisible: "context.get['crm_lead_view_hide_month']",
            context: { group_by: 'create_date:month' }
          }
        },
        _filter_group_by_create_date_day: {
          _attr: {
            name: 'group_by_create_date_day',
            string: 'Creation Date',
            invisible: "not context.get['crm_lead_view_hide_month']",
            context: { group_by: 'create_date:day' }
          }
        },
        _filter_date_conversion: {
          _attr: {
            name: 'date_conversion',
            string: 'Conversion Date',
            groups: 'crm.group_use_lead',
            context: { group_by: 'date_conversion' }
          }
        },
        _filter_date_deadline: {
          _attr: {
            name: 'date_deadline',
            string: 'Expected Closing',
            context: { group_by: 'date_deadline' }
          }
        },
        _filter_date_closed: {
          _attr: {
            name: 'date_closed',
            string: 'Closed Date',
            context: { group_by: 'date_closed' }
          }
        }
      }
    }
  },

  crm_lead_view_search_forecast: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead',
    inherit_id: 'crm.view_crm_case_opportunities_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='assigned_to_me']",
            position: 'before'
          },
          _filter_forecast: {
            _attr: {
              name: 'forecast',
              string: 'Upcoming Closings',
              context: { forecast_filter: 1 }
            }
          },
          _separator: {}
        },
        _xpath_193: {
          _attr: {
            expr: "//filter[@name='date_deadline']",
            position: 'replace'
          }
        },
        _filter_month: {
          _attr: {
            name: 'month',
            position: 'before'
          },
          _filter_date_deadline: {
            _attr: {
              name: 'date_deadline',
              string: 'Expected Closing',
              context: { group_by: 'date_deadline:month' }
            }
          }
        }
      }
    }
  },

  crm_lead_all_leads: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Leads',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_leads_filter',
    domain: "['|', ['type','=','lead'], ['type','=',False]]",
    context: { todo_ctx: "{\n                    'default_type':'lead',\n                    'search_default_type': 'lead',\n                    'search_default_to_process':1,\n                }\n            " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_lead_all_leads_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm_case_tree_view_leads',
    act_window_id: 'crm_lead_all_leads'
  },

  crm_lead_all_leads_view_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'view_crm_lead_kanban',
    act_window_id: 'crm_lead_all_leads'
  },

  crm_lead_all_leads_view_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'crm_case_calendar_view_leads',
    act_window_id: 'crm_lead_all_leads'
  },

  crm_lead_all_leads_view_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'crm_lead_view_pivot',
    act_window_id: 'crm_lead_all_leads'
  },

  crm_lead_all_leads_view_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'crm_lead_view_graph',
    act_window_id: 'crm_lead_all_leads'
  },

  crm_lead_action_my_activities: {
    _odoo_model: 'ir.actions.act_window',
    name: 'My Activities',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_my_activities_filter',
    domain: "[['activity_ids','!=',False]]",
    context: { todo_ctx: "{'default_type': 'opportunity',\n                    'search_default_assigned_to_me': 1}\n            " },
    views: {
      tree: 'crm_lead_view_list_activities',
      form: '=======todo=========='
    }
  },

  crm_lead_action_my_activities_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm.crm_lead_view_list_activities',
    act_window_id: 'crm_lead_action_my_activities'
  },

  crm_lead_opportunities: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Opportunities',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_opportunities_filter',
    domain: "[['type','=','opportunity']]",
    context: { todo_ctx: "{\n                    'default_type': 'opportunity',\n                }\n            " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_lead_opportunities_view_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'crm_case_kanban_view_leads',
    act_window_id: 'crm_lead_opportunities'
  },

  crm_lead_opportunities_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm.crm_case_tree_view_oppor',
    act_window_id: 'crm_lead_opportunities'
  },

  crm_lead_opportunities_view_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'crm_lead_view_graph',
    act_window_id: 'crm_lead_opportunities'
  },

  crm_lead_opportunities_view_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'crm_lead_view_pivot',
    act_window_id: 'crm_lead_opportunities'
  },

  crm_lead_opportunities_view_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'crm_case_calendar_view_leads',
    act_window_id: 'crm_lead_opportunities'
  },

  crm_lead_action_pipeline: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Pipeline',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_opportunities_filter',
    domain: "[['type','=','opportunity']]",
    context: {
      default_type: 'opportunity',
      search_default_assigned_to_me: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_lead_action_pipeline_view_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'crm_case_kanban_view_leads',
    act_window_id: 'crm_lead_action_pipeline'
  },

  crm_lead_action_pipeline_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm.crm_case_tree_view_oppor',
    act_window_id: 'crm_lead_action_pipeline'
  },

  crm_lead_action_pipeline_view_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'crm_case_calendar_view_leads',
    act_window_id: 'crm_lead_action_pipeline'
  },

  crm_lead_action_pipeline_view_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'crm_lead_view_pivot',
    act_window_id: 'crm_lead_action_pipeline'
  },

  crm_lead_action_pipeline_view_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'crm_lead_view_graph',
    act_window_id: 'crm_lead_action_pipeline'
  },

  crm_lead_action_forecast: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Forecast',
    res_model: 'crm.lead',
    search_view_id: 'crm.crm_lead_view_search_forecast',
    domain: "[['type', '=', 'opportunity']]",
    context: {
      default_type: 'opportunity',
      search_default_assigned_to_me: 1,
      search_default_forecast: 1,
      search_default_date_deadline: 1,
      forecast_field: 'date_deadline'
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_lead_action_forecast_view_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'crm_lead_view_kanban_forecast',
    act_window_id: 'crm_lead_action_forecast'
  },

  crm_lead_action_forecast_view_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'crm_lead_view_graph_forecast',
    act_window_id: 'crm_lead_action_forecast'
  },

  crm_lead_action_forecast_view_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'crm_lead_view_pivot_forecast',
    act_window_id: 'crm_lead_action_forecast'
  },

  crm_lead_action_forecast_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'crm_lead_view_tree_forecast',
    act_window_id: 'crm_lead_action_forecast'
  },

  crm_lead_action_open_lead_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'New Lead',
    type: 'ir.actions.act_window',
    res_model: 'crm.lead',
    search_view_id: 'crm.view_crm_case_leads_filter',
    domain: "[['type','=','lead']]",
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n                'default_type': 'lead',\n            }" },
    views: {
      tree: 'crm_lead_view_form',
      form: '=======todo=========='
    }
  }
}
