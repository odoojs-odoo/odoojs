export default {
  res_currency_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'res.currency',
    inherit_id: 'base.view_currency_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//sheet',
            position: 'before'
          },
          display_rounding_warning: { invisible: '1' },
          _div: {
            _attr: {
              invisible: [['display_rounding_warning', '=', false]],
              class: 'alert alert-warning',
              text: 'Changing its rounding factor now will not change the rounding made on previous entries; possibly causing an inconsistency with the new ones.'
            },
            _strong: 'This currency has already been used to generate accounting entries.',
            _br: {}
          }
        }
      }
    }
  }
}
