export default {
  account_analytic_distribution_model_tree_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    inherit_id: 'analytic.account_analytic_distribution_model_tree_view',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='partner_id']",
              position: 'before'
            },
            account_prefix: {}
          },
          _xpath_949: {
            _attr: {
              expr: "//field[@name='company_id']",
              position: 'before'
            },
            product_id: {},
            product_categ_id: {}
          }
        }
      }
    }
  },

  account_analytic_distribution_model_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    inherit_id: 'analytic.account_analytic_distribution_model_form_view',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//field[@name='partner_category_id']",
              position: 'after'
            },
            account_prefix: {}
          },
          _xpath_578: {
            _attr: {
              expr: "//field[@name='company_id']",
              position: 'before'
            },
            product_id: {},
            product_categ_id: {}
          }
        }
      }
    }
  }
}
