export default {
  ir_actions_server_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.actions.server',
    inherit_id: 'base.view_server_action_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='link_field_id']",
            position: 'after'
          },
          sms_template_id: {
            invisible: [['state', '!=', 'sms']],
            required: [['state', '=', 'sms']],
            context: {
              todo_ctx: "{'default_model': model_name}"
            }
          },
          sms_method: {
            string: 'Send as',
            invisible: [['state', '!=', 'sms']],
            required: [['state', '=', 'sms']]
          }
        }
      }
    }
  }
}
