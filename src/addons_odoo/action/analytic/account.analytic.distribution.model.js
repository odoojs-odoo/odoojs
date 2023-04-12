export default {
  account_analytic_distribution_model_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'tree',
    arch: {
      sheet: {
        partner_id: { optional: 'show' },
        partner_category_id: { optional: 'hide' },
        company_id: { optional: 'show', groups: 'base.group_multi_company' },
        analytic_distribution: {
          optional: 'show',
          widget: 'analytic_distribution'
        }
      }
    }
  },

  account_analytic_distribution_model_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_partner_id: {
            _attr: { string: 'Simultaneous conditions to meet' },
            partner_id: {},
            partner_category_id: {},
            company_id: { groups: 'base.group_multi_company' }
          },
          _group_analytic_distribution: {
            analytic_distribution: { widget: 'analytic_distribution' }
          }
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
