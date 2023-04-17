export default {
  account_analytic_plan_form_view_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    inherit_id: 'analytic.account_analytic_plan_form_view',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='applicability_ids']//field[@name='business_domain']",
              position: 'after'
            },
            account_prefix: {},
            product_categ_id: {}
          }
        }
      }
    }
  }
}
