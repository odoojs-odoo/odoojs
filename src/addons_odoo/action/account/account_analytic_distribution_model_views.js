export default {
  account_analytic_distribution_model_tree_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'tree',
    inherit_id: 'analytic.account_analytic_distribution_model_tree_view',
    fields: {
      account_prefix: { optional: 'show' },
      partner_id: {},
      partner_category_id: {},
      product_id: { optional: 'show' },
      product_categ_id: { optional: 'hide' },
      company_id: {},
      analytic_distribution: {}
    }
  },

  account_analytic_distribution_model_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'form',
    inherit_id: 'analytic.account_analytic_distribution_model_form_view',
    arch: {
      sheet: {
        _group: {
          _group_partner_id: {
            partner_id: {},
            partner_category_id: {},
            account_prefix: {},
            product_id: {},
            product_categ_id: {},
            company_id: {}
          }
        }
      }
    }
  }
}
