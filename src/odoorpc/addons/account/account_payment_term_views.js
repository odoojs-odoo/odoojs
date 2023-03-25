export default {
  view_payment_term_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      company_id: {}
    }
  },

  view_payment_term_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'form',
    fields: {
      // sequence: {},
      // active: {},
      //

      name: {},
      company_id: {},
      note: {},

      line_ids: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              sequence: {},
              value: {},
              value_amount: {},
              days: {},
              option: {},
              day_of_the_month: {}
            }
          },
          form: {
            fields: {
              // sequence: {},
              value: {},
              value_amount: {},
              days: {},
              option: {},
              day_of_the_month: {}
            }
          }
        }
      }
    }
  },

  view_payment_term_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'search',
    arch: {
      fields: {
        name: {},
        active: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_payment_term_form: {
    _odoo_model: 'ir.actions',
    name: 'Payment Terms',
    type: 'ir.actions.act_window',
    res_model: 'account.payment.term',
    search_view_id: 'view_payment_term_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_move_tree',
      form: 'view_move_form'
    }
  }
}
