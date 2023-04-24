export default {
  res_partner_view_form_inherit_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='email']",
            position: 'replace'
          },
          is_blacklisted: { invisible: '1' },
          _label_email: {
            for: 'email',
            class: 'oe_inline'
          },
          _div: {
            _attr: { class: 'o_row o_row_readonly' },
            _button_mail_action_blacklist_remove: {
              _attr: {
                name: 'mail_action_blacklist_remove',
                type: 'object',
                title: 'This email is blacklisted for mass mailings. Click to unblacklist.',
                groups: 'base.group_user',
                invisible: [['is_blacklisted', '=', false]],
                context: { todo_ctx: "{'default_email': email}" },
                class: 'fa fa-ban text-danger'
              }
            },
            email: {
              widget: 'email',
              required: [['user_ids', '!=', []]],
              context: { gravatar_image: true }
            }
          }
        },
        _xpath_671: {
          _attr: {
            expr: '//sheet',
            position: 'after'
          },
          _div: {
            _attr: { class: 'oe_chatter' },
            message_follower_ids: {},
            activity_ids: {},
            message_ids: {}
          }
        }
      }
    }
  },

  res_partner_view_kanban_inherit_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        type: {
          position: 'after',
          __todo__after: {
            activity_state: {}
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_bottom_right')]",
            position: 'inside'
          },
          activity_ids: { widget: 'kanban_activity' }
        }
      }
    }
  },

  res_partner_view_search_inherit_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_res_partner_filter',
    arch: {
      sheet: {
        _filter_inactive: {
          _attr: {
            name: 'inactive',
            position: 'after'
          },
          _filter_activities_overdue: {
            _attr: {
              name: 'activities_overdue',
              string: 'Late Activities',
              help: 'Show all records which has next action date is before today',
              invisible: '1',
              domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
            }
          },
          _filter_activities_today: {
            _attr: {
              name: 'activities_today',
              string: 'Today Activities',
              invisible: '1',
              domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
            }
          },
          _filter_activities_upcoming_all: {
            _attr: {
              name: 'activities_upcoming_all',
              string: 'Future Activities',
              invisible: '1',
              domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
            }
          },
          _separator: {}
        }
      }
    }
  },

  res_partner_view_tree_inherit_mail: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='user_id']",
            position: 'after'
          },
          activity_ids: {
            widget: 'list_activity',
            optional: 'show'
          }
        }
      }
    }
  },

  res_partner_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'otherview',
    arch: {}
  }
}
