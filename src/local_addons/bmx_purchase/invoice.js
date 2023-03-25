export default {
  tree_in_invoice: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    fields: {
      date: {},
      name: {},
      partner_id: {},
      ref: {},
      journal_id: {},
      company_id: {},
      amount_total_signed: {},
      state: {}
    }
  },

  form_in_invoice: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        buttons: [
          // Post
          {
            name: 'action_post',
            string: '过账',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, auto_post, move_type } = record
              return state !== 'draft' || auto_post || move_type !== 'entry'
            }
          },
          {
            name: 'action_post',
            string: '确认',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const {
                state,
                auto_post,
                move_type,
                display_inactive_currency_warning
              } = record
              return (
                state !== 'draft' ||
                auto_post ||
                move_type === 'entry' ||
                display_inactive_currency_warning
              )
            }
          },

          // Register Payment (only invoices / receipts)
          {
            name: 'action_register_payment',
            string: '登记付款',
            type: 'object',
            btn_type: 'primary',
            context: { dont_redirect_to_payments: true },
            invisible: ({ record }) => {
              const { state, payment_state, move_type } = record
              return (
                state !== 'posted' ||
                !['not_paid', 'partial'].includes(payment_state) ||
                ![
                  'out_invoice',
                  'out_refund',
                  'in_invoice',
                  'in_refund',
                  'out_receipt',
                  'in_receipt'
                ].includes(move_type)
              )
            }
          },

          // Cancel
          {
            name: 'button_cancel',
            string: '取消分录',
            type: 'object',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type !== 'entry'
            }
          },
          {
            name: 'button_cancel',
            string: '取消',
            type: 'object',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type === 'entry'
            }
          },
          {
            name: 'button_draft',
            string: '重置为草稿',
            type: 'object',
            invisible: ({ record }) => {
              const { show_reset_to_draft_button } = record
              return !show_reset_to_draft_button
            }
          }
        ],

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,posted'
          }
        }
      }
    },

    fields: {
      show_name_warning: { invisible: 1 },
      posted_before: { invisible: 1 },

      payment_state: {
        //  invisible: 1
      },
      invoice_filter_type_domain: { invisible: 1 },
      suitable_journal_ids: { invisible: 1 },
      company_currency_id: { invisible: 1 },
      commercial_partner_id: { invisible: 1 },
      bank_partner_id: { invisible: 1 },
      display_qr_code: { invisible: 1 },
      show_reset_to_draft_button: { invisible: 1 },

      invoice_has_outstanding: { invisible: 1 },
      is_move_sent: { invisible: 1 },
      invoice_has_matching_suspense_amount: { invisible: 1 },
      has_reconciled_entries: { invisible: 1 },
      restrict_mode_hash_table: { invisible: 1 },
      country_code: { invisible: 1 },
      display_inactive_currency_warning: { invisible: 1 },
      statement_id: { invisible: 1 },
      payment_id: { invisible: 1 },
      tax_country_id: { invisible: 1 },
      tax_cash_basis_created_move_ids: { invisible: 1 },

      move_type: {},

      state: { invisible: 1 },
      // auto_post: { invisible: 1 },

      name: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      partner_id: {},
      ref: {},
      tax_cash_basis_origin_move_id: {},
      payment_reference: {},
      partner_bank_id: {
        context: ({ record }) => {
          const { bank_partner_id } = record
          return { default_partner_id: bank_partner_id }
        },

        domain: ({ record }) => {
          const { bank_partner_id } = record
          return [['partner_id', '=', bank_partner_id]]
        },
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'fraft'
        }
      },

      invoice_vendor_bill_id: {
        domain: ({ record }) => {
          const { company_id, partner_id } = record
          return [
            ['company_id', '=', company_id],
            ['partner_id', 'child_of', [partner_id]],
            ['move_type', '=', 'in_invoice']
          ]
        }
      },

      invoice_date: {},

      date: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      invoice_date_due: {},
      invoice_payment_term_id: {},

      journal_id: {
        readonly: ({ record }) => {
          const { posted_before } = record
          return posted_before
        }
        // domain: ({ record }) => {
        //   const { suitable_journal_ids } = record
        //   return [['id', 'in', suitable_journal_ids]]
        // }
      },
      currency_id: {
        readonly: ({ record }) => {
          const { state } = record
          return state !== 'draft'
        }
      },

      company_id: {},

      invoice_line_ids: {
        widget: 'x2many_tree',
        invisible: ({ record }) => {
          const { move_type } = record
          return move_type === 'entry'
        },

        context: ({ record, context }) => {
          const {
            journal_id,
            commercial_partner_id,
            currency_id,
            company_currency_id
          } = record

          return {
            default_move_type: context.default_move_type,
            journal_id,
            default_partner_id: commercial_partner_id,
            default_currency_id: currency_id || company_currency_id
          }
        },

        views: {
          tree: {
            fields: {
              sequence: {},
              product_id: {},
              name: {},
              account_id: {},
              analytic_account_id: {},
              analytic_tag_ids: {},
              quantity: {},
              product_uom_id: {},
              price_unit: {},
              discount: {},
              tax_ids: { widget: 'many2many_tags' },
              price_subtotal: {},
              price_total: {}
            }
          },
          form: {
            fields: {
              product_uom_category_id: { invisible: 1 },
              display_type: { invisible: 1 },
              parent_state: { invisible: 1 },

              partner_id: { invisible: 1 },
              company_id: { invisible: 1 },
              debit: { invisible: 1 },
              credit: { invisible: 1 },

              product_id: {},
              quantity: {},

              product_uom_id: {},
              price_unit: {},
              discount: {},
              currency_id: { invisible: 1 },
              analytic_tag_ids: { widget: 'many2many_tags' },
              account_id: {
                readonly2: '1',
                domain: ({ record }) => {
                  const { company_id } = record
                  return [['company_id', '=', company_id]]
                }
              },

              tax_ids: { widget: 'many2many_tags' },
              analytic_account_id: {},
              name: {},

              price_subtotal: {},
              price_total: {},

              sequence: {}
            }
          }
        }
      },

      narration: {},
      tax_totals_json: {},
      invoice_payments_widget: {},
      amount_residual: {},
      invoice_outstanding_credits_debits_widget: {}
    },

    user_id: {},
    invoice_user_id: {
      domain: [['share', '=', false]]
    },
    invoice_origin: {},
    qr_code_method: {},

    //
    // 'invisible': [('move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]}">
    invoice_incoterm_id: {},
    fiscal_position_id: {},
    invoice_cash_rounding_id: {},
    invoice_source_email: {},
    auto_post: {
      readonly: ({ record }) => {
        const { state } = record
        return state !== 'draft'
      }
    },
    to_check: {},

    reversed_entry_id: {}
  },

  action_move_in_invoice: {
    _odoo_model: 'ir.actions',
    name: '采购账单',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    domain: [['move_type', '=', 'in_invoice']],
    context: { default_move_type: 'in_invoice' },
    views: {
      tree: 'tree_in_invoice',
      form: 'form_in_invoice'
    }
  }
}
