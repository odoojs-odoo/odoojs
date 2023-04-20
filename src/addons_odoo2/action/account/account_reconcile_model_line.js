export default {
  view_account_reconcile_model_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.reconcile.model.line',
    type: 'form',
    arch: {
      sheet: {
        model_id: {
          invisible: '1'
        },
        allow_payment_tolerance: {
          invisible: '1'
        },
        payment_tolerance_param: {
          invisible: '1'
        },
        rule_type: {
          invisible: '1'
        },
        _group: {
          _group: {
            account_id: {
              domain: {
                todo_ctx: "[('company_id', '=', company_id)]"
              },
              required: ['|', ['rule_type', '!=', 'invoice_matching'], '&', '&', ['rule_type', '=', 'invoice_matching'], ['allow_payment_tolerance', '=', true], ['payment_tolerance_param', '!=', 0.0]],
              no_create: true
            },
            amount_type: {},
            tax_ids: {
              widget: 'many2many_tags',
              domain: {
                todo_ctx: "[('company_id', '=', company_id)]"
              },
              context: {
                append_type_to_tax_name: true
              },
              no_create: true
            },
            show_force_tax_included: {
              invisible: '1'
            },
            force_tax_included: {
              invisible: [['show_force_tax_included', '=', false]],
              force_save: '1'
            },
            analytic_distribution: {
              widget: 'analytic_distribution',
              groups: 'analytic.group_analytic_accounting',
              account_field: 'account_id',
              business_domain: 'general'
            },
            company_id: {
              invisible: '1'
            }
          },
          _group_252: {
            label: {},
            _label_amount_string: {
              for: 'amount_string'
            },
            _div: {
              amount_string: {
                class: 'oe_inline'
              },
              _span: {
                _attr: {
                  invisible: [['amount_type', '!=', 'percentage']],
                  class: 'o_form_label oe_inline',
                  text: '%'
                }
              }
            }
          }
        }
      }
    }
  }
}
