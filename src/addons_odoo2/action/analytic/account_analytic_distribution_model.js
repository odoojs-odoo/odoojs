export default {
  account_analytic_distribution_model_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.distribution.model',
    type: 'tree',
    arch: {
      sheet: {
        partner_id: {},
        partner_category_id: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        analytic_distribution: {
          widget: 'analytic_distribution'
        },
        _button_action_read_distribution_model: {
          _attr: {
            name: 'action_read_distribution_model',
            string: 'View',
            class: 'float-end btn-secondary',
            type: 'object'
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
            _attr: {
              string: 'Simultaneous conditions to meet'
            },
            _group: {
              partner_id: {},
              partner_category_id: {}
            },
            _group_624: {
              company_id: {
                groups: 'base.group_multi_company'
              }
            }
          },
          _group_571: {
            _attr: {
              string: 'Analytic distribution to apply'
            },
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
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
