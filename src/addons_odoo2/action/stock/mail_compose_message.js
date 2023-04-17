export default {
  action_lead_mass_mail: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send email',
    res_model: 'mail.compose.message',
    context: "{                 'default_composition_mode': 'mass_mail',                 'default_use_template': False,             }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
