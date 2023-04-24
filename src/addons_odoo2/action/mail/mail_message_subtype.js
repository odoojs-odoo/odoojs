export default {
  view_message_subtype_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.subtype',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        res_model: {},
        default: {}
      }
    }
  },

  view_mail_message_subtype_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.message.subtype',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            _attr: { string: 'Description' },
            name: {},
            sequence: {},
            res_model: {},
            description: {},
            default: {},
            internal: {},
            hidden: {},
            track_recipients: {}
          },
          _group_183: {
            _attr: { string: 'Auto subscription' },
            parent_id: {},
            relation_field: {}
          }
        }
      }
    }
  },

  action_view_message_subtype: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Subtypes',
    res_model: 'mail.message.subtype',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
