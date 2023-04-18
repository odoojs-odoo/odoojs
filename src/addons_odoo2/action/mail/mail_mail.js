export default {
  view_mail_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.mail',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_send: {
            _attr: {
              name: 'send',
              type: 'object',
              string: 'Send Now',
              class: 'oe_highlight'
            }
          },
          _button_mark_outgoing: {
            _attr: {
              name: 'mark_outgoing',
              type: 'object',
              string: 'Retry'
            }
          },
          _button_cancel: {
            _attr: {
              name: 'cancel',
              type: 'object',
              string: 'Cancel'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        model: {
          invisible: '1'
        },
        res_id: {
          invisible: '1'
        },
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
        mail_message_id_int: {
          invisible: '1',
          required: '0'
        },
        _label_subject: {
          for: 'subject',
          class: 'oe_edit_only'
        },
        _h2: {
          subject: {}
        },
        _div: {
          _attr: {
            text: 'by'
          },
          author_id: {
            string: 'User',
            class: 'oe_inline'
          },
          date: {
            class: 'oe_inline',
            readonly: '1'
          },
          _button_action_email_compose_message_wizard: {
            _attr: {
              name: 'action_email_compose_message_wizard',
              type: 'action',
              string: 'Reply',
              icon: 'fa-reply text-warning',
              context: {
                todo_ctx: "{'default_composition_mode':'comment', 'default_parent_id': mail_message_id_int}"
              }
            }
          }
        },
        _group: {
          email_from: {},
          email_to: {},
          recipient_ids: {
            widget: 'many2many_tags',
            domain: [['type', '!=', 'private'], ['active', '=', true]]
          },
          email_cc: {},
          reply_to: {},
          scheduled_date: {
            placeholder: 'YYYY-MM-DD HH:MM:SS'
          }
        },
        _notebook: {
          _page_body: {
            _attr: {
              name: 'body',
              string: 'Body'
            },
            body_html: {
              widget: 'html',
              options: "{'style-inline': true}"
            }
          },
          _page_advanced: {
            _attr: {
              name: 'advanced',
              string: 'Advanced',
              groups: 'base.group_no_one'
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Status'
                },
                auto_delete: {
                  invisible: [['state', '!=', 'outgoing'], ['state', '!=', 'exception']]
                },
                to_delete: {
                  invisible: [['state', '=', 'outgoing']]
                },
                is_notification: {},
                message_type: {},
                mail_server_id: {},
                model: {},
                res_id: {}
              },
              _group_208: {
                _attr: {
                  string: 'Headers'
                },
                message_id: {},
                references: {},
                fetchmail_server_id: {},
                headers: {}
              }
            }
          },
          _page_attachments: {
            _attr: {
              name: 'attachments',
              string: 'Attachments'
            },
            _div: {
              _attr: {
                invisible: [['restricted_attachment_count', '=', 0]],
                class: 'alert alert-warning',
                text: 'You do not have access to'
              },
              restricted_attachment_count: {}
            },
            unrestricted_attachment_ids: {
              domain: [['res_field', '=', false]]
            }
          },
          _page_failure_reason: {
            _attr: {
              name: 'failure_reason',
              string: 'Failure Reason',
              invisible: [['state', '!=', 'exception']]
            },
            failure_reason: {}
          }
        }
      }
    }
  },

  view_mail_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.mail',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_retry: {
            _attr: {
              name: 'action_retry',
              type: 'object',
              string: 'Retry'
            }
          }
        },
        date: {},
        subject: {},
        author_id: {
          string: 'User'
        },
        message_id: {
          invisible: '1'
        },
        recipient_ids: {
          invisible: '1'
        },
        model: {
          invisible: '1'
        },
        res_id: {
          invisible: '1'
        },
        email_from: {
          invisible: '1'
        },
        message_type: {
          invisible: '1'
        },
        state: {
          widget: 'badge'
        },
        to_delete: {},
        _button_send: {
          _attr: {
            name: 'send',
            type: 'object',
            string: 'Send Now',
            icon: 'fa-paper-plane'
          }
        },
        _button_mark_outgoing: {
          _attr: {
            name: 'mark_outgoing',
            type: 'object',
            string: 'Retry',
            icon: 'fa-repeat'
          }
        },
        _button_cancel: {
          _attr: {
            name: 'cancel',
            type: 'object',
            string: 'Cancel Email',
            icon: 'fa-times-circle'
          }
        }
      }
    }
  },

  view_mail_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.mail',
    type: 'search',
    arch: {
      email_from: {
        string: 'Email',
        filter_domain: {
          todo_ctx: "['|', '|',('email_from','ilike',self), ('email_to','ilike',self), ('subject','ilike',self)]"
        }
      },
      date: {},
      _filter_received: {
        _attr: {
          name: 'received',
          string: 'Received',
          domain: [['state', '=', 'received']]
        }
      },
      _filter_outgoing: {
        _attr: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: [['state', '=', 'outgoing']]
        }
      },
      _filter_sent: {
        _attr: {
          name: 'sent',
          string: 'Sent',
          domain: [['state', '=', 'sent']]
        }
      },
      _filter_exception: {
        _attr: {
          name: 'exception',
          string: 'Failed',
          domain: [['state', '=', 'exception']]
        }
      },
      _separator: {},
      _filter_type_email: {
        _attr: {
          name: 'type_email',
          string: 'Email',
          domain: [['message_type', '=', 'email']]
        }
      },
      _filter_type_comment: {
        _attr: {
          name: 'type_comment',
          string: 'Comment',
          domain: [['message_type', '=', 'comment']]
        }
      },
      _filter_type_notification: {
        _attr: {
          name: 'type_notification',
          string: 'Notification',
          domain: [['message_type', '=', 'notification']]
        }
      },
      _group: {
        _attr: {
          string: 'Extended Filters...'
        },
        author_id: {},
        recipient_ids: {},
        model: {},
        res_id: {}
      },
      _group_674: {
        _attr: {
          string: 'Group By'
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_author: {
          _attr: {
            name: 'author',
            string: 'Author',
            context: {
              group_by: 'author_id'
            }
          }
        },
        _filter_thread: {
          _attr: {
            name: 'thread',
            string: 'Thread',
            domain: [],
            context: {
              group_by: 'message_id'
            }
          }
        },
        _filter_month: {
          _attr: {
            name: 'month',
            string: 'Date',
            domain: [],
            context: {
              group_by: 'date'
            }
          }
        }
      }
    }
  },

  action_view_mail_mail: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Emails',
    search_view_id: 'view_mail_search',
    res_model: 'mail.mail',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  act_server_history: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Messages',
    res_model: 'mail.mail',
    domain: "[['email_from', '!=', False], ['fetchmail_server_id', '=', active_id]]",
    context: {
      todo_ctx: "{'search_default_server_id': active_id, 'default_fetchmail_server_id': active_id}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
