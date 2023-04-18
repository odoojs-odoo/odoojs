export default {
  mail_channel_member_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel.member',
    type: 'tree',
    arch: {
      sheet: {
        display_name: {},
        channel_id: {},
        seen_message_id: {}
      }
    }
  },

  mail_channel_member_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel.member',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          partner_id: {},
          guest_id: {},
          channel_id: {},
          custom_channel_name: {},
          fetched_message_id: {},
          seen_message_id: {},
          message_unread_counter: {},
          fold_state: {},
          is_minimized: {},
          is_pinned: {},
          last_interest_dt: {},
          last_seen_dt: {},
          rtc_inviting_session_id: {}
        }
      }
    }
  },

  mail_channel_member_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Channels/Member',
    res_model: 'mail.channel.member',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
