export default {
  model_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model',
    inherit_id: 'base.view_model_form',
    arch: {
      sheet: {
        transient: {
          position: 'after',
          __todo__after: {
            is_mail_thread: {
              groups: 'base.group_no_one',
              readonly: [['state', '!=', 'manual']]
            },
            is_mail_activity: {
              groups: 'base.group_no_one',
              readonly: [['state', '!=', 'manual']]
            },
            is_mail_blacklist: {
              groups: 'base.group_no_one',
              readonly: [['state', '!=', 'manual']]
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//field[@name='field_id']//field[@name='copied']",
            position: 'after'
          },
          state: { invisible: '1' },
          tracking: { readonly: [['state', '!=', 'manual']] }
        }
      }
    }
  },

  model_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.model',
    inherit_id: 'base.view_model_search',
    arch: {
      sheet: {
        model: {
          position: 'after',
          __todo__after: {
            _filter_is_mail_thread: {
              _attr: {
                name: 'is_mail_thread',
                string: 'Mail Thread',
                domain: [['is_mail_thread', '=', true]]
              }
            },
            _filter_is_mail_activity: {
              _attr: {
                name: 'is_mail_activity',
                string: 'Mail Activity',
                domain: [['is_mail_activity', '=', true]]
              }
            },
            _filter_is_mail_blacklist: {
              _attr: {
                name: 'is_mail_blacklist',
                string: 'Mail Blacklist',
                domain: [['is_mail_blacklist', '=', true]]
              }
            }
          }
        }
      }
    }
  }
}
