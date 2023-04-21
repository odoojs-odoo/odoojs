export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base_setup.res_config_settings_view_form',
    arch: {
      sheet: {
        _div: {
          _attr: { position: 'replace' },
          _h2: 'Discuss',
          _div: {
            _attr: { class: 'row mt16 o_settings_container' },
            _div: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_left_pane' }
              },
              _div_602: {
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
                _div_446: {
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
            _div_491: {
              _attr: {
                title: 'Using your own email server is required to send/receive emails in Community and Enterprise versions. Online users already benefit from a ready-to-use email server (@mycompany.odoo.com).',
                class: 'col-12 col-lg-6 o_setting_box'
              },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                external_email_server_default: {}
              },
              _div_940: {
                _attr: { class: 'o_setting_right_pane' },
                _label_external_email_server_default: { for: 'external_email_server_default' },
                _a: {
                  _attr: {
                    title: 'Documentation',
                    class: 'o_doc_link'
                  }
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Configure your own email servers'
                  }
                },
                _div_858: {
                  _attr: {
                    invisible: [['external_email_server_default', '=', false]],
                    class: 'content-group mb-3'
                  },
                  _div: {
                    _attr: { class: 'mt16' },
                    _label_alias_domain: {
                      for: 'alias_domain',
                      class: 'o_light_label'
                    },
                    _span: '@',
                    alias_domain: { placeholder: 'e.g. "mycompany.com"' }
                  },
                  _div_547: {
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
                  _div_631: {
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
                _div_157: {
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
                    _div_823: {
                      _attr: {
                        invisible: [['module_google_gmail', '=', false]],
                        class: 'content-group'
                      },
                      _div: {
                        _attr: { class: 'mt16 text-warning' },
                        _strong: 'Save'
                      }
                    }
                  }
                },
                _div_821: {
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
                    _div_218: {
                      _attr: {
                        invisible: [['module_microsoft_outlook', '=', false]],
                        class: 'content-group'
                      },
                      _div: {
                        _attr: { class: 'mt16 text-warning' },
                        _strong: 'Save'
                      }
                    }
                  }
                }
              }
            },
            _div_997: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                use_twilio_rtc_servers: {}
              },
              _div_364: {
                _attr: { class: 'o_setting_right_pane' },
                _label_use_twilio_rtc_servers: { for: 'use_twilio_rtc_servers' },
                _div: {
                  _attr: {
                    class: 'text-muted col-md-12',
                    text: 'Add your twilio credentials for ICE servers'
                  }
                },
                _div_917: {
                  _attr: {
                    invisible: [['use_twilio_rtc_servers', '=', false]],
                    class: 'content-group'
                  },
                  _div: {
                    _attr: { class: 'row mt16' },
                    _label_twilio_account_sid: {
                      for: 'twilio_account_sid',
                      class: 'col-lg-3'
                    },
                    twilio_account_sid: { placeholder: 'e.g. ACd5543a0b450ar4c7t95f1b6e8a39t543' }
                  },
                  _div_708: {
                    _attr: { class: 'row mt16' },
                    _label_twilio_account_token: {
                      for: 'twilio_account_token',
                      class: 'col-lg-3'
                    },
                    twilio_account_token: { placeholder: 'e.g. 65ea4f9e948b693N5156F350256bd152' }
                  }
                }
              }
            },
            _div_470: {
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
                _div_706: {
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
            _div_631: {
              _attr: { class: 'col-12 col-lg-6 o_setting_box' },
              _div: {
                _attr: { class: 'o_setting_left_pane' },
                restrict_template_rendering: {}
              },
              _div_852: {
                _attr: { class: 'o_setting_right_pane' },
                _label_restrict_template_rendering: { for: 'restrict_template_rendering' },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Restrict mail templates edition and QWEB placeholders usage.'
                  }
                }
              }
            }
          }
        },
        _div_192: {
          _attr: { position: 'inside' },
          _br: {},
          _div: {
            _attr: {
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
            _div_466: {
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
            _div_977: {
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
