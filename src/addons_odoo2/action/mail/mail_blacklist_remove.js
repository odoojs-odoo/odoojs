export default {
  mail_blacklist_remove_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.blacklist.remove',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _attr: { class: 'oe_title' },
          email: { string: 'Email Address' },
          reason: { string: 'Reason' }
        },
        _footer: {
          _button_action_unblacklist_apply: {
            _attr: {
              name: 'action_unblacklist_apply',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
