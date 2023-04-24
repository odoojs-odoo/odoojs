export default {
  ir_mail_server_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.mail_server',
    type: 'form',
    arch: {
      header: {
        _button_test_smtp_connection: {
          _attr: {
            name: 'test_smtp_connection',
            type: 'object',
            string: 'Test Connection',
            class: 'btn-primary'
          }
        }
      },
      sheet: {
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
            name: { placeholder: 'e.g. My Outgoing Server' },
            from_filter: {}
          },
          _group_646: {
            sequence: {},
            active: { invisible: '1' }
          }
        },
        _group_783: {
          _group: {
            smtp_authentication: { widget: 'radio' }
          },
          _group_387: {
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
                smtp_encryption: { widget: 'radio' },
                smtp_host: {},
                smtp_port: { options: "{'format': false}" },
                smtp_debug: { groups: 'base.group_no_one' }
              },
              _group_476: {
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
        from_filter: { optional: 'hide' }
      }
    }
  },

  view_ir_mail_server_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.mail_server',
    type: 'search',
    arch: {
      name: {
        string: 'Outgoing Mail Server',
        filter_domain: { todo_ctx: "['|', '|',                                         ('name', 'ilike', self),                                         ('smtp_host', 'ilike', self),                                         ('smtp_user', 'ilike', self)]" }
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
    res_model: 'ir.mail_server',
    search_view_id: 'view_ir_mail_server_search',
    views: {
      tree: 'ir_mail_server_list',
      form: '=======todo=========='
    }
  }
}
