export default {
  sms_template_reset_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.template.reset',
    type: 'form',
    arch: {
      sheet: {
        _div: 'Are you sure you want to reset these sms templates to their original configuration? Changes and translations will be lost.',
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

  sms_template_reset_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reset SMS Template',
    type: 'ir.actions.act_window',
    res_model: 'sms.template.reset',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{\n            'default_template_ids': active_ids\n        }" },
    views: {
      tree: 'sms_template_reset_view_form',
      form: '=======todo=========='
    }
  }
}
