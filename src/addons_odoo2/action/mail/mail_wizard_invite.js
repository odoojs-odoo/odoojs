export default {
  mail_wizard_invite_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.wizard.invite',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          res_model: {
            invisible: '1'
          },
          res_id: {
            invisible: '1'
          },
          partner_ids: {
            widget: 'many2many_tags_email',
            context: {
              force_email: true,
              show_email: true
            },
            placeholder: 'Add contacts to notify...'
          },
          send_mail: {},
          message: {
            invisible: [['send_mail', '!=', true]],
            class: 'test_message',
            options: "{'style-inline': true, 'no-attachment': true}"
          }
        },
        _footer: {
          _button_add_followers: {
            _attr: {
              name: 'add_followers',
              type: 'object',
              string: 'Add Followers',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
