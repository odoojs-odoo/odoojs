export default {
  view_mail_alias_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.alias',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_open_document: {
            _attr: {
              name: 'open_document',
              type: 'object',
              string: 'Open Document',
              invisible: ['|', ['alias_model_id', '=', false], ['alias_force_thread_id', '=', 0]],
              class: 'oe_link'
            }
          },
          _button_open_parent_document: {
            _attr: {
              name: 'open_parent_document',
              type: 'object',
              string: 'Open Parent Document',
              icon: 'fa-sitemap',
              invisible: ['|', ['alias_parent_model_id', '=', false], ['alias_parent_thread_id', '=', 0]],
              class: 'oe_link'
            }
          }
        },
        _h2: {
          alias_name: {
            class: 'oe_inline'
          },
          alias_domain: {
            class: 'oe_inline'
          }
        },
        _group: {
          alias_model_id: {},
          alias_force_thread_id: {},
          alias_defaults: {},
          alias_contact: {},
          alias_user_id: {},
          alias_parent_model_id: {},
          alias_parent_thread_id: {}
        },
        _label_alias_bounced_content: {
          for: 'alias_bounced_content',
          invisible: [['alias_contact', '=', 'everyone']]
        },
        alias_bounced_content: {
          invisible: [['alias_contact', '=', 'everyone']]
        }
      }
    }
  },

  view_mail_alias_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.alias',
    type: 'tree',
    arch: {
      sheet: {
        alias_name: {},
        alias_model_id: {},
        alias_user_id: {},
        alias_defaults: {},
        alias_contact: {}
      }
    }
  },

  view_mail_alias_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.alias',
    type: 'search',
    arch: {
      alias_name: {},
      alias_model_id: {},
      alias_force_thread_id: {},
      alias_parent_model_id: {},
      alias_parent_thread_id: {},
      _separator: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: [['alias_name', '!=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_User: {
          _attr: {
            name: 'User',
            string: 'User',
            context: {
              group_by: 'alias_user_id'
            }
          }
        },
        _filter_Model: {
          _attr: {
            name: 'Model',
            string: 'Model',
            context: {
              group_by: 'alias_model_id'
            }
          }
        }
      }
    }
  },

  action_view_mail_alias: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Aliases',
    res_model: 'mail.alias',
    context: {
      todo_ctx: "{\n                    'search_default_active': True,\n                }\n            "
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
