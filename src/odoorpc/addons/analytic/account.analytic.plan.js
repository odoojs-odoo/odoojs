export default {
  account_analytic_plan_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    type: 'tree',
    fields: {
      name: {},
      default_applicability: {},
      //   color: {},
      company_id: {}
    }
  },

  account_analytic_plan_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
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
          name: {},
          //   color: {},
          parent_id: {},
          company_id: {}
        },

        _group_balance: {
          children_count: {},
          all_account_count: {},
          default_applicability: {}
        },
        _group_childs: {
          _span: 2,
          applicability_ids: {
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: { business_domain: {}, applicability: {} }
              },
              form: {
                fields: { business_domain: {}, applicability: {} }
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
