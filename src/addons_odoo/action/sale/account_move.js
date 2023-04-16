const view_move_form_sheet = {
  //
}
export default {
  account_invoice_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    inherit_id: 'account.view_move_form',

    arch: {
      sheet: { ...view_move_form_sheet }
    }
  }
}
