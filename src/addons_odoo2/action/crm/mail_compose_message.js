export default {
  action_lead_mail_compose: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send email',
    res_model: 'mail.compose.message',
    search_view_id: 'tooooooodoooooo',
    context: "{     'default_composition_mode': 'comment',     'default_use_template': False,                 }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_lead_mass_mail: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send email',
    res_model: 'mail.compose.message',
    search_view_id: 'tooooooodoooooo',
    context: "{     'default_composition_mode': 'mass_mail',     'default_use_template': False,                 }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
