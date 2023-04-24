export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base_setup.res_config_settings_view_form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            id: 'emails',
            position: 'replace'
          },
          _h2: 'Discuss',
          _div: {
            _attr: {
              id: 'emails',
              class: 'row mt16 o_settings_container'
            },
            _div: {
              _attr: {
                id: 'activities_setting',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' }
              },
              _div_241: {
                _attr: { class: 'o_setting_right_pane' },
                _span: {
                  _attr: {
                    class: 'o_form_label',
                    text: 'Activities'
                  }
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Configure your activity types'
                  }
                },
                _div_740: {
                  _attr: { class: 'content-group' },
                  _div: {
                    _attr: { class: 'mt8' },
                    _button_mail__mail_activity_type_action: {
                      _attr: {
                        name: 'mail.mail_activity_type_action',
                        type: 'action',
                        string: 'Activity Types',
                        icon: 'fa-arrow-right',
                        class: 'oe_link'
                      }
                    }
                  }
                }
              }
            },
            _div_689: {
              _attr: {
                id: 'email_servers_setting',
                title: 'Using your own email server is required to send/receive emails in Community and Enterprise versions. Online users already benefit from a ready-to-use email server (@mycompany.odoo.com).',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                external_email_server_default: {}
              },
              _div_877: {
                _attr: { class: 'o_setting_right_pane' },
                _label_external_email_server_default: { for: 'external_email_server_default' },
                _a: {
                  _attr: {
                    href: 'https://www.odoo.com/documentation/16.0/applications/general/email_communication/email_servers.html',
                    title: 'Documentation',
                    class: 'o_doc_link'
                  }
                },
                _div: {
                  _attr: {
                    id: 'external_email_server_default',
                    class: 'text-muted',
                    text: 'Configure your own email servers'
                  }
                },
                _div_726: {
                  _attr: {
                    invisible: [['external_email_server_default', '=', false]],
                    class: 'content-group mb-3'
                  },
                  _div: {
                    _attr: {
                      id: 'mail_alias_domain',
                      class: 'mt16'
                    },
                    _label_alias_domain: {
                      for: 'alias_domain',
                      class: 'o_light_label'
                    },
                    _span: '@',
                    alias_domain: { placeholder: 'e.g. "mycompany.com"' }
                  },
                  _div_236: {
                    _attr: { class: 'mt8' },
                    _button_action_email_server_tree: {
                      _attr: {
                        name: 'action_email_server_tree',
                        type: 'action',
                        string: 'Incoming Email Servers',
                        icon: 'fa-arrow-right',
                        class: 'btn-link'
                      }
                    }
                  },
                  _div_931: {
                    _attr: { class: 'mt8' },
                    _button_base__action_ir_mail_server_list: {
                      _attr: {
                        name: 'base.action_ir_mail_server_list',
                        type: 'action',
                        string: 'Outgoing Email Servers',
                        icon: 'fa-arrow-right',
                        class: 'btn-link'
                      }
                    }
                  }
                },
                _div_912: {
                  _attr: {
                    invisible: [['external_email_server_default', '=', false]],
                    class: 'mt-3 d-flex'
                  },
                  module_google_gmail: {},
                  _div: {
                    _label_module_google_gmail: {
                      for: 'module_google_gmail',
                      string: 'Gmail Credentials'
                    },
                    _a: {
                      _attr: {
                        href: 'https://console.developers.google.com/',
                        title: 'Get Gmail API credentials',
                        class: 'o_doc_link'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Send and receive emails through your Gmail account.'
                      }
                    },
                    _div_774: {
                      _attr: {
                        id: 'msg_module_google_gmail',
                        invisible: [['module_google_gmail', '=', false]],
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
                _div_459: {
                  _attr: {
                    invisible: [['external_email_server_default', '=', false]],
                    class: 'mt-3 d-flex'
                  },
                  module_microsoft_outlook: {},
                  _div: {
                    _label_module_microsoft_outlook: {
                      for: 'module_microsoft_outlook',
                      string: 'Outlook Credentials'
                    },
                    _a: {
                      _attr: {
                        href: 'https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app',
                        title: 'Get Outlook API credentials',
                        class: 'o_doc_link'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Send and receive emails through your Outlook account.'
                      }
                    },
                    _div_672: {
                      _attr: {
                        id: 'msg_module_microsoft_outlook',
                        invisible: [['module_microsoft_outlook', '=', false]],
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
            _div_378: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                use_twilio_rtc_servers: {}
              },
              _div_607: {
                _attr: { class: 'o_setting_right_pane' },
                _label_use_twilio_rtc_servers: { for: 'use_twilio_rtc_servers' },
                _div: {
                  _attr: {
                    class: 'text-muted col-md-12',
                    text: 'Add your twilio credentials for ICE servers'
                  }
                },
                _div_941: {
                  _attr: {
                    invisible: [['use_twilio_rtc_servers', '=', false]],
                    class: 'content-group'
                  },
                  _div: {
                    _attr: {
                      id: 'mail_twilio_sid',
                      class: 'row mt16'
                    },
                    _label_twilio_account_sid: {
                      for: 'twilio_account_sid',
                      class: 'col-lg-3'
                    },
                    twilio_account_sid: { placeholder: 'e.g. ACd5543a0b450ar4c7t95f1b6e8a39t543' }
                  },
                  _div_702: {
                    _attr: {
                      id: 'mail_twilio_auth_token',
                      class: 'row mt16'
                    },
                    _label_twilio_account_token: {
                      for: 'twilio_account_token',
                      class: 'col-lg-3'
                    },
                    twilio_account_token: { placeholder: 'e.g. 65ea4f9e948b693N5156F350256bd152' }
                  }
                }
              }
            },
            _div_556: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_right_pane' },
                _span: {
                  _attr: {
                    class: 'o_form_label',
                    text: 'Custom ICE server list'
                  }
                },
                _div: {
                  _attr: { class: 'row' },
                  _div: {
                    _attr: {
                      class: 'text-muted col-md-12',
                      text: 'Configure your ICE server list for webRTC'
                    }
                  }
                },
                _div_405: {
                  _attr: { class: 'content-group' },
                  _div: {
                    _attr: { class: 'row col-lg-4' },
                    _button_mail__action_ice_servers: {
                      _attr: {
                        name: 'mail.action_ice_servers',
                        type: 'action',
                        string: 'ICE Servers',
                        icon: 'fa-arrow-right',
                        class: 'btn-link'
                      }
                    }
                  }
                }
              }
            },
            _div_589: {
              _attr: {
                id: 'restrict_template_rendering_setting',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                restrict_template_rendering: {}
              },
              _div_107: {
                _attr: { class: 'o_setting_right_pane' },
                _label_restrict_template_rendering: { for: 'restrict_template_rendering' },
                _div: {
                  _attr: {
                    id: 'restrict_template_rendering',
                    class: 'text-muted',
                    text: 'Restrict mail templates edition and QWEB placeholders usage.'
                  }
                }
              }
            }
          }
        },
        _div_583: {
          _attr: {
            id: 'companies_setting',
            position: 'inside'
          },
          _br: {},
          _div: {
            _attr: {
              id: 'mail_templates_setting',
              groups: 'mail.group_mail_template_editor,base.group_system',
              class: 'o_setting_right_pane'
            },
            _span: {
              _attr: {
                class: 'o_form_label',
                text: 'Email Templates'
              }
            },
            _div: {
              _attr: {
                class: 'text-muted',
                text: 'Customize the look and feel of automated emails'
              }
            },
            _div_218: {
              _attr: { class: 'w-50 row' },
              _span: {
                _attr: {
                  class: 'd-block w-75 py-2',
                  text: 'Header Color'
                }
              },
              primary_color: {
                widget: 'color',
                class: 'd-block w-25 p-0 m-0'
              }
            },
            _div_362: {
              _attr: { class: 'w-50 row mt-1' },
              _span: {
                _attr: {
                  class: 'd-block w-75 py-2',
                  text: 'Button Color'
                }
              },
              secondary_color: {
                widget: 'color',
                class: 'd-block w-25 p-0 m-0'
              }
            },
            _button_open_email_layout: {
              _attr: {
                name: 'open_email_layout',
                type: 'object',
                string: 'Update Mail Layout',
                icon: 'fa-arrow-right',
                groups: 'base.group_no_one',
                class: 'btn-link'
              }
            },
            _br: {
              _attr: { groups: 'base.group_no_one' }
            },
            _button_open_mail_templates: {
              _attr: {
                name: 'open_mail_templates',
                type: 'object',
                string: 'Review All Templates',
                icon: 'fa-arrow-right',
                class: 'btn-link'
              }
            }
          }
        }
      }
    }
  }
}
