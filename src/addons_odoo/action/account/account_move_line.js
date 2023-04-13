export default {
  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        move_id: { invisible: '1' },
        date: { readonly: '1' },
        company_id: {
          groups: 'base.group_multi_company',
          readonly: '1',
          optional: 'hide'
        },
        journal_id: { optional: 'hide' },
        move_name: {
          string: 'Journal Entry',
          widget: 'open_move_widget',
          ellipsis: true
        },
        account_id: { ellipsis: true },
        partner_id: { optional: 'show' },
        ref: { optional: 'hide' },
        product_id: { optional: 'hide' },
        name: { invisible: 'odoojs', optional: 'show', ellipsis: true },
        tax_ids: { widget: 'many2many_tags', optional: 'hide' },
        amount_currency: { invisible: 'odoojs', optional: 'show' },
        currency_id: { optional: 'hide' },
        debit: {},
        credit: {},
        tax_tag_ids: { widget: 'many2many_tags', optional: 'hide' },
        discount_date: { optional: 'hide' },
        discount_amount_currency: { optional: 'hide' },
        tax_line_id: { optional: 'hide' },
        date_maturity: { optional: 'hide' },
        balance: { optional: 'hide' },
        matching_number: { optional: 'show' },
        amount_residual: { optional: 'hide' },
        amount_residual_currency: { optional: 'hide' },
        analytic_distribution: {
          widget: 'analytic_distribution',
          groups: 'analytic.group_analytic_accounting',
          optional: 'show'
        },
        move_type: { invisible: '1' },
        parent_state: { invisible: '1' },
        account_type: { invisible: '1' },
        statement_line_id: { invisible: '1' },
        company_currency_id: { invisible: '1' },
        is_same_currency: { invisible: '1' },
        is_account_reconcile: { invisible: '1' },
        sequence: { invisible: '1' }
      }
    }
  },

  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        company_id: { invisible: 1 },
        parent_state: { invisible: 1 },

        _group_name: {
          name: {},
          partner_id: {
            readonly: '1',
            // domain="['|', ('parent_id', '=', False), ('is_company', '=', True)]"
            domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
          }
        },

        _notebook: {
          _page_information: {
            _attr: { string: 'Information', name: 'information' },
            _group: {
              _group_Amount: {
                _attr: { string: 'Amount' },
                account_id: {
                  // domain="[('company_id', '=', company_id)]" readonly="1"
                },
                debit: { readonly: '1' },
                credit: { readonly: '1' },
                balance: { readonly: '1' },
                quantity: { readonly: '1' }
              },
              _group_Accounting_Documents: {
                _attr: { string: 'Accounting Documents' },
                move_id: { readonly: '1' },
                statement_id: {
                  readonly: '1',
                  invisible: ({ record }) => {
                    // 'invisible': [('statement_line_id','=',False)]
                    const { statement_line_id } = record
                    return !statement_line_id
                  }
                }
              },
              _group_date: {
                _attr: { string: 'Dates' },
                date: {},
                date_maturity: {}
              },
              _group_tax: {
                _attr: {
                  string: 'Taxes',
                  invisible: ({ record }) => {
                    // 'invisible': [('tax_line_id','=',False), ('tax_ids','=',[])]}">
                    const { tax_line_id, tax_ids = [] } = record
                    return !tax_line_id && !tax_ids.length
                  }
                },

                tax_line_id: {
                  readonly: '1',
                  invisible: ({ record }) => {
                    // 'invisible': [('tax_line_id','=',False)]
                    const { tax_line_id } = record
                    return !tax_line_id
                  }
                },
                tax_ids: {
                  widget: 'many2many_tags',
                  readonly: '1',
                  invisible: ({ record }) => {
                    // 'invisible': [('tax_ids','=',[])]
                    const { tax_ids = [] } = record
                    return !tax_ids.length
                  }
                },
                tax_tag_invert: {},
                tax_audit: {}
              },

              _group_Matching: {
                _attr: {
                  string: 'Matching',
                  invisible: ({ record }) => {
                    // 'invisible':[('matched_debit_ids', '=', []),
                    // ('matched_credit_ids', '=', [])]
                    const { matched_debit_ids = [], matched_credit_ids = [] } =
                      record
                    return (
                      !matched_debit_ids.length && !matched_credit_ids.length
                    )
                  }
                },

                full_reconcile_id: {
                  invisible: ({ record }) => {
                    // 'invisible':[('full_reconcile_id','=',False)]
                    const { full_reconcile_id } = record
                    return !full_reconcile_id
                  }
                },
                matched_debit_ids: { invisible: 1 },
                matched_credit_ids: { invisible: 1 },
                _button: {
                  _attr: {
                    string: '-> View partially reconciled entries',
                    name: 'open_reconcile_view',
                    type: 'object',
                    invisible: ({ record }) => {
                      // 'invisible': ['|',
                      // ('full_reconcile_id', '!=', False),
                      // '&amp;', ('matched_debit_ids', '=', []),
                      // ('matched_credit_ids', '=', [])]
                      const {
                        full_reconcile_id,
                        matched_debit_ids,
                        matched_credit_ids
                      } = record
                      return (
                        full_reconcile_id ||
                        (!matched_debit_ids.length &&
                          !matched_credit_ids.length)
                      )
                    }
                  }
                }
              },

              _group_currency_id: {
                _attr: {
                  string: 'Currency',
                  groups: 'base.group_multi_currency'
                },

                currency_id: { invisible: 1 },
                amount_currency: {}
              },

              _group_product_id: {
                _attr: {
                  string: 'Product',
                  invisible: ({ record }) => {
                    // 'invisible': [('product_id', '=', False)]
                    const { product_id } = record
                    return !product_id
                  }
                },

                product_id: { readonly: '1' }
              },

              _group_States: {
                _attr: { string: 'States' },
                blocked: {}
              },

              _group_analytic: {
                _attr: {
                  string: 'Analytic',
                  groups: 'analytic.group_analytic_accounting'
                },
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  groups: 'analytic.group_analytic_accounting',
                  readonly: '1'
                }
              }
            }
          },
          _page_analytic_line: {
            _attr: {
              string: 'Analytic Lines',
              name: 'analytic_lines',
              groups: 'analytic.group_analytic_accounting'
            },

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
    }
  },

  // 302
  // view_account_move_line_filter

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
