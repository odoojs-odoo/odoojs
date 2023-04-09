export default {
  account_analytic_plan_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    type: 'tree',
    fields: {
      name: {},
      default_applicability: {},
      color: { widget: 'color_picker' },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  account_analytic_plan_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _button_action_view_children_plans: {
            _attr: {
              name: 'action_view_children_plans',
              type: 'object',
              icon: 'fa-bars'
            },
            children_count: { string: 'Subplans', widget: 'statinfo' }
          },
          _button_action_view_analytical_accounts: {
            _attr: {
              name: 'action_view_analytical_accounts',
              type: 'object',
              icon: 'fa-bars'
            },
            all_account_count: {
              string: 'Analytic Accounts',
              widget: 'statinfo'
            }
          }
        },

        _div_title: {
          _h1: { name: {} }
        },

        _group: {
          _group_name: {
            parent_id: {},
            default_applicability: {
              invisible({ record }) {
                // 'invisible':
                // [('parent_id', '!=', False)]
                const { parent_id } = record
                return !parent_id
              }
            },
            color: { widget: 'color_picker' }
          },

          _group_company_id: {
            company_id: { groups: 'base.group_multi_company' }
          }
        },

        _notebook: {
          _page_applicability: {
            _attr: {
              string: 'Applicability',
              name: 'applicability',
              invisible({ record }) {
                // 'invisible':
                // [('parent_id', '!=', False)]
                const { parent_id } = record
                return !parent_id
              }
            },
            applicability_ids: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  fields: {
                    business_domain: {},
                    applicability: {}
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      business_domain: {},
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
  },

  account_analytic_plan_action: {
    _odoo_model: 'ir.actions',
    name: '分析计划',
    type: 'ir.actions.act_window',
    res_model: 'account.analytic.plan',
    // search_view_id: '',
    domain: [['parent_id', '=', false]],
    context: {},
    views: {
      tree: 'account_analytic_plan_tree_view',
      form: 'account_analytic_plan_form_view'
    }
  }
}
