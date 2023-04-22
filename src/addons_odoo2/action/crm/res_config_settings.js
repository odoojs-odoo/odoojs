export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('settings')]",
            position: 'inside'
          },
          _div: {
            _attr: {
              string: 'CRM',
              groups: 'sales_team.group_sale_manager',
              class: 'app_settings_block'
            },
            _h2: 'CRM',
            _div: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: { class: 'col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_use_recurring_revenues: {}
                },
                _div_567: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_use_recurring_revenues: { for: 'group_use_recurring_revenues' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Define recurring plans and revenues on Opportunities'
                    }
                  },
                  _div_215: {
                    _attr: { invisible: [['group_use_recurring_revenues', '=', false]] },
                    _button_m__crm_recurring_plan_acti: {
                      _attr: {
                        name: 'm.crm_recurring_plan_acti',
                        type: 'action',
                        string: 'Manage Recurring Plans',
                        icon: 'fa-arrow-right',
                        class: 'oe_link'
                      }
                    }
                  }
                }
              },
              _div_114: {
                _attr: {
                  title: 'Use leads if you need a qualification step before creating an opportunity or a customer. It can be a business card you received, a contact form filled in your website, or a file of unqualified prospects you import, etc. Once qualified, the lead can be converted into a business opportunity and/or a new customer in your address book.',
                  class: 'col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_use_lead: {}
                },
                _div_463: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_use_lead: { for: 'group_use_lead' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add a qualification step before the creation of an opportunity'
                    }
                  }
                }
              }
            },
            _div_645: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  is_membership_multi: {}
                },
                _div_467: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_is_membership_multi: { for: 'is_membership_multi' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Assign salespersons into multiple Sales Teams.'
                    }
                  }
                }
              }
            },
            _div_682: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div_predictive_lead_setting_container: {
                _attr: {
                  name: 'predictive_lead_setting_container',
                  title: 'This can be used to compute statistical probability to close a lead',
                  class: 'col-lg-6 o_setting_box'
                },
                predictive_lead_scoring_fields_str: { invisible: '1' },
                predictive_lead_scoring_start_date_str: { invisible: '1' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_797: {
                  _attr: { class: 'o_setting_right_pane' },
                  _b: 'Predictive Lead Scoring',
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: ['The success rate is computed based on', 'for the leads created as of the', '.']
                    },
                    _b: {
                      predictive_lead_scoring_field_labels: { class: 'd-inline' }
                    },
                    _b_390: {
                      predictive_lead_scoring_start_date: {
                        class: 'oe_inline',
                        readonly: '1'
                      }
                    }
                  },
                  _div_765: {
                    _attr: {
                      groups: 'base.group_erp_manager',
                      class: 'mt16'
                    },
                    _button_crm_lead_pls_update_action: {
                      _attr: {
                        name: 'crm_lead_pls_update_action',
                        type: 'action',
                        string: 'Update Probabilities',
                        class: 'btn-primary'
                      }
                    }
                  }
                }
              },
              _div: {
                _attr: {
                  title: 'This can be used to automatically assign leads to sales persons based on rules',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  crm_use_auto_assignment: {}
                },
                _div_377: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_crm_use_auto_assignment: { for: 'crm_use_auto_assignment' },
                  _a: {
                    _attr: {
                      title: 'Assign Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: { class: 'text-muted' },
                    _span: 'Periodically assign leads based on rules',
                    _br: {},
                    _span_764: {
                      _attr: {
                        invisible: [['crm_use_auto_assignment', '=', false]],
                        text: 'All sales teams will use this setting by default unless\n                                        specified otherwise.'
                      }
                    }
                  },
                  _div_552: {
                    _attr: {
                      invisible: [['crm_use_auto_assignment', '=', false]],
                      class: 'row flex-row flex-nowrap mt16'
                    },
                    _label_crm_auto_assignment_action: {
                      for: 'crm_auto_assignment_action',
                      string: 'Running',
                      class: 'col-lg-3 o_light_label'
                    },
                    crm_auto_assignment_action: { required: [['crm_use_auto_assignment', '=', true]] },
                    _button_action_crm_assign_leads: {
                      _attr: {
                        name: 'action_crm_assign_leads',
                        type: 'object',
                        class: 'btn-link w-auto'
                      },
                      _i: {
                        _attr: {
                          title: 'Update now',
                          class: 'fa fa-fw fa-refresh'
                        }
                      }
                    }
                  },
                  _div_271: {
                    _attr: {
                      invisible: ['|', ['crm_use_auto_assignment', '=', false], ['crm_auto_assignment_action', '=', 'manual']],
                      class: 'row mt16'
                    },
                    _label_crm_auto_assignment_interval_type: {
                      for: 'crm_auto_assignment_interval_type',
                      string: 'Repeat every',
                      class: 'col-lg-3 o_light_label'
                    },
                    crm_auto_assignment_interval_number: {
                      required: [['crm_use_auto_assignment', '=', true], ['crm_auto_assignment_action', '=', 'auto']],
                      class: 'oe_inline me-2'
                    },
                    crm_auto_assignment_interval_type: {
                      required: [['crm_use_auto_assignment', '=', true], ['crm_auto_assignment_action', '=', 'auto']],
                      class: 'oe_inline'
                    }
                  },
                  _div_931: {
                    _attr: {
                      invisible: ['|', ['crm_use_auto_assignment', '=', false], ['crm_auto_assignment_action', '=', 'manual']],
                      class: 'row'
                    },
                    _label_crm_auto_assignment_run_datetime: {
                      for: 'crm_auto_assignment_run_datetime',
                      string: 'Next Run',
                      class: 'col-lg-3 o_light_label'
                    },
                    crm_auto_assignment_run_datetime: {}
                  }
                }
              }
            },
            _h2_965: 'Lead Generation',
            _div_convert_visitor_setting_container: {
              _attr: {
                name: 'convert_visitor_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_crm_iap_enrich: {}
                },
                _div_322: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_crm_iap_enrich: {
                    for: 'module_crm_iap_enrich',
                    string: 'Lead Enrichment'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Enrich your leads with company data based on their email addresses'
                    }
                  },
                  _div_914: {
                    _attr: {
                      invisible: [['module_crm_iap_enrich', '=', false]],
                      class: 'mt8'
                    },
                    lead_enrich_auto: {
                      widget: 'radio',
                      class: 'o_light_label',
                      required: 'True'
                    }
                  }
                }
              },
              _div_654: {
                _attr: { class: 'col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_crm_iap_mine: {}
                },
                _div_288: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_crm_iap_mine: {
                    for: 'module_crm_iap_mine',
                    string: 'Lead Mining'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Generate new leads based on their country, industry, size, etc.'
                    }
                  }
                }
              }
            },
            _div_generate_lead_setting_container: {
              _attr: {
                name: 'generate_lead_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_website_crm_iap_reveal: {}
                },
                _div_528: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_website_crm_iap_reveal: {
                    for: 'module_website_crm_iap_reveal',
                    string: 'Visits to Leads'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Convert visitors of your website into leads and perform data enrichment based on their IP address'
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

  crm_config_settings_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'crm',
      bin_size: false
    },
    views: {
      tree: 'res_config_settings_view_form',
      form: '=======todo=========='
    }
  }
}
