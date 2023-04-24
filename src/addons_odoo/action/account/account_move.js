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
        // domain="[('deprecated', '=', False),
        // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
        // ('company_id', '=', parent.company_id), ('is_off_balance', '=', False)]"
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
  _div_open_duplicated_ref_bill_view: {
    _attr: {
      class: 'alert alert-warning mb-0',
      text: 'Warning: this bill might be a duplicate of',
      invisible({ record }) {
        // invisible: [
        //   '|',
        //   ['state', '!=', 'draft'],
        //   ['duplicated_ref_ids', '=', []]
        // ],
        const { state, duplicated_ref_ids = [] } = record
        return state !== 'draft' || !duplicated_ref_ids.length
      }
    },
    _button_open_duplicated_ref_bill_view: {
      _attr: {
        name: 'open_duplicated_ref_bill_view',
        type: 'object',
        string: 'one of those bills',
        class: 'btn btn-link p-0'
      }
    }
  },
  _div_tax_lock_date_message: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',

      class: 'alert alert-warning mb-0',
      invisible({ record }) {
        // invisible: [
        //   '|',
        //   ['state', '!=', 'draft'],
        //   ['tax_lock_date_message', '=', false]
        // ],
        const { state, tax_lock_date_message } = record
        return state !== 'draft' || !tax_lock_date_message
      }
    },
    tax_lock_date_message: {}
  },
  _div_customer_outstanding_credits: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      invisible: [
        '|',
        '|',
        ['move_type', '!=', 'out_invoice'],
        ['invoice_has_outstanding', '=', false],
        ['payment_state', 'not in', ('not_paid', 'partial')]
      ],
      class: 'alert alert-info mb-0',
      text: [
        'You have',
        'for this customer. You can allocate them to mark this invoice as paid.'
      ]
    },
    _bold: {
      _a: {
        _attr: {
          href: '#outstanding',
          class: 'alert-link',
          text: 'outstanding credits'
        }
      }
    }
  },
  _div_vendor_outstanding_debits: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      invisible: [
        '|',
        '|',
        ['move_type', '!=', 'in_invoice'],
        ['invoice_has_outstanding', '=', false],
        ['payment_state', 'not in', ('not_paid', 'partial')]
      ],
      class: 'alert alert-info mb-0',
      text: [
        'You have',
        'for this vendor. You can allocate them to mark this bill as paid.'
      ]
    },
    _bold: {
      _a: {
        _attr: {
          href: '#outstanding',
          class: 'alert-link',
          text: 'outstanding debits'
        }
      }
    }
  },
  _div_customer_outstanding_debits: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      invisible: [
        '|',
        '|',
        ['move_type', '!=', 'out_refund'],
        ['invoice_has_outstanding', '=', false],
        ['payment_state', 'not in', ('not_paid', 'partial')]
      ],
      class: 'alert alert-info mb-0',
      text: [
        'You have',
        'for this customer. You can allocate them to mark this credit note as paid.'
      ]
    },
    _bold: {
      _a: {
        _attr: {
          href: '#outstanding',
          class: 'alert-link',
          text: 'outstanding debits'
        }
      }
    }
  },
  _div_vendor_outstanding_credits: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      invisible: [
        '|',
        '|',
        ['move_type', '!=', 'in_refund'],
        ['invoice_has_outstanding', '=', false],
        ['payment_state', 'not in', ('not_paid', 'partial')]
      ],
      class: 'alert alert-info mb-0',
      text: [
        'You have',
        'for this vendor. You can allocate them to mark this credit note as paid.'
      ]
    },
    _bold: {
      _a: {
        _attr: {
          href: '#outstanding',
          class: 'alert-link',
          text: 'outstanding credits'
        }
      }
    }
  },
  _div_date: {
    _attr: {
      class: 'alert alert-info mb-0',
      text: [
        'This move is configured to be posted automatically at the accounting date:',
        '.'
      ],
      invisible({ record }) {
        // invisible: ['|', ['state', '!=', 'draft'],
        // ['auto_post', '!=', 'at_date']],
        const { state, auto_post } = record
        return state !== 'draft' || auto_post !== 'at_date'
      }
    },
    date: { readonly: '1' }
  },
  _div_auto_post: {
    _attr: {
      invisible({ record }) {
        // invisible: [
        //   '|',
        //   '|',
        //   ['state', '!=', 'draft'],
        //   ['auto_post', '=', 'no'],
        //   ['auto_post', '=', 'at_date']
        // ],
        const { state, auto_post } = record
        return (
          state !== 'draft' || auto_post === 'no' || auto_post === 'at_date'
        )
      },
      class: 'alert alert-info mb-0',
      text: ['auto-posting enabled. Next accounting date:', '.']
    },
    auto_post: { readonly: '1' },
    date: { readonly: '1' },
    _span: {
      _attr: {
        invisible: [['auto_post_until', '=', false]],
        text: ['The recurrence will end on', '(included).']
      },
      auto_post_until: { readonly: '1' }
    }
  },
  _div_partner_credit_warning: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      class: 'alert alert-warning mb-0',
      invisible({ record }) {
        // invisible: [['partner_credit_warning', '=', '']],
        const { partner_credit_warning } = record
        return !partner_credit_warning
      }
    },
    partner_credit_warning: {}
  },
  _div_bill_action_activate_currency: {
    _attr: {
      invisible: [
        '|',
        ['display_inactive_currency_warning', '=', false],
        ['move_type', 'not in', ('in_invoice', 'in_refund', 'in_receipt')]
      ],
      class: 'alert alert-warning mb-0',
      text: [
        'In order to validate this bill, you must',
        ". The journal entries need to be computed by Odoo before being posted in your company's currency."
      ]
    },
    _button_action_activate_currency: {
      _attr: {
        name: 'action_activate_currency',
        type: 'object',
        class: 'oe_link',
        text: 'activate the currency of the bill'
      }
    }
  },

  _div_invoice_action_activate_currency: {
    _attr: {
      invisible: [
        '|',
        ['display_inactive_currency_warning', '=', false],
        ['move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt')]
      ],
      class: 'alert alert-warning mb-0',
      text: [
        'In order to validate this invoice, you must',
        ". The journal entries need to be computed by Odoo before being posted in your company's currency."
      ]
    },
    _button_action_activate_currency: {
      _attr: {
        name: 'action_activate_currency',
        type: 'object',
        class: 'oe_link',
        text: 'activate the currency of the invoice'
      }
    }
  },
  _div_o_attachment_preview: {
    _attr: {
      invisible: [
        '|',
        [
          'move_type',
          'not in',
          ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')
        ],
        ['state', '!=', 'draft']
      ],
      class: 'o_attachment_preview'
    }
  },

  _div_button_box: {
    _attr: { name: 'button_box', class: 'oe_button_box' },
    _button_action_open_business_doc: {
      _attr: {
        string: '1 Payment',
        name: 'action_open_business_doc',
        icon: 'fa-bars',
        type: 'object',
        invisible({ record }) {
          // 'invisible': ['|', '|',
          // ('move_type', '!=', 'entry'),
          // ('id', '=', False), ('payment_id', '=', False)]}"
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
          // 'invisible': ['|', '|', ('move_type', '!=', 'entry'),
          // ('id', '=', False), ('has_reconciled_entries', '=', False)]
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
          // 'invisible': [('tax_cash_basis_created_move_ids', '=', [])]
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

  // state: { invisible: 1 },

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
        // 'invisible': [('move_type', '=', 'entry')]
        const { move_type } = record
        return move_type === 'entry'
      }
    },

    _div: {
      _attr: {
        invisible({ record }) {
          // 'invisible': [('show_name_warning', '=', False)]
          const { show_name_warning } = record
          return !show_name_warning
        }
      },

      _span_1: { _attr: { text: 'The current highest number is ' } },
      highest_name: {},
      _span_2: {
        _attr: { text: 'You might want to put a higher number here.' }
      }
    },

    _h1: {
      name: {
        placeholder: 'Draft',
        invisible({ record }) {
          // 'invisible':
          // [('name', '=', '/'), ('posted_before', '=', False),
          // ('quick_edit_mode', '=', False)],
          const { name, posted_before, quick_edit_mode } = record
          return name === '/' && !posted_before && !quick_edit_mode
        }
      },

      _span: {
        _attr: {
          text: 'Draft',
          invisible({ record }) {
            // 'invisible': ['|', '|', ('state', '!=', 'draft'),
            // ('name', '!=', '/'), ('quick_edit_mode', '=', True)]
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
            // 'invisible': [
            // ('move_type', 'not in',
            // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]

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
            // 'invisible': [('move_type', 'not in',
            // ('out_invoice', 'out_refund', 'out_receipt'))]
            const move_types = ['out_invoice', 'out_refund', 'out_receipt']
            const { move_type } = record
            return !move_types.includes(move_type)
          }
        },
        _label_vendor: {
          for: 'partner_id',
          string: 'Vendor',
          invisible({ record }) {
            // 'invisible': [('move_type', 'not in',
            // ('in_invoice', 'in_refund', 'in_receipt'))]
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
          // attrs="{'invisible': [
          // ('move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt'))],

          const move_types = ['out_invoice', 'out_refund', 'out_receipt']
          const { move_type } = record
          return !move_types.includes(move_type)
        }
      },

      quick_edit_total_amount: {
        invisible({ record }) {
          // 'invisible': [
          // '|', ('move_type', '=', 'entry'),
          // ('quick_edit_mode', '=', False)],
          const { move_type, quick_edit_mode } = record
          return move_type === 'entry' || !quick_edit_mode
        }
      },

      _field_ref_in: {
        _attr: {
          invisible({ record }) {
            // 'invisible':[('move_type', 'not in',
            // ('in_invoice', 'in_receipt', 'in_refund'))]
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
          // 'invisible':[('move_type', 'in',
          // ('in_invoice', 'in_receipt', 'in_refund', 'out_invoice', 'out_refund'))]
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
      },

      tax_cash_basis_origin_move_id: {
        invisible({ record }) {
          // 'invisible':
          //  [('tax_cash_basis_origin_move_id', '=', False)]}"/>
          const { tax_cash_basis_origin_move_id } = record
          return !tax_cash_basis_origin_move_id
        }
      },

      invoice_vendor_bill_id: {
        string: 'Auto-Complete',
        invisible({ record, editable }) {
          // class="oe_edit_only"
          // 'invisible':
          // ['|', ('state', '!=', 'draft'), ('move_type', '!=', 'in_invoice')]

          const { state, move_type } = record
          return !editable || state !== 'draft' || move_type !== 'in_invoice'
        }
      }
    },

    _group_header_right_group: {
      _attr: { id: 'header_right_group' },
      _field_invoice_date: {
        _attr: {
          invisible({ record }) {
            // 'invisible':
            // [('move_type', 'not in', (
            // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]

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
            //  'invisible':
            // [('move_type', 'not in',
            // ('out_invoice', 'out_refund', 'out_receipt'))]
            const type_map = ['out_invoice', 'out_refund', 'out_receipt']
            const { move_type } = record
            return !type_map.includes(move_type)
          }
        },
        _label_bill: {
          for: 'invoice_date',
          string: 'Bill Date',
          invisible({ record }) {
            // 'invisible': [('move_type', 'not in',
            // ('in_invoice', 'in_refund', 'in_receipt'))]}"/>
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
          // 'invisible':
          // [('move_type', 'in', (
          // 'out_invoice', 'out_refund', 'out_receipt')),
          // ('quick_edit_mode', '=', False)],

          const out_moves = ['out_invoice', 'out_refund', 'out_receipt']

          const { move_type, quick_edit_mode } = record
          return out_moves.includes(move_type) && !quick_edit_mode
        }
      },

      payment_reference: {
        invisible({ record }) {
          // 'invisible':
          // [('move_type', 'not in', (
          // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund',
          // 'out_receipt', 'in_receipt'))]}"/>

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
          // 'invisible': [('move_type', 'not in', (
          // 'in_invoice', 'in_refund', 'in_receipt'))]
          const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
          const { move_type } = record
          return !in_moves.includes(move_type)
        }
      },

      invoice_date_due: {
        string: 'Due Date',
        placeholder: 'Date',
        invisible({ record }) {
          // 'invisible': [('move_type', 'not in',
          // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
          // attrs="{'invisible': [('invoice_payment_term_id', '!=', False)]
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

      _span_payment: 'or',
      invoice_payment_term_id: {
        string: 'Payment terms',
        placeholder: 'Terms',
        invisible({ record }) {
          // 'invisible': [('move_type', 'not in',
          // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
          // 'invisible': [('invoice_payment_term_id', '=', False)]
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
          // invisible="
          // context.get('default_journal_id') and
          // context.get('move_type', 'entry') != 'entry'"
          return (
            context.default_journal_id &&
            (context.move_type || 'entry') !== 'entry'
          )
        }
      },
      _span_journal_id: 'in',
      currency_id: {
        groups: 'base.group_multi_currency',
        invisible({ record }) {
          // 'invisible': [('move_type', '=', 'entry')]
          const { move_type } = record
          return move_type === 'entry'
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
          // 'invisible': [('move_type', '=', 'entry')]
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
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  optional: 'show'
                },
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
                // 'invisible': [
                // '|', ('move_type', 'not in', ('out_invoice', 'out_refund',
                //        'in_invoice', 'in_refund',
                //         'out_receipt', 'in_receipt')),
                // ('payment_state' ,'=', 'invoicing_legacy')]
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
                // attrs="{'invisible':  [('state', '=', 'draft')]}"
                const { state } = record
                return state === 'draft'
              }
            }
          },
          invoice_outstanding_credits_debits_widget: {
            nolabel: 1,
            widget: 'payment',
            invisible({ record }) {
              // 'invisible': ['|',
              // ('state', '!=', 'posted'),
              // ('move_type', 'in', ('out_receipt', 'in_receipt'))]
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
          // attrs="{'invisible':
          // [('payment_state', '=', 'invoicing_legacy'),
          // ('move_type', '!=', 'entry')]}">
          const { payment_state, move_type } = record

          return payment_state === 'invoicing_legacy' && move_type !== 'entry'
        },

        views: {
          tree: {
            arch: {
              sheet: {
                account_id: {
                  invisible: ({ record }) => {
                    // 'invisible': [('display_type', 'in', ('line_section', 'line_note'))],
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                partner_id: {
                  optional: 'show',
                  invisible: ({ record }) => {
                    // attrs="{'column_invisible':
                    // [('parent.move_type', '!=', 'entry')]}"/>
                    const { parent: prt } = record
                    return prt.move_type !== 'entry'
                  }
                },
                name: {
                  optional: 'show',
                  widget: 'section_and_note_text'
                },
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  optional: 'show'
                },
                date_maturity: {
                  optional: 'hide',
                  invisible: ({ record }) => {
                    // invisible="context.get('view_no_maturity')"
                    //  'invisible':
                    // [('display_type', 'in', ('line_section', 'line_note'))]}"/>
                    const { context, display_type } = record
                    return (
                      context.view_no_maturity ||
                      ['line_section', 'line_note'].includes(display_type)
                    )
                  }
                },
                amount_currency: { optional: 'hide' },
                currency_id: {
                  optional: 'hide',
                  invisible: ({ record }) => {
                    // attrs="{'column_invisible':
                    // [('parent.move_type', '!=', 'entry')]}"/>
                    const { parent: prt } = record
                    return prt.move_type !== 'entry'
                  }
                },
                tax_ids: {
                  widget: 'autosave_many2many_tags',
                  optional: 'hide'
                },
                debit: {
                  invisible: ({ record }) => {
                    // 'invisible':
                    // [('display_type', 'in', ('line_section', 'line_note'))],
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                credit: {
                  invisible: ({ record }) => {
                    // 'invisible':
                    // [('display_type', 'in', ('line_section', 'line_note'))],
                    const { display_type } = record
                    return ['line_section', 'line_note'].includes(display_type)
                  }
                },
                balance: { invisible: '1' },
                discount_date: { optional: 'hide' },
                discount_amount_currency: { optional: 'hide' },
                tax_tag_ids: { widget: 'many2many_tags', optional: 'show' },
                tax_tag_invert: { optional: 'hide' },
                // <button name="action_automatic_entry"
                // type="object"
                // icon="fa-calendar"
                // string="Cut-Off"
                // aria-label="Change Period"
                // class="float-end"
                // attrs="{'invisible': [('account_internal_group', 'not in', ('income', 'expense'))], 'column_invisible': ['|', ('parent.move_type', '=', 'entry'), ('parent.state', '!=', 'posted')]}"
                // context="{'hide_automatic_options': 1, 'default_action': 'change_period'}"/>

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
      },

      _div_alert: {
        _attr: {
          invisible: [
            '|',
            ['payment_state', '!=', 'invoicing_legacy'],
            ['move_type', '=', 'entry']
          ],
          class: 'alert alert-info text-center mb-0'
        },
        _span:
          'This entry has been generated through the Invoicing app, before installing Accounting. Its balance has been imported separately.'
      }
    },

    _page_other_tab: {
      _attr: {
        id: 'other_tab',
        string: 'Other Info',
        name: 'other_info',
        invisible({ record }) {
          // 'invisible':
          // [('move_type', 'not in',
          // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]

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
              // 'invisible': [('move_type', 'not in',
              // ('out_invoice', 'out_refund'))]
              const { move_type } = record
              return !['out_invoice', 'out_refund'].includes(move_type)
            }
          },
          ref: { string: 'Customer Reference' },
          user_id: { invisible: '1' },
          invoice_user_id: { widget: 'many2one_avatar_user' },
          invoice_origin: { invisible: '1', string: 'Source Document' },
          partner_bank_id: {},
          qr_code_method: {
            invisible({ record }) {
              // 'invisible': [('display_qr_code', '=', False)]
              const { display_qr_code } = record
              return !display_qr_code
            }
          }
        },
        _group_accounting_info_group: {
          _attr: {
            name: 'accounting_info_group',
            string: 'Accounting',
            invisible({ record }) {
              // attrs="{'invisible':
              // [('move_type', 'not in',
              // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]

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
              // attrs="{'invisible': ['|',
              // ('move_type', 'not in', ('in_invoice', 'in_refund')),
              // ('invoice_source_email', '=', False)]}"/>

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
              // attrs="{'invisible': [('auto_post', 'in', ('no', 'at_date'))],
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
          // attrs="{'invisible': [('move_type', '!=', 'entry')]}">
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
              // invisible: [['move_type', '!=', 'entry']],
              const { move_type } = record
              return move_type !== 'entry'
            }
          },
          reversed_entry_id: {
            invisible: ({ record }) => {
              // invisible: [['move_type', '!=', 'entry']],
              const { move_type } = record
              return move_type !== 'entry'
            }
          },
          auto_post_until: {
            invisible({ record }) {
              // 'invisible': [('auto_post', 'in', ('no', 'at_date'))],
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
        made_sequence_hole: { invisible: 1 },
        date: {},
        name: {},
        partner_id: { optional: 'show' },
        ref: { optional: 'show' },
        journal_id: {},
        company_id: { optional: 'show' },
        amount_total_signed: {},
        state: {
          widget: 'badge'
          // decoration-info="state == 'draft'" decoration-success="state == 'posted'"
        },
        currency_id: { invisible: 1 },
        to_check: { widget: 'boolean_toggle', optional: 'hide' }
      }
    }
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    toolbar: {
      action: {
        // 在数据库中 找到 所有绑定到该模型的 action
        // select * from ir_actions where binding_model_id = ?
        // model_account_move
        //
        //
        // action_invoice_order_generate_link
      },
      print: {
        // odoo 原生是 report kanban
        // 需要 前端自定义
      }
    },

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
              // attrs="{'invisible':
              // ['|', ('hide_post_button', '=', True),
              // ('move_type', '!=', 'entry')]}"/>

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
              // 'invisible':
              // ['|', '|',
              // ('hide_post_button', '=', True),
              // ('move_type', '=', 'entry'),
              // ('display_inactive_currency_warning','=',True)]

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
          action_invoice_sent: {
            name: 'action_invoice_sent',
            string: 'Send & Print',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state, is_move_sent, move_type } = record
              return (
                state !== 'posted' ||
                is_move_sent ||
                !['out_invoice', 'out_refund'].includes(move_type)
              )
            }
          },
          action_invoice_sent2: {
            name: 'action_invoice_sent',
            string: 'Send & Print',
            type: 'object',
            invisible: ({ record }) => {
              const { state, is_move_sent, move_type } = record
              return (
                state !== 'posted' ||
                !is_move_sent ||
                ![
                  'out_invoice',
                  'out_refund',
                  'in_invoice',
                  'in_refund'
                ].includes(move_type)
              )
            }
          },
          action_register_payment: {
            name: 'action_register_payment',
            string: 'Register Payment',
            type: 'object',
            groups: 'account.group_account_invoice',
            btn_type: 'primary',
            // context="{'dont_redirect_to_payments': True}"
            context: { dont_redirect_to_payments: true },
            invisible: ({ record }) => {
              // attrs="{'invisible':
              // ['|', '|', ('state', '!=', 'posted'),
              // ('payment_state', 'not in', ('not_paid', 'partial')),
              // ('move_type', 'not in', (
              // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund',
              // 'out_receipt', 'in_receipt'))]}"

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
          preview_invoice: {
            name: 'preview_invoice',
            string: 'Preview',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { move_type } = record
              return !['out_invoice', 'out_refund'].includes(move_type)
            }
          },
          action_view_account_move_reversal: {
            name: 'action_view_account_move_reversal',
            string: 'Reverse Entry',
            type: 'action',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { move_type, state, payment_state } = record
              return (
                move_type !== 'entry' ||
                state !== 'posted' ||
                payment_state === 'reversed'
              )
            }
          },
          action_reverse: {
            name: 'action_reverse',
            string: 'Add Credit Note',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              const { move_type, state } = record
              return (
                !['out_invoice', 'in_invoice'].includes(move_type) ||
                state !== 'posted'
              )
            }
          },
          button_cancel: {
            name: 'button_cancel',
            string: 'Cancel Entry',
            type: 'object',
            groups: 'account.group_account_invoice',
            invisible: ({ record }) => {
              // attrs="{'invisible' :
              // ['|', '|', ('id', '=', False),
              // ('state', '!=', 'draft'),('move_type', '!=', 'entry')]}"/>

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
              // attrs="{'invisible' :
              // ['|', '|', ('id', '=', False),
              //  ('state', '!=', 'draft'),
              // ('move_type', '==', 'entry')]}"/>
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
              // attrs="{'invisible' :
              // [('show_reset_to_draft_button', '=', False)]}" data-hotkey="q" />

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
              // attrs="{'invisible' : [('to_check', '=', False)]}" data-hotkey="k" />

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
        // date: {},
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
