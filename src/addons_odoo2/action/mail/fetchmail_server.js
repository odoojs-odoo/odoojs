export default {
  view_email_server_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fetchmail.server',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        server_type: {},
        user: {},
        date: {},
        state: {
          widget: 'badge'
        }
      }
    }
  },

  view_email_server_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fetchmail.server',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _attr: {
            invisible: [['server_type', '=', 'local']]
          },
          _button_button_confirm_login: {
            _attr: {
              name: 'button_confirm_login',
              type: 'object',
              string: 'Test & Confirm'
            }
          },
          _button_fetch_mail: {
            _attr: {
              name: 'fetch_mail',
              type: 'object',
              string: 'Fetch Now'
            }
          },
          _button_set_draft: {
            _attr: {
              name: 'set_draft',
              type: 'object',
              string: 'Reset Confirmation'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        active: {
          invisible: '1'
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group: {
            name: {},
            server_type: {
              widget: 'radio',
              readonly: [['state', '=', 'done']]
            }
          },
          _group_858: {
            date: {
              invisible: [['date', '=', false]]
            },
            _div: {
              _attr: {
                invisible: [['server_type_info', '=', false]],
                class: 'text-muted fst-italic'
              },
              server_type_info: {}
            }
          }
        },
        _notebook: {
          _page_server_login_details: {
            _attr: {
              name: 'server_login_details',
              string: 'Server & Login'
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Server Information',
                  invisible: [['server_type', '=', 'local']]
                },
                server: {
                  required: [['server_type', '!=', 'local']]
                },
                port: {
                  required: '1',
                  options: "{'format': false}"
                },
                is_ssl: {}
              },
              _group_131: {
                _attr: {
                  string: 'Login Information',
                  invisible: [['server_type', '=', 'local']]
                },
                user: {
                  required: [['server_type', '!=', 'local']]
                },
                password: {
                  required: [['server_type', 'in', ('imap', 'pop')]],
                  invisible: [['server_type', 'not in', ('imap', 'pop')]]
                }
              },
              _group_485: {
                _attr: {
                  string: 'Actions to Perform on Incoming Mails'
                },
                object_id: {}
              },
              _group_699: {
                _attr: {
                  string: 'Configuration',
                  invisible: [['server_type', '!=', 'local']]
                },
                configuration: {},
                script: {
                  widget: 'url'
                }
              }
            }
          },
          _page_advanced_options: {
            _attr: {
              name: 'advanced_options',
              string: 'Advanced',
              groups: 'base.group_no_one'
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Advanced Options'
                },
                priority: {},
                attach: {},
                original: {}
              }
            }
          }
        }
      }
    }
  },

  view_email_server_search: {
    _odoo_model: 'ir.ui.view',
    model: 'fetchmail.server',
    type: 'search',
    arch: {
      name: {
        string: 'Incoming Mail Server'
      },
      user: {},
      _filter_imap: {
        _attr: {
          name: 'imap',
          string: 'IMAP',
          domain: [['server_type', '=', 'imap']]
        }
      },
      _filter_pop: {
        _attr: {
          name: 'pop',
          string: 'POP',
          domain: [['server_type', '=', 'pop']]
        }
      },
      _separator: {},
      _filter_ssl: {
        _attr: {
          name: 'ssl',
          string: 'SSL',
          domain: [['is_ssl', '=', true]]
        }
      },
      _separator_403: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_email_server_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Incoming Mail Servers',
    search_view_id: 'view_email_server_search',
    res_model: 'fetchmail.server',
    views: {
      tree: 'view_email_server_tree',
      form: '=======todo=========='
    }
  }
}
