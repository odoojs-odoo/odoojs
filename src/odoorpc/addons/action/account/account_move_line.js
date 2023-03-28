export default {
  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      move_id: { invisible: '1' },
      date: {},
      company_id: {},
      journal_id: {},
      move_name: { string: 'Journal Entry', widget: 'open_move_widget' },
      account_id: {},
      partner_id: {},
      // ref: {},
      // product_id: {},
      name: {},
      // tax_ids: { widget: 'many2many_tags' },
      // amount_currency: {},
      // currency_id: {},
      debit: {},
      credit: {},
      // tax_tag_ids: {},
      // discount_date: {},
      // discount_amount_currency: {},
      // tax_line_id: {},
      // date_maturity: {},
      // balance: {},
      matching_number: {},
      // amount_residual: {},
      // amount_residual_currency: {},
      // analytic_distribution: { widget: 'analytic_distribution' },
      move_type: { invisible: '1' },
      parent_state: { invisible: '1' },
      account_type: { invisible: '1' },
      statement_line_id: { invisible: '1' },
      company_currency_id: { invisible: '1' },
      is_same_currency: { invisible: '1' },
      is_account_reconcile: { invisible: '1' },
      sequence: { invisible: '1' }
    }
  },

  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {},
          company_id: { invisible: 1 },
          parent_state: { invisible: 1 }
        },

        _group_name: {
          _span: 2,
          name: {},
          partner_id: {
            readonly: '1',
            // domain="['|', ('parent_id', '=', False), ('is_company', '=', True)]"
            domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
          }
        },
        _group_Amount: {
          account_id: {},
          debit: {},
          credit: {},
          balance: {},
          quantity: {}
        },
        _group_Accounting_Documents: {
          move_id: {},
          statement_id: {
            invisible: ({ record }) => {
              // 'invisible': [('statement_line_id','=',False)]
              const { statement_line_id } = record
              return !statement_line_id
            }
          }
        },
        _group_date: { date: {}, date_maturity: {} },
        _group_tax: {
          _invisible: ({ record }) => {
            // 'invisible': [('tax_line_id','=',False), ('tax_ids','=',[])]}">
            const { tax_line_id, tax_ids } = record
            return !tax_line_id && !tax_ids.length
          },
          tax_line_id: {
            invisible: ({ record }) => {
              // 'invisible': [('tax_line_id','=',False)]
              const { tax_line_id } = record
              return !tax_line_id
            }
          },
          tax_ids: {
            widget: 'many2many_tags',
            // readonly="1"
            invisible: ({ record }) => {
              // 'invisible': [('tax_ids','=',[])]
              const { tax_ids } = record
              return !tax_ids.length
            }
          },
          tax_tag_invert: {},
          tax_audit: {}
        },
        _group_Matching: {
          _invisible: ({ record }) => {
            // 'invisible':[('matched_debit_ids', '=', []),
            // ('matched_credit_ids', '=', [])]
            const { matched_debit_ids, matched_credit_ids } = record
            return !matched_debit_ids.length && !matched_credit_ids.length
          },

          full_reconcile_id: {
            // 未核销, 显示 一个按钮 View partially reconciled entries
            // call open_reconcile_view
            // 在 m2o 页面 通过 widget 搞定
            widget: 'many2one_button',
            _action: {
              string: '核销',
              name: 'open_reconcile_view',
              type: 'object'
            }
            //
            // 'invisible':[('full_reconcile_id','=',False)]
            //
            // 'invisible': [
            // '|', ('full_reconcile_id', '!=', False),
            // '&amp;', ('matched_debit_ids', '=', []),
            // ('matched_credit_ids', '=', [])]
            //
          },
          matched_debit_ids: { invisible: 1 },
          matched_credit_ids: { invisible: 1 }
        },
        _group_currency_id: {
          currency_id: { invisible: 1 },
          amount_currency: {}
        },
        _group_product_id: {
          _invisible: ({ record }) => {
            // 'invisible': [('product_id', '=', False)]
            const { product_id } = record
            return !product_id
          },
          product_id: {}
        },
        _group_States: {
          blocked: {}
        },
        _group_analytic: {
          analytic_distribution: { widget: 'analytic_distribution' }
        },

        _group_analytic_line: {
          // todo
          _invisible: 1,
          _span: 2,
          date: { invisible: 1 },
          analytic_line_ids: {
            // context="{'tree_view_ref':'analytic.view_account_analytic_line_tree',
            // 'default_general_account_id':account_id,
            // 'default_name': name,
            // 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}
          }
        }
      }
    }
  },

  action_account_moves_all: {
    _odoo_model: 'ir.actions',
    name: 'Journal Items',
    type: 'ir.actions.act_window',
    res_model: 'account.move.line',
    domain: [
      ['display_type', 'not in', ['line_section', 'line_note']],
      ['parent_state', '!=', 'cancel']
    ],

    context: { journal_type: 'general', search_default_posted: 1 },
    views: {
      tree: 'view_move_line_tree',
      from: 'view_move_line_form'
    }
  }
}
