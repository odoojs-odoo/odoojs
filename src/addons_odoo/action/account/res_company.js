export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    inherit_id: 'base.view_company_form',
    arch: {
      sheet: {
        _notebook: {
          _page_general_info: {
            _group: {
              _group: {
                _div: {
                  country_id: {},
                  country_code: { invisible: '1' },
                  account_enabled_tax_country_ids: { invisible: '1' }
                }
              }
            }
          }
        }
      }
    }
  }
}
