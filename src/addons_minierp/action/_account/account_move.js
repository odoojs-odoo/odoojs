const invoice_line_ids_form_sheet = {
  display_type: { invisible: '1' },
  company_id: { invisible: '1' },
  partner_id: { invisible: '1' },

  _group_product: {
    product_id: { widget2: 'many2one_barcode' },
    quantity: {},
    product_uom_category_id: { invisible: '1' },
    product_uom_id: {},
    price_unit: {},
    discount: { string: 'Disc.%' }
  },

  _group_account: {
    account_id: {
      readonly: '1',
      domain({ record }) {
        // invoice_line_ids 专用的 的 account_id.domain
        const { parent: prt } = record
        return [
          ['deprecated', '=', false],
          ['account_type', 'not in', ['asset_receivable', 'liability_payable']],
          ['company_id', '=', prt.company_id],
          ['is_off_balance', '=', false]
        ]
      }
    },
    tax_ids: { widget: 'many2many_tags' },
    analytic_distribution: { widget: 'analytic_distribution' }
  },

  _group_name: {
    _field_name: {
      _label_Description: {
        for: 'name',
        string: 'Description',
        invisible({ record }) {
          // 'invisible': [('display_type', 'in',
          // ('line_note', 'line_section'))]}"/>
          const { display_type } = record
          return ['line_note', 'line_section'].includes(display_type)
        }
      },

      _label_Section: {
        for: 'name',
        string: 'Section',
        invisible({ record }) {
          // 'invisible': [('display_type', '!=', 'line_section')]}"/>
          const { display_type } = record
          return display_type !== 'line_section'
        }
      },

      _label_Note: {
        for: 'name',
        string: 'Note',
        invisible({ record }) {
          // 'invisible': [('display_type', '!=', 'line_note')]}"/>
          const { display_type } = record
          return display_type !== 'line_note'
        }
      },

      name: { widget: 'text' }
    }
  },
  _group_amount: {
    price_subtotal: { string: 'Subtotal' },
    price_total: { string: 'Total' }
  }
}

const line_ids_form_sheet = {
  _group_name: {
    account_id: {},
    partner_id: {},
    name: {},
    analytic_distribution: { widget: 'analytic_distribution' },
    amount_currency: {},
    company_currency_id: { invisible: 1 },
    company_id: { invisible: 1 },
    currency_id: {},
    debit: {},
    credit: {},
    balance: { invisible: 1 },
    tax_ids: {
      string: 'Taxes Applied',
      widget: 'autosave_many2many_tags'
    },
    date_maturity: {
      required: 0,
      invisible({ context }) {
        // context.get('view_no_maturity', False)
        return context.view_no_maturity
      }
    }
  }
}

const view_move_form_sheet = {
  _div_button_box: {
    _attr: { name: 'button_box', class: 'oe_button_box' },
    _button_action_open_business_doc: {
      _attr: {
        string: '1 Payment',
        name: 'action_open_business_doc',
        icon: 'fa-bars',
        type: 'object',
        invisible({ record }) {
          const { id: res_id, move_type, payment_id } = record
          return move_type !== 'entry' || !res_id || !payment_id
        }
      }
    },

    _button_open_reconcile_view: {
      _attr: {
        string: 'Reconciled Items',
        name: 'open_reconcile_view',
        icon: 'fa-bars',
        type: 'object',
        invisible({ record }) {
          const { id: res_id, move_type, has_reconciled_entries } = record
          return move_type !== 'entry' || !res_id || !has_reconciled_entries
        }
      }
    },

    _button_open_created_caba_entries: {
      _attr: {
        string: 'Cash Basis Entries',
        name: 'open_created_caba_entries',
        icon: 'fa-usd',
        type: 'object',
        invisible({ record }) {
          const { tax_cash_basis_created_move_ids } = record
          return !tax_cash_basis_created_move_ids.length
        }
      }
    }
  },

  _widget_web_ribbon_paid: {
    _attr: {
      name: 'web_ribbon',
      title: 'Paid',
      invisible({ record }) {
        //'invisible': ['|', ('payment_state', '!=', 'paid'),
        // ('move_type', 'not in',
        // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
        const { payment_state, move_type } = record
        const types = [
          'out_invoice',
          'out_refund',
          'in_invoice',
          'in_refund',
          'out_receipt',
          'in_receipt'
        ]

        return payment_state !== 'paid' || !types.includes(move_type)
      }
    }
  },

  _widget_web_ribbon_in_payment: {
    _attr: {
      name: 'web_ribbon',
      title: 'In Payment',
      invisible({ record }) {
        //'invisible': ['|', ('payment_state', '!=', 'in_payment'),
        // ('move_type', 'not in',
        // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
        const { payment_state, move_type } = record
        const types = [
          'out_invoice',
          'out_refund',
          'in_invoice',
          'in_refund',
          'out_receipt',
          'in_receipt'
        ]

        return payment_state !== 'in_payment' || !types.includes(move_type)
      }
    }
  },

  _widget_web_ribbon_partial: {
    _attr: {
      name: 'web_ribbon',
      title: 'Partial',
      invisible({ record }) {
        //'invisible': ['|', ('payment_state', '!=', 'partial'),
        // ('move_type', 'not in',
        // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
        const { payment_state, move_type } = record
        const types = [
          'out_invoice',
          'out_refund',
          'in_invoice',
          'in_refund',
          'out_receipt',
          'in_receipt'
        ]

        return payment_state !== 'partial' || !types.includes(move_type)
      }
    }
  },

  _widget_web_ribbon_reversed: {
    _attr: {
      name: 'web_ribbon',
      title: 'Reversed',
      bg_color: 'bg-danger',
      invisible({ record }) {
        //'invisible': [('payment_state', '!=', 'reversed')]
        const { payment_state } = record
        return payment_state !== 'reversed'
      }
    }
  },

  _widget_web_ribbon_invoicing_legacy: {
    _attr: {
      name: 'web_ribbon',
      title: 'Invoicing App Legacy',
      bg_color: 'bg-info',
      tooltip:
        "This entry has been generated through the Invoicing app, before installing Accounting. It has been disabled by the 'Invoicing Switch Threshold Date' setting so that it does not impact your accounting.",

      invisible({ record }) {
        //'invisible': [('payment_state', '!=', 'invoicing_legacy')]
        const { payment_state } = record
        return payment_state !== 'invoicing_legacy'
      }
    }
  },

  company_id: { invisible: 1 },
  journal_id: { invisible: 1 },
  show_name_warning: { invisible: 1 },
  posted_before: { invisible: 1 },
  move_type: { invisible: 1 },
  payment_state: { invisible: 1 },
  invoice_filter_type_domain: { invisible: 1 },
  suitable_journal_ids: { invisible: 1 },
  currency_id: { invisible: 1 },
  company_currency_id: { invisible: 1 },
  commercial_partner_id: { invisible: 1 },
  bank_partner_id: { invisible: 1 },
  display_qr_code: { invisible: 1 },
  show_reset_to_draft_button: { invisible: 1 },

  invoice_has_outstanding: { invisible: 1 },
  is_move_sent: { invisible: 1 },
  has_reconciled_entries: { invisible: 1 },
  restrict_mode_hash_table: { invisible: 1 },
  country_code: { invisible: 1 },
  display_inactive_currency_warning: { invisible: 1 },
  statement_line_id: { invisible: 1 },
  payment_id: { invisible: 1 },
  tax_country_id: { invisible: 1 },
  tax_cash_basis_created_move_ids: { invisible: 1 },
  quick_edit_mode: { invisible: 1 },
  hide_post_button: { invisible: 1 },
  duplicated_ref_ids: { invisible: 1 },
  quick_encoding_vals: { invisible: 1 },

  _div_title: {
    move_type: {
      readonly: '1',
      invisible({ record }) {
        const { move_type } = record
        return move_type === 'entry'
      }
    },

    _h1: {
      name: {
        placeholder: 'Draft',
        invisible({ record }) {
          const { name, posted_before, quick_edit_mode } = record
          return name === '/' && !posted_before && !quick_edit_mode
        }
      },

      _span: {
        _attr: {
          text: 'Draft',
          invisible({ record }) {
            const { state, name, quick_edit_mode } = record
            return state !== 'draft' || name !== '/' || quick_edit_mode
          }
        }
      }
    }
  },

  _group: {
    _group_header_left_group: {
      _field_partner_id: {
        _attr: {
          invisible({ record }) {
            const move_types = [
              'out_invoice',
              'out_refund',
              'in_invoice',
              'in_refund',
              'out_receipt',
              'in_receipt'
            ]

            const { move_type } = record
            return !move_types.includes(move_type)
          }
        },
        _label_customer: {
          for: 'partner_id',
          string: 'Customer',
          invisible({ record }) {
            const move_types = ['out_invoice', 'out_refund', 'out_receipt']
            const { move_type } = record
            return !move_types.includes(move_type)
          }
        },
        _label_vendor: {
          for: 'partner_id',
          string: 'Vendor',
          invisible({ record }) {
            const move_types = ['in_invoice', 'in_refund', 'in_receipt']
            const { move_type } = record
            return !move_types.includes(move_type)
          }
        },
        partner_id: {}
      },

      partner_shipping_id: {
        groups: 'account.group_delivery_invoice_address',
        invisible({ record }) {
          const move_types = ['out_invoice', 'out_refund', 'out_receipt']
          const { move_type } = record
          return !move_types.includes(move_type)
        }
      },

      quick_edit_total_amount: {
        invisible({ record }) {
          const { move_type, quick_edit_mode } = record
          return move_type === 'entry' || !quick_edit_mode
        }
      },

      _field_ref_in: {
        _attr: {
          invisible({ record }) {
            const { move_type } = record
            const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
            return !in_moves.includes(move_type)
          }
        },
        _label: { for: 'ref', string: 'Bill Reference' },
        ref: {}
      },

      ref: {
        invisible({ record }) {
          const { move_type } = record
          const in_moves = [
            'in_invoice',
            'in_receipt',
            'in_refund',
            'out_invoice',
            'out_refund'
          ]
          return in_moves.includes(move_type)
        }
      }
    },

    _group_header_right_group: {
      _attr: { id: 'header_right_group' },
      _field_invoice_date: {
        _attr: {
          invisible({ record }) {
            const type_map = [
              'out_invoice',
              'out_refund',
              'in_invoice',
              'in_refund',
              'out_receipt',
              'in_receipt'
            ]

            const { move_type } = record
            return !type_map.includes(move_type)
          }
        },

        _label_invoice: {
          for: 'invoice_date',
          string: 'Invoice Date',
          invisible({ record }) {
            const type_map = ['out_invoice', 'out_refund', 'out_receipt']
            const { move_type } = record
            return !type_map.includes(move_type)
          }
        },
        _label_bill: {
          for: 'invoice_date',
          string: 'Bill Date',
          invisible({ record }) {
            const type_map = ['in_invoice', 'in_refund', 'in_receipt']
            const { move_type } = record
            return !type_map.includes(move_type)
          }
        },
        invoice_date: {}
      },

      date: {
        string: 'Accounting Date',
        invisible({ record }) {
          const out_moves = ['out_invoice', 'out_refund', 'out_receipt']
          const { move_type, quick_edit_mode } = record
          return out_moves.includes(move_type) && !quick_edit_mode
        }
      },

      payment_reference: {
        invisible({ record }) {
          const inout_moves = [
            'out_invoice',
            'out_refund',
            'in_invoice',
            'in_refund',
            'out_receipt',
            'in_receipt'
          ]

          const { move_type } = record
          return !inout_moves.includes(move_type)
        }
      },
      partner_bank_id: {
        invisible({ record }) {
          const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
          const { move_type } = record
          return !in_moves.includes(move_type)
        }
      },

      invoice_date_due: {
        string: 'Due Date',
        placeholder: 'Date',
        invisible({ record }) {
          const move_types = [
            'out_invoice',
            'out_refund',
            'in_invoice',
            'in_refund',
            'out_receipt',
            'in_receipt'
          ]
          const { move_type, invoice_payment_term_id } = record
          return !move_types.includes(move_type) || invoice_payment_term_id
        }
      },

      invoice_payment_term_id: {
        string: 'Payment terms',
        placeholder: 'Terms',
        invisible({ record }) {
          const move_types = [
            'out_invoice',
            'out_refund',
            'in_invoice',
            'in_refund',
            'out_receipt',
            'in_receipt'
          ]
          const { move_type, invoice_payment_term_id } = record
          return !move_types.includes(move_type) || !invoice_payment_term_id
        }
      },

      journal_id: {
        invisible({ context }) {
          return (
            context.default_journal_id &&
            (context.move_type || 'entry') !== 'entry'
          )
        }
      }
    }
  },

  _notebook: {
    _page_invoice_tab: {
      _attr: {
        id: 'invoice_tab',
        name: 'invoice_tab',
        string: 'Invoice Lines',
        invisible: ({ record }) => {
          const { move_type } = record
          return move_type === 'entry'
        }
      },

      invoice_line_ids: {
        widget: 'x2many_tree',
        nolabel: 1,
        views: {
          tree: {
            arch: {
              sheet: {
                sequence: { widget: 'handle' },
                product_id: { optional: 'show' },
                name: { optional: 'show', widget: 'section_and_note_text' },
                account_id: {},
                // analytic_distribution: {
                //   widget: 'analytic_distribution',
                //   optional: 'show'
                // },
                quantity: { optional: 'show' },
                product_uom_category_id: { invisible: '1' },
                product_uom_id: { string: 'UoM', optional: 'show' },
                price_unit: { string: 'Price' },
                discount: { string: 'Disc.%', optional: 'hide' },
                tax_ids: { widget: 'many2many_tags', optional: 'show' },
                price_subtotal: { string: 'Subtotal' },
                price_total: { string: 'Total' },

                partner_id: { invisible: '1' },
                currency_id: { invisible: '1' },
                company_id: { invisible: '1' },
                company_currency_id: { invisible: '1' },
                display_type: { invisible: '1' }
                // product_uom_id: { invisible: '1' }
              }
            }
          },
          form: { arch: { sheet: { ...invoice_line_ids_form_sheet } } }
        }
      },

      _group_oe_invoice_lines_tab: {
        _group_narration_8: {
          narration: { nolabel: 1, placeholder: 'Terms and Conditions' }
        },

        _group__footer: {
          _div_oe_subtotal_footer: {
            _attr: {
              invisible({ record }) {
                const types_out = ['out_invoice', 'out_refund', 'out_receipt']
                const types_in = ['in_invoice', 'in_refund', 'in_receipt']
                const types = [...types_out, ...types_in]
                const { move_type, payment_state } = record
                return (
                  !types.includes(move_type) ||
                  payment_state === 'invoicing_legacy'
                )
              }
            },
            tax_totals: { nolabel: 1, widget: 'account-tax-totals-field' },
            invoice_payments_widget: { nolabel: 1, widget: 'payment' },
            amount_residual: {
              invisible({ record }) {
                const { state } = record
                return state === 'draft'
              }
            }
          },
          invoice_outstanding_credits_debits_widget: {
            nolabel: 1,
            widget: 'payment',
            invisible({ record }) {
              const { state, move_type } = record
              return (
                state !== 'posted' ||
                ['out_receipt', 'in_receipt'].includes(move_type)
              )
            }
          }
        }
      }
    },

    _page_aml_tab: {
      _attr: {
        id: 'aml_tab',
        string: 'Journal Items',
        name: 'aml_tab',
        groups: 'account.group_account_readonly'
      },

      line_ids: {
        widget: 'x2many_tree',
        invisible: ({ record }) => {
          const { payment_state, move_type } = record
          return payment_state === 'invoicing_legacy' && move_type !== 'entry'
        },

        views: {
          tree: {
            arch: {
              sheet: {
                account_id: {
                  invisible: ({ record }) => {
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                partner_id: {
                  optional: 'show',
                  invisible: ({ record }) => {
                    const { parent: prt } = record
                    return prt.move_type !== 'entry'
                  }
                },
                name: { optional: 'show', widget: 'section_and_note_text' },
                // analytic_distribution: {
                //   widget: 'analytic_distribution',
                //   optional: 'show'
                // },
                date_maturity: {
                  optional: 'hide',
                  invisible: ({ record }) => {
                    const { context, display_type } = record
                    return (
                      context.view_no_maturity ||
                      ['line_section', 'line_note'].includes(display_type)
                    )
                  }
                },

                tax_ids: {
                  widget: 'autosave_many2many_tags',
                  optional: 'hide'
                },
                debit: {
                  invisible: ({ record }) => {
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                credit: {
                  invisible: ({ record }) => {
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                balance: { invisible: '1' },
                discount_date: { optional: 'hide' },
                discount_amount_currency: { optional: 'hide' },
                // tax_tag_ids: { widget: 'many2many_tags', optional: 'show' },

                tax_line_id: { invisible: '1' },
                company_currency_id: { invisible: '1' },
                display_type: { invisible: '1', force_save: '1' },
                company_id: { invisible: '1' },
                sequence: { invisible: '1' },
                account_internal_group: { invisible: '1' },
                account_type: { invisible: '1' }
              }
            }
          },
          form: { arch: { sheet: { ...line_ids_form_sheet } } }
        }
      }
    },

    _page_other_tab: {
      _attr: {
        id: 'other_tab',
        string: 'Other Info',
        name: 'other_info',
        invisible({ record }) {
          const { move_type } = record
          return ![
            'out_invoice',
            'out_refund',
            'in_invoice',
            'in_refund'
          ].includes(move_type)
        }
      },
      _group_other_tab_group: {
        _attr: { id: 'other_tab_group' },
        _group_sale_info_group: {
          _attr: {
            name: 'sale_info_group',
            string: 'Invoice',
            invisible({ record }) {
              const { move_type } = record
              return !['out_invoice', 'out_refund'].includes(move_type)
            }
          },
          ref: { string: 'Customer Reference' },
          user_id: { invisible: '1' },
          invoice_user_id: { widget: 'many2one_avatar_user' },
          invoice_origin: { invisible: '1', string: 'Source Document' },
          partner_bank_id: {}
        },
        _group_accounting_info_group: {
          _attr: {
            name: 'accounting_info_group',
            string: 'Accounting',
            invisible({ record }) {
              const { move_type } = record
              return ![
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund'
              ].includes(move_type)
            }
          },
          company_id: {},
          invoice_incoterm_id: {},
          fiscal_position_id: {},
          invoice_cash_rounding_id: {},
          invoice_source_email: {
            widget: 'email',
            invisible({ record }) {
              const { move_type, invoice_source_email } = record
              return (
                !['in_invoice', 'in_refund'].includes(move_type) ||
                !invoice_source_email
              )
            }
          },
          auto_post: {},
          auto_post_until: {
            invisible({ record }) {
              const { auto_post } = record
              return ['no', 'at_date'].includes(auto_post)
            }
          },
          to_check: {}
        }
      }
    },

    _page_other_tab_entry: {
      _attr: {
        id: 'other_tab_entry',
        string: 'Other Info',
        name: 'other_info_2',
        invisible: ({ record }) => {
          const { move_type } = record
          return move_type !== 'entry'
        }
      },
      _group_other_tab_entry_group: {
        _attr: { id: 'other_tab_entry_group' },
        _group_misc_group: {
          _attr: { name: 'misc_group' },
          auto_post: {
            invisible: ({ record }) => {
              const { move_type } = record
              return move_type !== 'entry'
            }
          },
          reversed_entry_id: {
            invisible: ({ record }) => {
              const { move_type } = record
              return move_type !== 'entry'
            }
          },
          auto_post_until: {
            invisible({ record }) {
              const { auto_post } = record
              return ['no', 'at_date'].includes(auto_post)
            }
          },
          to_check: {
            invisible: ({ record }) => {
              // invisible: [['move_type', '!=', 'entry']],
              const { move_type } = record
              return move_type !== 'entry'
            }
          }
        },
        _group_other_tab_entry_group__2: {
          fiscal_position_id: {},
          company_id: { required: '1' }
        }
      },
      narration: { nolabel: 1, placeholder: 'Add an internal note...' }
    }
  }
}

export default {
  view_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    arch: {
      sheet: {
        date: {},
        name: {},
        partner_id: { optional: 'show' },
        ref: { optional: 'show' },
        journal_id: {},
        company_id: { optional: 'show' },
        amount_total_signed: {},
        state: { widget: 'badge' },
        currency_id: { invisible: 1 },
        to_check: { widget: 'boolean_toggle', optional: 'hide' }
      }
    }
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    toolbar: {},

    arch: {
      header: {
        buttons: {
          action_post: {
            name: 'action_post',
            string: 'Post',
            type: 'object',
            groups: 'account.group_account_invoice',
            btn_type: 'primary',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              const { hide_post_button, move_type } = record
              return hide_post_button || move_type !== 'entry'
            }
          },
          action_post2: {
            name: 'action_post',
            string: 'Confirm',
            type: 'object',
            groups: 'account.group_account_invoice',
            btn_type: 'primary',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              const {
                hide_post_button,
                move_type,
                display_inactive_currency_warning
              } = record

              return (
                hide_post_button ||
                move_type === 'entry' ||
                display_inactive_currency_warning
              )
            }
          },
          action_register_payment: {
            name: 'action_register_payment',
            string: 'Register Payment',
            type: 'object',
            groups: 'account.group_account_invoice',
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

          button_cancel: {
            name: 'button_cancel',
            string: 'Cancel Entry',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type !== 'entry'
            }
          },
          button_cancel2: {
            name: 'button_cancel',
            string: 'Cancel',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type === 'entry'
            }
          },
          button_draft: {
            name: 'button_draft',
            string: 'Reset to Draft',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { show_reset_to_draft_button } = record
              return !show_reset_to_draft_button
            }
          },
          button_set_checked: {
            name: 'button_set_checked',
            string: 'Set as Checked',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { to_check } = record
              return !to_check
            }
          }
        },

        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,posted' }
        }
      },

      sheet: { ...view_move_form_sheet }
    }
  },

  view_account_move_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      fields: {
        display_name: {
          string: 'Journal Entry',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['ref', 'ilike', self],
              ['partner_id', 'ilike', self]
            ]
          }
        },
        name: {},
        ref: {},
        partner_id: {},
        journal_id: {}
      },
      filters: {
        group_state: {
          __title: 'State',
          unposted: {
            name: 'unposted',
            string: 'Unposted',
            domain: [['state', '=', 'draft']]
          },
          posted: {
            name: 'posted',
            string: 'Posted',
            domain: [['state', '=', 'posted']]
          }
        },
        group_payment: {
          __title: 'payment_state',
          reversed: {
            name: 'reversed',
            string: 'Reversed',
            domain: [['payment_state', '=', 'reversed']]
          }
        },
        group_to_check: {
          __title: 'to_check',
          to_check: {
            name: 'to_check',
            string: 'To Check',
            domain: [['to_check', '=', true]]
          }
        },
        group_type: {
          __title: 'journal_id.type',
          sales: {
            name: 'sales',
            string: 'Sales',
            domain: [['journal_id.type', '=', 'sale']],
            context: { default_journal_type: 'sale' }
          },
          purchases: {
            name: 'purchases',
            string: 'Purchases',
            domain: [['journal_id.type', '=', 'purchase']],
            context: { default_journal_type: 'purchase' }
          },
          bankoperations: {
            name: 'bankoperations',
            string: 'Bank',
            domain: [['journal_id.type', '=', 'bank']],
            context: { default_journal_type: 'bank' }
          },
          cashoperations: {
            name: 'cashoperations',
            string: 'Cash',
            domain: [['journal_id.type', '=', 'cash']],
            context: { default_journal_type: 'cash' }
          },
          misc_filter: {
            name: 'misc_filter',
            string: 'Miscellaneous',
            domain: [['journal_id.type', '=', 'general']],
            context: { default_journal_type: 'general' }
          }
        },
        group_date: {
          date: { name: 'date', string: 'Date', date: 'date' }
        }
      }
    }
  },

  action_move_journal_line: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Entries',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_move_filter',
    domain: [],
    context: {
      default_move_type: 'entry',
      search_default_misc_filter: 1,
      view_no_maturity: true
    },

    views: {
      tree: 'view_move_tree',
      form: 'view_move_form'
    }
  }
}
