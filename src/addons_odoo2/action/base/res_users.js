export default {
  view_users_simple_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    arch: {
      sheet: {
        id: {
          invisible: '1'
        },
        _div: {
          _attr: {
            invisible: [['id', '>', 0]],
            class: 'alert alert-info text-center mb-3',
            text: 'You are inviting a new user.'
          }
        },
        avatar_128: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          options: '{"zoom": true, "preview_image": "avatar_128"}'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. John Doe'
            }
          },
          email: {
            invisible: '1'
          },
          _label_login: {
            for: 'login',
            string: 'Email Address'
          },
          _h2: {
            login: {
              placeholder: 'e.g. email@yourcompany.com'
            }
          },
          _label_company_id: {
            for: 'company_id',
            groups: 'base.group_multi_company'
          },
          company_id: {
            groups: 'base.group_multi_company',
            context: {
              user_preference: 0
            }
          }
        },
        _group_phone_numbers: {
          _attr: {
            name: 'phone_numbers'
          },
          _label_groups_id: {
            for: 'groups_id',
            string: 'Access Rights',
            groups: 'base.group_no_one',
            invisible: [['id', '>', 0]]
          },
          _div: {
            _attr: {
              groups: 'base.group_no_one',
              invisible: [['id', '>', 0]]
            },
            groups_id: {
              widget: 'many2many_tags',
              color_field: 'color'
            }
          },
          phone: {
            widget: 'phone',
            options: "{'enable_sms': false}"
          },
          mobile: {
            widget: 'phone',
            options: "{'enable_sms': false}"
          }
        }
      }
    }
  },

  view_users_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    arch: {
      sheet: {
        _header: {},
        id: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_show_groups: {
            _attr: {
              name: 'action_show_groups',
              groups: 'base.group_no_one',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-users'
            },
            groups_count: {
              string: 'Groups',
              widget: 'statinfo'
            }
          },
          _button_action_show_accesses: {
            _attr: {
              name: 'action_show_accesses',
              groups: 'base.group_no_one',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-list'
            },
            accesses_count: {
              string: 'Access Rights',
              widget: 'statinfo'
            }
          },
          _button_action_show_rules: {
            _attr: {
              name: 'action_show_rules',
              groups: 'base.group_no_one',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-list-ul'
            },
            rules_count: {
              string: 'Record Rules',
              widget: 'statinfo'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['active', '=', true]],
            title: 'Archived'
          }
        },
        active_partner: {
          invisible: '1'
        },
        _div: {
          _attr: {
            invisible: ['|', '|', '&', ['active', '=', true], ['active_partner', '=', true], '&', ['active', '=', false], ['active_partner', '=', false], '&', ['active', '=', true], ['active_partner', '=', false]],
            class: 'alert alert-info text-center o_form_header'
          },
          _a: {
            _attr: {
              class: 'close',
              text: 'x'
            }
          },
          _div: {
            _strong: 'The contact linked to this user is still active'
          },
          _div_445: {
            _attr: {
              text: 'You can archive the contact'
            },
            partner_id: {}
          }
        },
        avatar_128: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_avatar',
          preview_image: 'avatar_128'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. John Doe'
            }
          },
          email: {
            invisible: '1'
          },
          _label_login: {
            for: 'login',
            string: 'Email Address'
          },
          _h2: {
            login: {
              placeholder: 'e.g. email@yourcompany.com'
            }
          },
          _group: {
            partner_id: {
              groups: 'base.group_no_one',
              invisible: [['id', '=', false]]
            },
            share: {
              invisible: '1'
            }
          }
        },
        _notebook: {
          _page_access_rights: {
            _attr: {
              name: 'access_rights',
              string: 'Access Rights'
            },
            _group: {
              _attr: {
                string: 'Multi Companies',
                invisible: [['companies_count', '<=', 1]]
              },
              company_ids: {
                string: 'Allowed Companies',
                widget: 'many2many_tags',
                no_create: true
              },
              company_id: {
                string: 'Default Company',
                context: {
                  user_preference: 0
                }
              },
              companies_count: {
                string: 'Companies count',
                invisible: '1'
              }
            },
            groups_id: {}
          },
          _page_preferences: {
            _attr: {
              name: 'preferences',
              string: 'Preferences'
            },
            _group: {
              _group_preferences: {
                _attr: {
                  name: 'preferences',
                  string: 'Localization'
                },
                active: {
                  invisible: '1'
                },
                _label_lang: {
                  for: 'lang'
                },
                _div: {
                  _attr: {
                    class: 'o_row'
                  },
                  lang: {},
                  _button_base__action_view_base_language_install: {
                    _attr: {
                      name: 'base.action_view_base_language_install',
                      class: 'oe_edit_only btn-sm btn-link mb4 fa fa-globe',
                      title: 'Add a language',
                      type: 'action'
                    }
                  }
                },
                tz: {
                  widget: 'timezone_mismatch',
                  tz_offset_field: 'tz_offset'
                },
                tz_offset: {
                  invisible: '1'
                }
              },
              _group: {
                _attr: {
                  string: 'Menus Customization',
                  groups: 'base.group_no_one',
                  invisible: [['share', '=', true]]
                },
                action_id: {}
              }
            },
            _group_messaging: {
              _attr: {
                name: 'messaging'
              },
              signature: {
                options: "{'style-inline': true, 'codeview': true}"
              }
            }
          }
        }
      }
    }
  },

  view_users_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        login: {},
        lang: {},
        login_date: {},
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  view_res_users_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'otherview',
    arch: {}
  },

  view_users_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'search',
    arch: {
      name: {
        string: 'User'
      },
      company_ids: {
        string: 'Company',
        groups: 'base.group_multi_company'
      },
      share: {},
      _filter_filter_no_share: {
        _attr: {
          name: 'filter_no_share',
          string: 'Internal Users',
          domain: [['share', '=', false]]
        }
      },
      _filter_filter_share: {
        _attr: {
          name: 'filter_share',
          string: 'Portal Users',
          domain: [['share', '=', true]]
        }
      },
      _separator: {},
      _filter_Inactive: {
        _attr: {
          name: 'Inactive',
          string: 'Inactive Users',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  user_groups_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'view_users_form',
    arch: {
      sheet: {
        groups_id: {
          __todo__after: {}
        }
      }
    }
  },

  action_res_users: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Users',
    type: 'ir.actions.act_window',
    search_view_id: 'view_users_search',
    res_model: 'res.users',
    context: {
      search_default_filter_no_share: 1,
      show_user_group_warning: true
    },
    views: {
      tree: 'view_users_tree',
      form: '=======todo=========='
    }
  },

  action_res_users_view1: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_users_tree',
    act_window_id: 'action_res_users'
  },

  action_res_users_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_users_form',
    act_window_id: 'action_res_users'
  },

  view_users_form_simple_modif: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    type: 'form',
    arch: {
      sheet: {
        avatar_128: {
          invisible: '1'
        },
        image_1920: {
          widget: 'image',
          class: 'oe_right oe_avatar',
          preview_image: 'avatar_128'
        },
        _h1: {
          name: {
            class: 'oe_inline'
          }
        },
        _notebook: {
          _page_preferences_page: {
            _attr: {
              name: 'preferences_page',
              string: 'Preferences'
            },
            _group_preferences: {
              _attr: {
                name: 'preferences'
              },
              _group: {
                email: {
                  widget: 'email'
                }
              },
              _group_107: {
                _label_lang: {
                  for: 'lang'
                },
                _div: {
                  _attr: {
                    class: 'o_row'
                  },
                  lang: {},
                  _button_base__action_view_base_language_install: {
                    _attr: {
                      name: 'base.action_view_base_language_install',
                      groups: 'base.group_system',
                      class: 'oe_edit_only btn-sm btn-link mb4 fa fa-globe',
                      title: 'Add a language',
                      type: 'action'
                    }
                  }
                },
                tz: {
                  widget: 'timezone_mismatch',
                  tz_offset_field: 'tz_offset'
                },
                tz_offset: {
                  invisible: '1'
                }
              },
              share: {
                invisible: '1'
              }
            },
            _group_signature: {
              _attr: {
                name: 'signature'
              },
              signature: {
                options: "{'style-inline': true, 'codeview': true}"
              }
            },
            _group_status: {
              _attr: {
                name: 'status',
                string: 'Status',
                invisible: '1'
              },
              company_id: {
                groups: 'base.group_multi_company',
                no_create: true
              }
            },
            _group_preference_contact: {
              _attr: {
                name: 'preference_contact'
              }
            }
          },
          _page: {
            _attr: {
              string: 'Account Security'
            },
            _group_auth: {
              _attr: {
                name: 'auth',
                string: 'Password Management'
              },
              _div: {
                _button_preference_change_password: {
                  _attr: {
                    name: 'preference_change_password',
                    string: 'Change password',
                    class: 'btn btn-secondary',
                    type: 'object'
                  }
                }
              }
            },
            _group: {
              _attr: {
                string: 'API Keys'
              },
              _div: {
                _attr: {
                  class: 'text-muted',
                  text: 'API Keys are used to connect to Odoo from external tools without the need for a password or Two-factor Authentication.'
                },
                _a: {
                  _i: {
                    _attr: {
                      class: 'fa fa-fw o_button_icon fa-info-circle',
                      title: 'Documentation'
                    }
                  }
                }
              },
              _div_691: {
                _attr: {
                  invisible: [['api_key_ids', '=', []]]
                },
                api_key_ids: {
                  views: {
                    tree: {
                      arch: {
                        sheet: {
                          name: {},
                          scope: {},
                          create_date: {},
                          _button_remove: {
                            _attr: {
                              name: 'remove',
                              string: 'Delete API key.',
                              type: 'object',
                              icon: 'fa-trash'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              _div_830: {
                _button_api_key_wizard: {
                  _attr: {
                    name: 'api_key_wizard',
                    string: 'New API Key',
                    class: 'btn btn-secondary',
                    type: 'object'
                  }
                }
              }
            }
          }
        },
        _footer: {
          _button_preference_save: {
            _attr: {
              name: 'preference_save',
              string: 'Save',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_preference_cancel: {
            _attr: {
              name: 'preference_cancel',
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_res_users_my: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Change My Preferences',
    type: 'ir.actions.act_window',
    res_model: 'res.users',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_res_users_my_view2: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'view_users_form_simple_modif',
    act_window_id: 'action_res_users_my'
  }
}
