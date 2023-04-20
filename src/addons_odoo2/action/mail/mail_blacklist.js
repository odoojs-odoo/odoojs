export default {
  mail_blacklist_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.blacklist',
    type: 'tree',
    arch: {
      sheet: {
        create_date: {
          string: 'Blacklist Date'
        },
        email: {}
      }
    }
  },

  mail_blacklist_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.blacklist',
    type: 'form',
    arch: {
      header: {
        _button_mail_action_blacklist_remove: {
          _attr: {
            name: 'mail_action_blacklist_remove',
            type: 'object',
            string: 'Unblacklist',
            invisible: ['|', ['active', '=', false], ['email', '=', false]],
            context: {
              todo_ctx: "{'default_email': email}"
            },
            class: 'oe_highlight'
          }
        },
        _button_action_add: {
          _attr: {
            name: 'action_add',
            type: 'object',
            string: 'Blacklist',
            invisible: ['|', ['active', '=', true], ['email', '=', false]],
            class: 'oe_highlight'
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
            email: {},
            active: {
              readonly: '1'
            },
            _br: {}
          }
        }
      }
    }
  },

  mail_blacklist_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.blacklist',
    type: 'search',
    arch: {
      email: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  mail_blacklist_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Blacklisted Email Addresses',
    res_model: 'mail.blacklist',
    search_view_id: 'mail_blacklist_view_search',
    views: {
      tree: 'mail_blacklist_view_tree',
      form: '=======todo=========='
    }
  }
}
