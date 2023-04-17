export default {
  view_full_reconcile_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.full.reconcile',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _div_title: {
            _attr: {
              class: 'oe_title'
            },
            _h1: {
              name: {}
            }
          },
          _separator: {
            _attr: {
              string: 'Matched Journal Items'
            }
          },
          reconciled_line_ids: {}
        }
      }
    }
  }
}
