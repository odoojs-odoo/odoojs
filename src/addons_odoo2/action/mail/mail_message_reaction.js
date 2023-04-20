export default {
  mail_message_reaction_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.reaction',
    type: 'tree',
    arch: {
      sheet: {
        id: {},
        message_id: {},
        content: {},
        partner_id: {},
        guest_id: {}
      }
    }
  },

  mail_message_reaction_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Message Reactions',
    res_model: 'mail.message.reaction',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
