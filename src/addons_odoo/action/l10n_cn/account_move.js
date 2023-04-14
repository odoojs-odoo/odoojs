const view_move_form_sheet = {
  _group: {
    _group_header_left_group: {
      ref: {},
      fapiao: {
        invisible({ record }) {
          //'invisible': ['|', ('country_code','!=', 'CN'),
          //   ('move_type', 'not in', ['out_invoice', 'out_refund', 'in_invoice', 'in_refund'])]
          const { country_code, move_type } = record
          const in_moves = [
            'out_invoice',
            'out_refund',
            'in_invoice',
            'in_refund'
          ]
          return country_code !== 'CN' || !in_moves.includes(move_type)
        }
      }
    }
  }
}

export default {
  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    inherit_id: 'account.view_move_form',

    arch: {
      sheet: { ...view_move_form_sheet }
    }
  }
}
