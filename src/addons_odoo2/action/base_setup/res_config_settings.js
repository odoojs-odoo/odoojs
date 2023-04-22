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
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    _widget_res_config_invite_users: {
                      _attr: { name: 'res_config_invite_users' }
                    }
                  }
                },
                _div_351: {
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    _span: {
                      _attr: { class: 'fa fa-lg fa-users' }
                    },
                    active_user_count: { class: 'w-auto ps-3 fw-bold' },
                    _span_460: {
                      _attr: {
                        invisible: [['active_user_count', '>', '1']],
                        class: 'o_form_label',
                        text: 'Active User'
                      }
                    },
                    _span_972: {
                      _attr: {
                        invisible: [['active_user_count', '<=', '1']],
                        class: 'o_form_label',
                        text: 'Active Users'
                      }
                    },
                    _a: {
                      _attr: {
                        title: 'Documentation',
                        class: 'o_doc_link'
                      }
                    },
                    _br: {},
                    _button_base__action_res_users: {
                      _attr: {
                        name: 'base.action_res_users',
                        type: 'action',
                        string: 'Manage Users',
                        icon: 'fa-arrow-right',
                        class: 'btn-link o_web_settings_access_rights'
                      }
                    }
                  }
                }
              }
            },
            _div_642: {
              _h2: 'Languages',
              _div_languages_setting_container: {
                _attr: {
                  name: 'languages_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: { class: 'col-xs-12 col-md-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    _div: {
                      _attr: { class: 'w-50' },
                      language_count: { class: 'w-auto ps-1 fw-bold' },
                      _span: {
                        _attr: {
                          invisible: [['language_count', '>', '1']],
                          class: 'o_form_label',
                          text: 'Language'
                        }
                      },
                      _span_571: {
                        _attr: {
                          invisible: [['language_count', '<=', '1']],
                          class: 'o_form_label',
                          text: 'Languages'
                        }
                      }
                    },
                    _div_976: {
                      _attr: { class: 'mt8' },
                      _button_base__action_view_base_language_install: {
                        _attr: {
                          name: 'base.action_view_base_language_install',
                          type: 'action',
                          string: 'Add Languages',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    },
                    _div_666: {
                      _attr: {
                        groups: 'base.group_no_one',
                        class: 'mt8'
                      },
                      _button_base__res_lang_act_window: {
                        _attr: {
                          name: 'base.res_lang_act_window',
                          type: 'action',
                          string: 'Manage Languages',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              }
            },
            _div_548: {
              _h2: 'Companies',
              _div_companies_setting_container: {
                _attr: {
                  name: 'companies_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  company_id: { invisible: '1' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    company_name: { class: 'fw-bold' },
                    _br: {},
                    company_informations: { class: 'text-muted' },
                    _br_464: {},
                    _button_open_company: {
                      _attr: {
                        name: 'open_company',
                        type: 'object',
                        string: 'Update Info',
                        icon: 'fa-arrow-right',
                        class: 'btn-link'
                      }
                    }
                  },
                  _br: {},
                  _div_461: {
                    _attr: { class: 'o_setting_right_pane' },
                    _span: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'Document Layout'
                      }
                    },
                    _span_576: {
                      _attr: {
                        title: 'Values set here are company-specific.',
                        groups: 'base.group_multi_company',
                        class: 'fa fa-lg fa-building-o'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Choose the layout of your documents'
                      }
                    },
                    _div_323: {
                      _attr: { class: 'content-group' },
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
                      _div_563: {
                        _attr: { class: 'mt8' },
                        _button_web__action_base_document_layout_configurator: {
                          _attr: {
                            name: 'web.action_base_document_layout_configurator',
                            type: 'action',
                            string: 'Configure Document Layout',
                            icon: 'fa-arrow-right',
                            class: 'oe_link'
                          }
                        },
                        _button_edit_external_header: {
                          _attr: {
                            name: 'edit_external_header',
                            type: 'object',
                            string: 'Edit Layout',
                            groups: 'base.group_no_one',
                            class: 'oe_link'
                          }
                        },
                        _button_web__action_report_externalpreview: {
                          _attr: {
                            name: 'web.action_report_externalpreview',
                            type: 'action',
                            string: 'Preview Document',
                            groups: 'base.group_no_one',
                            class: 'oe_link'
                          }
                        }
                      }
                    }
                  },
                  _br_133: {}
                },
                _div_109: {
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    company_count: { class: 'w-auto ps-1 fw-bold' },
                    _span: {
                      _attr: {
                        invisible: [['company_count', '>', '1']],
                        class: 'o_form_label',
                        text: 'Company'
                      }
                    },
                    _span_388: {
                      _attr: {
                        invisible: [['company_count', '<=', '1']],
                        class: 'o_form_label',
                        text: 'Companies'
                      }
                    },
                    _br: {},
                    _div: {
                      _attr: { class: 'mt8' },
                      _button_base__action_res_company_form: {
                        _attr: {
                          name: 'base.action_res_company_form',
                          type: 'action',
                          string: 'Manage Companies',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                },
                _div_361: {
                  _attr: {
                    title: 'Configure company rules to automatically create SO/PO when one of your company sells/buys to another of your company.',
                    groups: 'base.group_multi_company',
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  company_id: { invisible: '1' },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_inter_company_rules: { widget: 'upgrade_boolean' }
                  },
                  _div_291: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_inter_company_rules: {
                      for: 'module_account_inter_company_rules',
                      string: 'Inter-Company Transactions'
                    },
                    _span: {
                      _attr: {
                        title: 'Values set here are company-specific.',
                        groups: 'base.group_multi_company',
                        class: 'fa fa-lg fa-building-o'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Automatically generate counterpart documents for orders/invoices between companies'
                      }
                    },
                    _div_869: {
                      _attr: {
                        invisible: [['module_account_inter_company_rules', '=', false]],
                        class: 'content-group'
                      },
                      _div: {
                        _attr: {
                          class: 'mt16 text-warning',
                          text: 'this page and come back here to set up the feature.'
                        },
                        _strong: 'Save'
                      }
                    }
                  }
                }
              }
            },
            _div_199: {},
            _div_928: {
              _h2: 'Contacts',
              _div_contacts_setting_container: {
                _attr: {
                  name: 'contacts_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: { class: 'col-xs-12 col-md-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_right_pane' },
                    _div: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'Send SMS'
                      },
                      _a: {
                        _attr: {
                          title: 'Documentation',
                          class: 'ms-1 o_doc_link'
                        }
                      }
                    },
                    _div_636: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Send texts to your contacts'
                      }
                    }
                  }
                },
                _div_217: {
                  _attr: {
                    title: 'When populating your address book, Odoo provides a list of matching companies. When selecting one item, the company data and logo are auto-filled.',
                    class: 'col-xs-12 col-md-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_partner_autocomplete: {}
                  },
                  _div_564: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_partner_autocomplete: { for: 'module_partner_autocomplete' },
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
            _div_627: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: {
                  title: 'By default, new users get highest access rights for all installed apps.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  user_default_rights: {}
                },
                _div_690: {
                  _attr: { class: 'o_setting_right_pane' },
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
                  _div_771: {
                    _attr: {
                      invisible: [['user_default_rights', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt8' },
                      _button_open_default_user: {
                        _attr: {
                          name: 'open_default_user',
                          type: 'object',
                          string: 'Default Access Rights',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_996: {
                _attr: {
                  groups: 'base.group_system',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_751: {
                  _attr: { class: 'o_setting_right_pane' },
                  _button_base__action_apikeys_admin: {
                    _attr: {
                      name: 'base.action_apikeys_admin',
                      type: 'action',
                      string: 'Manage API Keys',
                      icon: 'fa-arrow-right',
                      class: 'btn-link'
                    }
                  }
                }
              },
              _div_162: {
                _attr: {
                  groups: 'base.group_no_one',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_base_import: {}
                },
                _div_631: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_base_import: {
                    for: 'module_base_import',
                    string: 'Import & Export'
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
                      text: 'Allow users to import data from CSV/XLS/XLSX/ODS files'
                    }
                  }
                }
              },
              _div_864: {
                _attr: {
                  groups: 'base.group_no_one',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  show_effect: {}
                },
                _div_508: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_show_effect: { for: 'show_effect' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add fun feedback and motivate your employees'
                    }
                  }
                }
              }
            },
            _h2_293: 'Integrations',
            _div_integration: {
              _attr: {
                name: 'integration',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_mail_plugin: {}
                },
                _div_889: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_mail_plugin: {
                    for: 'module_mail_plugin',
                    string: 'Mail Plugin'
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
                      text: 'Integrate with mail client plugins'
                    }
                  }
                }
              },
              _div_308: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_microsoft_calendar: {}
                },
                _div_669: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_microsoft_calendar: {
                    for: 'module_microsoft_calendar',
                    string: 'Outlook Calendar'
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
                      text: 'Synchronize your calendar with Outlook'
                    }
                  },
                  _div_765: {
                    _attr: {
                      invisible: [['module_microsoft_calendar', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16',
                        text: 'this page and come back here to set up the feature.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_554: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_google_calendar: {}
                },
                _div_347: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_google_calendar: {
                    for: 'module_google_calendar',
                    string: 'Google Calendar'
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
                      text: 'Synchronize your calendar with Google Calendar'
                    }
                  },
                  _div_725: {
                    _attr: {
                      invisible: [['module_google_calendar', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16',
                        text: 'this page and come back here to set up the feature.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_808: {},
              _div_690: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_auth_oauth: {}
                },
                _div_685: {
                  _attr: { class: 'o_setting_right_pane' },
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
                  _div_854: {
                    _attr: {
                      invisible: [['module_auth_oauth', '=', false]],
                      class: 'content-group mt16'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning',
                        text: 'this page and come back here to set up the feature.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_226: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
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
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use LDAP credentials to log in'
                    }
                  },
                  _div_370: {
                    _attr: {
                      invisible: [['module_auth_ldap', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning',
                        text: 'this page and come back here to set up the feature.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_568: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_web_unsplash: {}
                },
                _div_132: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_web_unsplash: { for: 'module_web_unsplash' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Find free high-resolution images from Unsplash'
                    }
                  },
                  _div_814: {
                    _attr: {
                      invisible: [['module_web_unsplash', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning',
                        text: 'this page and come back here to set up the feature.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_536: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_base_geolocalize: {}
                },
                _div_114: {
                  _attr: { class: 'o_setting_right_pane' },
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
                        class: 'mt16 text-warning',
                        text: 'this page and come back here to choose your Geo Provider.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              },
              _div_270: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_google_recaptcha: {}
                },
                _div_507: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_google_recaptcha: { for: 'module_google_recaptcha' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Protect your forms from spam and abuse.'
                    }
                  },
                  _div_314: {
                    _attr: {
                      invisible: [['module_google_recaptcha', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16 text-warning',
                        text: 'this page and come back here to set up reCaptcha.'
                      },
                      _strong: 'Save'
                    }
                  }
                }
              }
            },
            _h2_496: {
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
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _label_profiling_enabled_until: { for: 'profiling_enabled_until' },
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
              _attr: { name: 'res_config_dev_tool' }
            },
            _div_379: {
              _h2: 'About',
              _div_about_setting_container: {
                _attr: {
                  name: 'about_setting_container',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'd-flex' },
                    _div: {
                      _attr: { class: 'o_setting_right_pane' },
                      _a: {
                        _attr: { class: 'd-block mx-auto' },
                        _img: {
                          _attr: { class: 'd-block mx-auto img img-fluid' }
                        }
                      }
                    },
                    _div_136: {
                      _a: {
                        _attr: { class: 'd-block mx-auto' },
                        _img: {
                          _attr: { class: 'd-block mx-auto img img-fluid' }
                        }
                      }
                    }
                  }
                },
                _widget_res_config_edition: {
                  _attr: { name: 'res_config_edition' }
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
    search_view_id: 'tooooooodoooooo',
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
