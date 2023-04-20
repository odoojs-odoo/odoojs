export default {
  view_server_action_form_template: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.server',
    inherit_id: 'base.view_server_action_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page[@name='page_object']",
            position: 'after'
          },
          _page_next_activity: {
            _attr: {
              name: 'next_activity',
              string: 'Activity',
              invisible: [['state', '!=', 'next_activity']]
            },
            _group: {
              _group: {
                activity_type_id: {
                  required: [['state', '=', 'next_activity']],
                  no_create: true,
                  no_open: true
                },
                activity_summary: {
                  placeholder: 'e.g. Discuss proposal'
                }
              },
              _group_411: {
                _label_activity_date_deadline_range: {
                  for: 'activity_date_deadline_range'
                },
                _div: {
                  _attr: {
                    class: 'o_row'
                  },
                  activity_date_deadline_range: {},
                  activity_date_deadline_range_type: {
                    required: [['state', '=', 'next_activity'], ['activity_date_deadline_range', '>', 0]]
                  }
                },
                activity_user_type: {
                  required: [['state', '=', 'next_activity']]
                },
                activity_user_field_name: {
                  invisible: [['activity_user_type', '=', 'specific']],
                  required: [['state', '=', 'next_activity'], ['activity_user_type', '=', 'generic']]
                },
                activity_user_id: {
                  invisible: [['activity_user_type', '=', 'generic']],
                  required: [['state', '=', 'next_activity'], ['activity_user_type', '=', 'specific']]
                }
              }
            },
            activity_note: {
              class: 'oe-bordered-editor',
              placeholder: 'Log a note...'
            }
          }
        },
        _xpath_233: {
          _attr: {
            expr: "//field[@name='link_field_id']",
            position: 'after'
          },
          partner_ids: {
            widget: 'many2many_tags',
            invisible: [['state', '!=', 'followers']]
          },
          template_id: {
            invisible: [['state', '!=', 'mail_post']],
            required: [['state', '=', 'mail_post']],
            context: {
              todo_ctx: "{'default_model': model_name,                                      'default_use_default_to': True}"
            }
          },
          mail_post_method: {
            invisible: [['state', '!=', 'mail_post']],
            required: [['state', '=', 'mail_post']]
          },
          mail_post_autofollow: {
            invisible: '1'
          }
        }
      }
    }
  }
}
