export default {
  res_users_settings_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.settings',
    type: 'tree',
    arch: {
      sheet: {
        id: {},
        user_id: {},
        use_push_to_talk: {}
      }
    }
  },

  res_users_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users.settings',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            user_id: {}
          }
        },
        _group_discuss_user_settings: {
          _attr: { name: 'discuss_user_settings' },
          _group: {
            _attr: { string: 'Discuss sidebar' },
            is_discuss_sidebar_category_channel_open: {},
            is_discuss_sidebar_category_chat_open: {}
          },
          _group_365: {
            _attr: { string: 'Voice' },
            use_push_to_talk: {},
            push_to_talk_key: {
              invisible: [['use_push_to_talk', '=', false]],
              placeholder: 'e.g. true.true..f'
            },
            voice_active_duration: { invisible: [['use_push_to_talk', '=', true]] }
          }
        },
        _notebook: {
          _page: {
            _attr: { string: 'Volume per partner' },
            volume_settings_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      partner_id: {},
                      volume: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  res_users_settings_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'User Settings',
    res_model: 'res.users.settings',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
