export default {
  view_location_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.location',
    inherit_id: 'stock.view_location_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='additional_info']",
            position: 'after'
          },
          _group: {
            _attr: {
              string: 'Accounting Information',
              invisible: [['usage', 'not in', ('inventory', 'production')]]
            },
            valuation_in_account_id: {
              no_create: true
            },
            valuation_out_account_id: {
              no_create: true
            }
          }
        }
      }
    }
  }
}
