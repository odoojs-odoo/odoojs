export default {
  view_message_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message',
    type: 'tree',
    arch: {
      sheet: {
        date: {},
        subject: {},
        author_id: {},
        model: {},
        res_id: {}
      }
    }
  },

  mail_message_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_open_document: {
            _attr: {
              name: 'action_open_document',
              type: 'object',
              string: 'Open Document',
              icon: 'fa-file-text-o',
              invisible: ['|', ['model', '=', false], ['res_id', '=', 0]],
              class: 'oe_link'
            }
          }
        },
        _group: {
          _group: {
            subject: {},
            date: {},
            email_from: {},
            author_id: {},
            message_type: {},
            subtype_id: {},
            is_internal: {}
          },
          _group_188: {
            model: {},
            res_id: {},
            record_name: {},
            parent_id: {}
          }
        },
        _notebook: {
          _page_body: {
            _attr: {
              name: 'body',
              string: 'Body'
            },
            body: { options: "{'style-inline': true}" }
          },
          _page_gateway: {
            _attr: {
              name: 'gateway',
              string: 'Gateway'
            },
            _group: {
              _group: {
                reply_to: {},
                reply_to_force_new: {}
              },
              _group_999: {
                message_id: {},
                mail_server_id: {}
              }
            }
          },
          _page_recipients: {
            _attr: {
              name: 'recipients',
              string: 'Recipients'
            },
            _group: {
              _group: {
                partner_ids: { widget: 'many2many_tags' }
              },
              _group_719: {
                notified_partner_ids: { widget: 'many2many_tags' },
                starred_partner_ids: { widget: 'many2many_tags' }
              }
            },
            _group_363: {
              notification_ids: {
                views: {
                  tree: {
                    arch: {
                      sheet: {
                        res_partner_id: {},
                        is_read: {},
                        notification_type: {},
                        notification_status: {}
                      }
                    }
                  }
                }
              }
            }
          },
          _page_page_tracking: {
            _attr: {
              name: 'page_tracking',
              string: 'Tracking'
            },
            tracking_value_ids: {}
          }
        }
      }
    }
  },

  view_message_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message',
    type: 'search',
    arch: {
      body: {
        string: 'Content',
        filter_domain: { todo_ctx: "['|', ('subject', 'ilike', self), ('body', 'ilike', self)]" }
      },
      subject: {},
      message_type: {},
      author_id: {},
      partner_ids: {},
      model: {},
      res_id: {},
      parent_id: {},
      _filter_filter_has_mentions: {
        _attr: {
          name: 'filter_has_mentions',
          string: 'Has Mentions',
          domain: { todo_ctx: "[('partner_ids.user_ids', 'in', [uid])]" }
        }
      },
      _separator: {},
      _filter_message_needaction: {
        _attr: {
          name: 'message_needaction',
          string: 'Need Action',
          help: 'Unread messages',
          domain: [['needaction', '=', true]]
        }
      },
      _separator_497: {}
    }
  },

  action_view_mail_message: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Messages',
    res_model: 'mail.message',
    search_view_id: 'view_message_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
