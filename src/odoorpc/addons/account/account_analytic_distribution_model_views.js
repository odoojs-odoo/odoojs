export default {
  account_analytic_distribution_model_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'tree',
    fields: {
      account_prefix: {},
      partner_id: {},
      partner_category_id: {},
      company_id: {},
      product_id: {},
      product_categ_id: {},
      analytic_distribution: { widget: 'analytic_distribution' }
    }
  },

  account_analytic_distribution_model_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'form',
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          _span: 2,
          partner_id: {},
          partner_category_id: {},
          account_prefix: {},
          product_id: {},
          product_categ_id: {},
          company_id: {}
        },

        _group_analytic_distribution: {
          _span: 2,
          analytic_distribution: { widget: 'analytic_distribution' }
        }
      }
    }
  },

  action_analytic_distribution_model: {
    _odoo_model: 'ir.actions',
    name: 'Analytic Distribution Models',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.distribution.model',
    // search_view_id: '',
    domain: [],
    context: {},
    views: {
      tree: 'account_analytic_distribution_model_tree_view',
      form: 'account_analytic_distribution_model_form_view'
    }
  }
}
