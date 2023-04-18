export default {
  mail_channel_rtc_session_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel.rtc.session',
    type: 'search',
    arch: {
      channel_member_id: {},
      _filter_group_by_channel: {
        _attr: {
          name: 'group_by_channel',
          string: 'Channel',
          domain: [],
          context: {
            group_by: 'channel_id'
          }
        }
      }
    }
  },

  mail_channel_rtc_session_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel.rtc.session',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_disconnect: {
            _attr: {
              name: 'action_disconnect',
              string: 'Disconnect',
              type: 'object'
            }
          }
        },
        id: {},
        channel_member_id: {},
        channel_id: {},
        write_date: {}
      }
    }
  },

  mail_channel_rtc_session_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel.rtc.session',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            channel_member_id: {}
          }
        },
        _group: {
          _group: {
            _attr: {
              string: 'Identity'
            },
            channel_id: {},
            partner_id: {},
            guest_id: {}
          },
          _group_815: {
            _attr: {
              string: 'State'
            },
            is_screen_sharing_on: {},
            is_camera_on: {},
            is_muted: {},
            is_deaf: {}
          }
        }
      }
    }
  },

  mail_channel_rtc_session_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'RTC sessions',
    res_model: 'mail.channel.rtc.session',
    context: {
      search_default_group_by_channel: true
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
