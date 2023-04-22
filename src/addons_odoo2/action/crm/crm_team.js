export default {
  crm_team_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_tree',
    arch: {
      sheet: {
        name: {
          position: 'after',
          __todo__after: {
            alias_id: { string: 'Alias' }
          }
        }
      }
    }
  },

  sales_team_form_view_in_crm: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//sheet',
            position: 'before'
          },
          use_leads: { invisible: '1' },
          _header: {
            _button_action_assign_leads: {
              _attr: {
                name: 'action_assign_leads',
                type: 'object',
                string: 'Assign Leads',
                invisible: ['|', '&', ['use_leads', '=', false], ['use_opportunities', '=', false], ['assignment_enabled', '=', false]],
                class: 'oe_highlight'
              }
            }
          }
        },
        _xpath_458: {
          _attr: {
            expr: "//div[@name='options_active']",
            position: 'inside'
          },
          _div: {
            _attr: { class: 'o_row' },
            _span_opportunities: {
              _attr: { name: 'opportunities' },
              use_opportunities: {},
              _label_use_opportunities: { for: 'use_opportunities' }
            },
            _span: {
              _attr: {
                groups: 'crm.group_use_lead',
                class: 'o_row'
              },
              use_leads: {},
              _label_use_leads: {
                for: 'use_leads',
                string: 'Leads'
              }
            }
          }
        },
        _xpath_601: {
          _attr: {
            expr: "//field[@name='user_id']",
            position: 'after'
          },
          _label_alias_name: {
            for: 'alias_name',
            string: 'Email Alias',
            invisible: [['use_leads', '=', false], ['use_opportunities', '=', false]]
          },
          _div_alias_def: {
            _attr: {
              name: 'alias_def',
              invisible: [['use_leads', '=', false], ['use_opportunities', '=', false]],
              class: 'oe_inline'
            },
            alias_id: {
              string: 'Email Alias',
              invisible: [['alias_domain', '=', false]],
              class: 'oe_read_only oe_inline',
              required: '0'
            },
            _div_edit_alias: {
              _attr: {
                name: 'edit_alias',
                class: 'oe_inline'
              },
              _div: {
                _attr: {
                  invisible: [['alias_domain', '=', false]],
                  class: 'oe_edit_only',
                  text: '@'
                },
                alias_name: { class: 'oe_inline' },
                alias_domain: {
                  class: 'oe_inline',
                  readonly: '1'
                }
              },
              _button_base_setup__action_general_configuration: {
                _attr: {
                  name: 'base_setup.action_general_configuration',
                  type: 'action',
                  string: 'Configure a custom domain',
                  icon: 'fa-arrow-right',
                  invisible: [['alias_domain', '!=', false]],
                  class: 'p-0 btn-link'
                }
              }
            }
          },
          alias_contact: {
            string: 'Accept Emails From',
            invisible: [['use_leads', '=', false], ['use_opportunities', '=', false]]
          }
        },
        _xpath_303: {
          _attr: {
            expr: "//group[@name='right']",
            position: 'attributes'
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Assignment Rules',
              string: 'Assignment Rules'
            }
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('assignment_enabled', '=', False)]}",
              attrs: "{'invisible': [('assignment_enabled', '=', False)]}"
            }
          }
        },
        _xpath_325: {
          _attr: {
            expr: "//group[@name='right']",
            position: 'inside'
          },
          assignment_enabled: { invisible: '1' },
          assignment_auto_enabled: { invisible: '1' },
          assignment_domain: {
            string: 'Domain',
            widget: 'domain',
            invisible: [['assignment_enabled', '=', false]],
            model: 'crm.lead',
            in_dialog: true
          },
          _label_lead_all_assigned_month_count: {
            for: 'lead_all_assigned_month_count',
            string: 'Assigned Leads Count',
            invisible: [['assignment_enabled', '=', false]]
          },
          _div: {
            _attr: {
              invisible: [['assignment_enabled', '=', false]],
              text: '/'
            },
            lead_all_assigned_month_count: { class: 'oe_inline' },
            assignment_max: { class: 'oe_inline' }
          },
          assignment_optout: { invisible: [['assignment_auto_enabled', '=', false]] }
        },
        _xpath_914: {
          _attr: {
            expr: "//field[@name='member_ids']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('assignment_enabled', '=', True)]}",
              attrs: "{'invisible': [('assignment_enabled', '=', True)]}"
            }
          }
        },
        _xpath_677: {
          _attr: {
            expr: "//field[@name='crm_team_member_ids']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('assignment_enabled', '=', False)]}",
              attrs: "{'invisible': [('assignment_enabled', '=', False)]}"
            }
          }
        }
      }
    }
  },

  crm_team_view_kanban_dashboard: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    inherit_id: 'sales_team.crm_team_view_kanban_dashboard',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: '//templates',
              position: 'before'
            },
            alias_id: {},
            alias_name: {},
            alias_domain: {},
            use_opportunities: {},
            use_leads: {}
          },
          _xpath_629: {
            _attr: {
              expr: "//div[hasclass('o_primary')]",
              position: 'after'
            },
            _div: {
              _span: {
                _attr: { text: '&nbsp;' },
                _i: {
                  _attr: {
                    title: 'Leads',
                    class: 'fa fa-envelope-o'
                  }
                },
                alias_id: {}
              }
            }
          },
          _xpath_965: {
            _attr: {
              expr: "//t[@name='first_options']",
              position: 'after'
            },
            _div: {
              _attr: { class: 'row' },
              _div: {
                _attr: { class: 'col-8' },
                _a_crm_case_form_view_salesteams_lead: {
                  _attr: {
                    name: '%(crm_case_form_view_salesteams_lead)d',
                    type: 'action',
                    context: { search_default_unassigned_leads: 1 }
                  },
                  lead_unassigned_count: { class: 'me-1' },
                  _t: 'Unassigned Lead',
                  _t_986: 'Unassigned Leads'
                }
              }
            },
            _div_849: {
              _attr: { class: 'row' },
              _div: {
                _attr: { class: 'col-8' },
                _a_crm_case_form_view_salesteams_opportunity: {
                  _attr: {
                    name: '%(crm_case_form_view_salesteams_opportunity)d',
                    type: 'action',
                    context: { search_default_open_opportunities: true }
                  },
                  opportunities_count: { class: 'me-1' },
                  _t: 'Open Opportunity',
                  _t_226: 'Open Opportunities'
                }
              },
              _div_774: {
                _attr: { class: 'col-4 text-end text-truncate' },
                opportunities_amount: {
                  widget: 'monetary',
                  currency_field: 'currency_id'
                }
              }
            },
            _div_359: {
              _attr: { class: 'row' },
              _div: {
                _attr: { class: 'col-8' },
                _a_crm_lead_action_team_overdue_opportunity: {
                  _attr: {
                    name: '%(crm_lead_action_team_overdue_opportunity)d',
                    type: 'action'
                  },
                  opportunities_overdue_count: { class: 'me-1' },
                  _t: 'Overdue Opportunity',
                  _t_662: 'Overdue Opportunities'
                }
              },
              _div_965: {
                _attr: { class: 'col-4 text-end text-truncate' },
                opportunities_overdue_amount: {
                  widget: 'monetary',
                  currency_field: 'currency_id'
                }
              }
            }
          },
          _xpath_498: {
            _attr: {
              expr: "//div[hasclass('o_kanban_manage_view')]/div[hasclass('o_kanban_card_manage_title')]",
              position: 'after'
            },
            _div: {
              _attr: { groups: 'crm.group_use_lead' },
              _a_crm_case_form_view_salesteams_lead: {
                _attr: {
                  name: '%(crm_case_form_view_salesteams_lead)d',
                  type: 'action',
                  text: 'Leads'
                }
              }
            },
            _div_404: {
              _a_crm_case_form_view_salesteams_opportunity: {
                _attr: {
                  name: '%(crm_case_form_view_salesteams_opportunity)d',
                  type: 'action',
                  text: 'Opportunities'
                }
              }
            }
          },
          _xpath_367: {
            _attr: {
              expr: "//div[hasclass('o_kanban_manage_new')]/div[hasclass('o_kanban_card_manage_title')]",
              position: 'after'
            },
            _div: {
              _attr: { groups: 'crm.group_use_lead' },
              _a_crm_lead_action_open_lead_form: {
                _attr: {
                  name: '%(crm_lead_action_open_lead_form)d',
                  type: 'action',
                  text: 'Leads'
                }
              }
            },
            _div_956: {
              _a_action_opportunity_form: {
                _attr: {
                  name: '%(action_opportunity_form)d',
                  type: 'action',
                  text: 'Opportunity'
                }
              }
            }
          },
          _xpath_889: {
            _attr: {
              expr: "//div[hasclass('o_kanban_manage_reports')]/div[hasclass('o_kanban_card_manage_title')]",
              position: 'after'
            },
            _div: {
              _attr: { groups: 'crm.group_use_lead' },
              _a_action_report_crm_lead_salesteam: {
                _attr: {
                  name: '%(action_report_crm_lead_salesteam)d',
                  type: 'action',
                  text: 'Leads'
                }
              }
            },
            _div_414: {
              _a_action_report_crm_opportunity_salesteam: {
                _attr: {
                  name: '%(action_report_crm_opportunity_salesteam)d',
                  type: 'action',
                  text: 'Opportunities'
                }
              }
            }
          },
          _xpath_637: {
            _attr: {
              expr: "//div[hasclass('o_kanban_manage_reports')]/div[@name='o_team_kanban_report_separator']",
              position: 'after'
            },
            _div_activity_report: {
              _attr: { name: 'activity_report' },
              _div: {
                _a_crm__crm_activity_report_action_team: {
                  _attr: {
                    name: '%(crm.crm_activity_report_action_team)d',
                    type: 'action',
                    text: 'Activities'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
