export default {
  view_move_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    inherit_id: 'stock.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_get_account_moves: {
            _attr: {
              name: 'action_get_account_moves',
              type: 'object',
              string: 'Accounting Entries',
              icon: 'fa-usd',
              groups: 'account.group_account_readonly',
              class: 'oe_stat_button'
            }
          }
        }
      }
    }
  }
}
