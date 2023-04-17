export default {
  digest_digest_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.digest',
    inherit_id: 'digest.digest_digest_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='kpis']/group[last()]",
            position: 'before'
          },
          _group_kpi_account: {
            _attr: {
              name: 'kpi_account',
              string: 'Invoicing',
              groups: 'account.group_account_manager'
            },
            kpi_account_total_revenue: {}
          }
        }
      }
    }
  }
}
