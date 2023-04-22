export default {
  account_analytic_distribution_model_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'tree',
    arch: {
      sheet: {
        partner_id: { optional: 'show' },
        partner_category_id: { optional: 'hide' },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        },
        analytic_distribution: {
          widget: 'analytic_distribution',
          optional: 'show'
        },
        _button_action_read_distribution_model: {
          _attr: {
            name: 'action_read_distribution_model',
            type: 'object',
            string: 'View',
            class: 'float-end btn-secondary'
          }
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
          _group: {
            _attr: { string: 'Simultaneous conditions to meet' },
            _group: {
              partner_id: {},
              partner_category_id: {}
            },
            _group_205: {
              company_id: { groups: 'base.group_multi_company' }
            }
          },
          _group_394: {
            _attr: { string: 'Analytic distribution to apply' },
            analytic_distribution: {
              widget: 'analytic_distribution',
              options: "{'force_applicability': 'optional', 'disable_save': true}"
            }
          }
        }
      }
    }
  },

  action_analytic_distribution_model: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Analytic Distribution Models',
    res_model: 'account.analytic.distribution.model',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
