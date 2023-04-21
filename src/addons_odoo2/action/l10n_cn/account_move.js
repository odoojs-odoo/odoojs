export default {
  account_move_form_l10n_cn: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='ref']",
            position: 'after'
          },
          move_type: { invisible: '1' },
          fapiao: { invisible: ['|', ['country_code', '!=', 'CN'], ['move_type', 'not in', ['out_invoice', 'out_refund', 'in_invoice', 'in_refund']]] }
        }
      }
    }
  }
}
