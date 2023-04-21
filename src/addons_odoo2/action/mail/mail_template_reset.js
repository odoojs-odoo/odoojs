export default {
  mail_template_reset_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.template.reset',
    type: 'form',
    arch: {
      sheet: {
        _div: 'Are you sure you want to reset these email templates to their original configuration? Changes and translations will be lost.',
        _footer: {
          _button_reset_template: {
            _attr: {
              name: 'reset_template',
              type: 'object',
              string: 'Proceed',
              class: 'btn btn-primary'
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
  },

  mail_template_reset_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reset Mail Template',
    type: 'ir.actions.act_window',
    res_model: 'mail.template.reset',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{\n            'default_template_ids': active_ids\n        }" },
    views: {
      tree: 'mail_template_reset_view_form',
      form: '=======todo=========='
    }
  }
}
