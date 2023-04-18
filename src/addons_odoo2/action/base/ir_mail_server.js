export default {
  ir_mail_server_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.mail_server',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_test_smtp_connection: {
            _attr: {
              name: 'test_smtp_connection',
              string: 'Test Connection',
              class: 'btn-primary',
              type: 'object'
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
        _group: {
          _group: {
            name: {
              placeholder: 'e.g. My Outgoing Server'
            },
            from_filter: {}
          },
          _group_247: {
            sequence: {},
            active: {
              invisible: '1'
            }
          }
        },
        _group_334: {
          _group: {
            smtp_authentication: {
              widget: 'radio'
            }
          },
          _group_448: {
            _div: {
              _attr: {
                invisible: [['smtp_authentication_info', '=', false]],
                class: 'text-muted fst-italic'
              },
              smtp_authentication_info: {}
            }
          }
        },
        _notebook: {
          _page_connection: {
            _attr: {
              name: 'connection',
              string: 'Connection'
            },
            _group: {
              _group: {
                smtp_encryption: {
                  widget: 'radio'
                },
                smtp_host: {},
                smtp_port: {
                  options: "{'format': false}"
                },
                smtp_debug: {
                  groups: 'base.group_no_one'
                }
              },
              _group_904: {
                smtp_user: {
                  invisible: [['smtp_authentication', '=', 'certificate']],
                  force_save: '1'
                },
                smtp_pass: {
                  invisible: [['smtp_authentication', '!=', 'login']],
                  force_save: '1'
                },
                smtp_ssl_certificate: {
                  invisible: [['smtp_authentication', '!=', 'certificate']],
                  force_save: '1'
                },
                smtp_ssl_private_key: {
                  invisible: [['smtp_authentication', '!=', 'certificate']],
                  force_save: '1'
                }
              }
            }
          }
        }
      }
    }
  },

  ir_mail_server_list: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.mail_server',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {},
        name: {},
        smtp_host: {},
        smtp_user: {},
        smtp_encryption: {},
        from_filter: {}
      }
    }
  },

  view_ir_mail_server_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.mail_server',
    type: 'search',
    arch: {
      name: {
        string: 'Outgoing Mail Server'
      },
      smtp_encryption: {},
      from_filter: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_ir_mail_server_list: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Outgoing Mail Servers',
    search_view_id: 'view_ir_mail_server_search',
    res_model: 'ir.mail_server',
    views: {
      tree: 'ir_mail_server_list',
      form: '=======todo=========='
    }
  }
}
