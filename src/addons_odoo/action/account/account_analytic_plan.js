export default {
  account_analytic_plan_form_view_inherit_account: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    type: 'form',
    inherit_id: 'analytic.account_analytic_plan_form_view',
    arch: {
      sheet: {
        _notebook: {
          _page_applicability: {
            applicability_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      business_domain: {},
                      account_prefix: {},
                      product_categ_id: {},
                      applicability: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      business_domain: {},
                      account_prefix: {},
                      product_categ_id: {},
                      applicability: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
