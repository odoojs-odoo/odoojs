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
              string: 'General Settings',
              class: 'app_settings_block'
            },
            _div: {
              _h2: 'Users',
              _div_users_setting_container: {
                _attr: {
                  name: 'users_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _widget_res_config_invite_users: {
                      _attr: {
                        name: 'res_config_invite_users'
                      }
                    }
                  }
                },
                _div_208: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _span: {
                      _attr: {
                        class: 'fa fa-lg fa-users'
                      }
                    },
                    active_user_count: {
                      class: 'w-auto ps-3 fw-bold'
                    },
                    _span_656: {
                      _attr: {
                        invisible: [['active_user_count', '>', '1']],
                        class: 'o_form_label',
                        text: 'Active User'
                      }
                    },
                    _span_774: {
                      _attr: {
                        invisible: [['active_user_count', '<=', '1']],
                        class: 'o_form_label',
                        text: 'Active Users'
                      }
                    },
                    _a: {
                      _attr: {
                        class: 'o_doc_link',
                        title: 'Documentation'
                      }
                    },
                    _br: {},
                    _button_base__action_res_users: {
                      _attr: {
                        name: 'base.action_res_users',
                        string: 'Manage Users',
                        class: 'btn-link o_web_settings_access_rights',
                        type: 'action',
                        icon: 'fa-arrow-right'
                      }
                    }
                  }
                }
              }
            },
            _div_499: {
              _h2: 'Languages',
              _div_languages_setting_container: {
                _attr: {
                  name: 'languages_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-xs-12 col-md-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _div: {
                      _attr: {
                        class: 'w-50'
                      },
                      language_count: {
                        class: 'w-auto ps-1 fw-bold'
                      },
                      _span: {
                        _attr: {
                          invisible: [['language_count', '>', '1']],
                          class: 'o_form_label',
                          text: 'Language'
                        }
                      },
                      _span_814: {
                        _attr: {
                          invisible: [['language_count', '<=', '1']],
                          class: 'o_form_label',
                          text: 'Languages'
                        }
                      }
                    },
                    _div_498: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_base__action_view_base_language_install: {
                        _attr: {
                          name: 'base.action_view_base_language_install',
                          string: 'Add Languages',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    },
                    _div_702: {
                      _attr: {
                        groups: 'base.group_no_one',
                        class: 'mt8'
                      },
                      _button_base__res_lang_act_window: {
                        _attr: {
                          name: 'base.res_lang_act_window',
                          string: 'Manage Languages',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              }
            },
            _div_423: {
              _h2: 'Companies',
              _div_companies_setting_container: {
                _attr: {
                  name: 'companies_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  company_id: {
                    invisible: '1'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    company_name: {
                      class: 'fw-bold'
                    },
                    _br: {},
                    company_informations: {
                      class: 'text-muted'
                    },
                    _br_548: {},
                    _button_open_company: {
                      _attr: {
                        name: 'open_company',
                        string: 'Update Info',
                        class: 'btn-link',
                        type: 'object',
                        icon: 'fa-arrow-right'
                      }
                    }
                  },
                  _br: {},
                  _div_956: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _span: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'Document Layout'
                      }
                    },
                    _span_517: {
                      _attr: {
                        groups: 'base.group_multi_company',
                        class: 'fa fa-lg fa-building-o',
                        title: 'Values set here are company-specific.'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Choose the layout of your documents'
                      }
                    },
                    _div_162: {
                      _attr: {
                        class: 'content-group'
                      },
                      _div: {
                        _attr: {
                          groups: 'base.group_no_one',
                          class: 'mt16'
                        },
                        _label_external_report_layout_id: {
                          for: 'external_report_layout_id',
                          string: 'Layout',
                          class: 'col-3 col-lg-3 o_light_label'
                        },
                        external_report_layout_id: {
                          domain: [['type', '=', 'qweb']],
                          class: 'oe_inline'
                        }
                      },
                      _div_261: {
                        _attr: {
                          class: 'mt8'
                        },
                        _button_web__action_base_document_layout_configurator: {
                          _attr: {
                            name: 'web.action_base_document_layout_configurator',
                            string: 'Configure Document Layout',
                            class: 'oe_link',
                            type: 'action',
                            icon: 'fa-arrow-right'
                          }
                        },
                        _button_edit_external_header: {
                          _attr: {
                            name: 'edit_external_header',
                            string: 'Edit Layout',
                            groups: 'base.group_no_one',
                            class: 'oe_link',
                            type: 'object'
                          }
                        },
                        _button_web__action_report_externalpreview: {
                          _attr: {
                            name: 'web.action_report_externalpreview',
                            string: 'Preview Document',
                            groups: 'base.group_no_one',
                            class: 'oe_link',
                            type: 'action'
                          }
                        }
                      }
                    }
                  },
                  _br_401: {}
                },
                _div_747: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    company_count: {
                      class: 'w-auto ps-1 fw-bold'
                    },
                    _span: {
                      _attr: {
                        invisible: [['company_count', '>', '1']],
                        class: 'o_form_label',
                        text: 'Company'
                      }
                    },
                    _span_532: {
                      _attr: {
                        invisible: [['company_count', '<=', '1']],
                        class: 'o_form_label',
                        text: 'Companies'
                      }
                    },
                    _br: {},
                    _div: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_base__action_res_company_form: {
                        _attr: {
                          name: 'base.action_res_company_form',
                          string: 'Manage Companies',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                },
                _div_283: {
                  _attr: {
                    groups: 'base.group_multi_company',
                    class: 'col-12 col-lg-6 o_setting_box',
                    title: 'Configure company rules to automatically create SO/PO when one of your company sells/buys to another of your company.'
                  },
                  company_id: {
                    invisible: '1'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_inter_company_rules: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_940: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _label_module_account_inter_company_rules: {
                      for: 'module_account_inter_company_rules',
                      string: 'Inter-Company Transactions'
                    },
                    _span: {
                      _attr: {
                        groups: 'base.group_multi_company',
                        class: 'fa fa-lg fa-building-o',
                        title: 'Values set here are company-specific.'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Automatically generate counterpart documents for orders/invoices between companies'
                      }
                    },
                    _div_325: {
                      _attr: {
                        invisible: [['module_account_inter_company_rules', '=', false]],
                        class: 'content-group'
                      },
                      _div: {
                        _attr: {
                          class: 'mt16 text-warning'
                        },
                        _strong: 'Save'
                      }
                    }
                  }
                }
              }
            },
            _div_340: {},
            _div_988: {
              _h2: 'Contacts',
              _div_contacts_setting_container: {
                _attr: {
                  name: 'contacts_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-xs-12 col-md-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _div: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'Send SMS'
                      },
                      _a: {
                        _attr: {
                          class: 'ms-1 o_doc_link',
                          title: 'Documentation'
                        }
                      }
                    },
                    _div_115: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Send texts to your contacts'
                      }
                    }
                  }
                },
                _div_226: {
                  _attr: {
                    class: 'col-xs-12 col-md-6 o_setting_box',
                    title: 'When populating your address book, Odoo provides a list of matching companies. When selecting one item, the company data and logo are auto-filled.'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_partner_autocomplete: {}
                  },
                  _div_122: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _label_module_partner_autocomplete: {
                      for: 'module_partner_autocomplete'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Automatically enrich your contact base with company data'
                      }
                    }
                  }
                }
              }
            },
            _h2: 'Permissions',
            _div_699: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'By default, new users get highest access rights for all installed apps.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  user_default_rights: {}
                },
                _div_968: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_user_default_rights: {
                    for: 'user_default_rights',
                    string: 'Default Access Rights'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Set custom access rights for new users'
                    }
                  },
                  _div_306: {
                    _attr: {
                      invisible: [['user_default_rights', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_open_default_user: {
                        _attr: {
                          name: 'open_default_user',
                          string: 'Default Access Rights',
                          class: 'btn-link',
                          type: 'object',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_385: {
                _attr: {
                  groups: 'base.group_system',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_932: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _button_base__action_apikeys_admin: {
                    _attr: {
                      name: 'base.action_apikeys_admin',
                      string: 'Manage API Keys',
                      class: 'btn-link',
                      type: 'action',
                      icon: 'fa-arrow-right'
                    }
                  }
                }
              },
              _div_122: {
                _attr: {
                  groups: 'base.group_no_one',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_base_import: {}
                },
                _div_521: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_base_import: {
                    for: 'module_base_import',
                    string: 'Import & Export'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Allow users to import data from CSV/XLS/XLSX/ODS files'
                    }
                  }
                }
              },
              _div_329: {
                _attr: {
                  groups: 'base.group_no_one',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  show_effect: {}
                },
                _div_708: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_show_effect: {
                    for: 'show_effect'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add fun feedback and motivate your employees'
                    }
                  }
                }
              }
            },
            _h2_767: 'Integrations',
            _div_integration: {
              _attr: {
                name: 'integration',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_mail_plugin: {}
                },
                _div_956: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_mail_plugin: {
                    for: 'module_mail_plugin',
                    string: 'Mail Plugin'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Integrate with mail client plugins'
                    }
                  }
                }
              },
              _div_373: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_microsoft_calendar: {}
                },
                _div_770: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_microsoft_calendar: {
                    for: 'module_microsoft_calendar',
                    string: 'Outlook Calendar'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Synchronize your calendar with Outlook'
                    }
                  },
                  _div_633: {
                    _attr: {
                      invisible: [['module_microsoft_calendar', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_660: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_google_calendar: {}
                },
                _div_984: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_google_calendar: {
                    for: 'module_google_calendar',
                    string: 'Google Calendar'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Synchronize your calendar with Google Calendar'
                    }
                  },
                  _div_488: {
                    _attr: {
                      invisible: [['module_google_calendar', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_711: {},
              _div_159: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_auth_oauth: {}
                },
                _div_676: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_auth_oauth: {
                    for: 'module_auth_oauth',
                    string: 'OAuth Authentication'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use external accounts to log in (Google, Facebook, etc.)'
                    }
                  },
                  _div_809: {
                    _attr: {
                      invisible: [['module_auth_oauth', '=', false]],
                      class: 'content-group mt16'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_952: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_auth_ldap: {}
                },
                _div_auth_ldap_right_pane: {
                  _attr: {
                    name: 'auth_ldap_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_auth_ldap: {
                    for: 'module_auth_ldap',
                    string: 'LDAP Authentication'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use LDAP credentials to log in'
                    }
                  },
                  _div_247: {
                    _attr: {
                      invisible: [['module_auth_ldap', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_473: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_web_unsplash: {}
                },
                _div_315: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_web_unsplash: {
                    for: 'module_web_unsplash'
                  },
                  _a: {
                    _attr: {
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Find free high-resolution images from Unsplash'
                    }
                  },
                  _div_576: {
                    _attr: {
                      invisible: [['module_web_unsplash', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_742: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_base_geolocalize: {}
                },
                _div_211: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_base_geolocalize: {
                    for: 'module_base_geolocalize',
                    string: 'Geo Localization'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'GeoLocalize your partners'
                    }
                  },
                  _div_base_geolocalize_warning: {
                    _attr: {
                      name: 'base_geolocalize_warning',
                      invisible: [['module_base_geolocalize', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_749: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_google_recaptcha: {}
                },
                _div_163: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_google_recaptcha: {
                    for: 'module_google_recaptcha'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Protect your forms from spam and abuse.'
                    }
                  },
                  _div_849: {
                    _attr: {
                      invisible: [['module_google_recaptcha', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              }
            },
            _h2_290: {
              _attr: {
                groups: 'base.group_no_one',
                text: 'Performance'
              }
            },
            _div_performance: {
              _attr: {
                name: 'performance',
                groups: 'base.group_no_one',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _label_profiling_enabled_until: {
                  for: 'profiling_enabled_until'
                },
                profiling_enabled_until: {},
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Enable the profiling tool. Profiling may impact performance while being active.'
                  }
                }
              }
            },
            _widget_res_config_dev_tool: {
              _attr: {
                name: 'res_config_dev_tool'
              }
            },
            _div_351: {
              _h2: 'About',
              _div_about_setting_container: {
                _attr: {
                  name: 'about_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'd-flex'
                    },
                    _div: {
                      _attr: {
                        class: 'o_setting_right_pane'
                      },
                      _a: {
                        _attr: {
                          class: 'd-block mx-auto'
                        },
                        _img: {
                          _attr: {
                            class: 'd-block mx-auto img img-fluid'
                          }
                        }
                      }
                    },
                    _div_679: {
                      _a: {
                        _attr: {
                          class: 'd-block mx-auto'
                        },
                        _img: {
                          _attr: {
                            class: 'd-block mx-auto img img-fluid'
                          }
                        }
                      }
                    }
                  }
                },
                _widget_res_config_edition: {
                  _attr: {
                    name: 'res_config_edition'
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  action_general_configuration: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    context: {
      module: 'general_settings',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
