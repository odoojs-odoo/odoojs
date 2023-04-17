export default {
  action_open_account_onboarding_create_invoice: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create first invoice',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    context: {
      default_move_type: 'out_invoice'
    },
    views: {
      tree: 'account.view_move_form',
      form: '=======todo=========='
    }
  }
}
