const ModelFields = {
  activity_ids: {},
  amount_residual: {},
  amount_residual_signed: { string: 'Amount Due' },
  amount_tax_signed: { string: 'Tax' },
  amount_total_in_currency_signed: {
    string: 'Total in Currency',
    groups: 'base.group_multi_currency'
  },
  amount_total_signed: { string: 'Total' },
  amount_untaxed_signed: { string: 'Tax Excluded' },

  auto_post: {
    readonly({ record }) {
      // 'readonly': [('state','!=','draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  auto_post_until: {
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },
  commercial_partner_id: {},
  company_currency_id: {},
  company_id: { groups: 'base.group_multi_company', required: '1' },
  country_code: {},
  currency_id: {
    groups: 'base.group_multi_currency',
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },

  date: {
    string: 'Accounting Date',
    readonly: ({ record }) => {
      // 'readonly': [('state', '!=', 'draft')],
      const { state } = record
      return state !== 'draft'
    }
  },
  display_inactive_currency_warning: {},
  display_qr_code: {},
  duplicated_ref_ids: {},
  fiscal_position_id: {
    domain({ record }) {
      // [('company_id', '=', company_id)]
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },
  has_reconciled_entries: {},
  hide_post_button: {},
  highest_name: {},
  invoice_cash_rounding_id: { groups: 'account.group_cash_rounding' },
  invoice_date: {
    required({ record }) {
      // 在 执行 action_post 时, odoo 服务端检查 该字段是否有值, 且直接报错
      const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
      const { move_type } = record
      return in_moves.includes(move_type)
    }
  },
  invoice_date_due: { placeholder: 'Date' },
  invoice_filter_type_domain: {},
  invoice_has_outstanding: {},
  invoice_incoterm_id: {},
  invoice_line_ids: {
    context: ({ record, context }) => {
      //   context="{
      //     'default_move_type': context.get('default_move_type'),
      //     'journal_id': journal_id,
      //     'default_partner_id': commercial_partner_id,
      //     'default_currency_id': currency_id or company_currency_id,
      //     'default_display_type': 'product',
      //     'quick_encoding_vals': quick_encoding_vals,
      // }"

      const {
        journal_id,
        commercial_partner_id,
        currency_id,
        company_currency_id,
        quick_encoding_vals
      } = record

      return {
        default_move_type: context.default_move_type,
        journal_id,
        default_partner_id: commercial_partner_id,
        default_currency_id: currency_id || company_currency_id,
        default_display_type: 'product',
        quick_encoding_vals: quick_encoding_vals
      }
    }
  },

  invoice_origin: { string: 'Source Document' },
  invoice_outstanding_credits_debits_widget: {},
  invoice_partner_display_name: {
    // string: 'Vendor'
    // string: 'Customer'
    groups: 'base.group_user'
  },

  invoice_payment_term_id: {
    // context: {
    //   todo_ctx:
    //     "{'example_date': invoice_date, 'example_amount': tax_totals['amount_total']}"
    // },
    placeholder: 'Terms'
  },

  invoice_payments_widget: {},
  invoice_source_email: {},

  invoice_user_id: { string: 'Salesperson', domain: [['share', '=', false]] },

  invoice_vendor_bill_id: {
    domain: ({ record }) => {
      // domain="
      // [('company_id', '=', company_id),
      // ('partner_id','child_of', [partner_id]), ('move_type','=','in_invoice')]"
      const { company_id, partner_id } = record
      return [
        ['company_id', '=', company_id],
        ['partner_id', 'child_of', [partner_id]],
        ['move_type', '=', 'in_invoice']
      ]
    },
    context: { show_total_amount: true },
    placeholder: 'Select an old vendor bill'
  },
  is_move_sent: {},
  journal_id: {
    groups: 'account.group_account_readonly',
    readonly: ({ record }) => {
      //  attrs="{'readonly': [('posted_before', '=', True)]}"
      const { posted_before } = record
      return posted_before
    },
    domain({ record }) {
      //  domain="[('id', 'in', suitable_journal_ids)]",
      const { suitable_journal_ids } = record
      return [['id', 'in', suitable_journal_ids]]
    }
  },

  line_ids: {
    context: ({ record, context }) => {
      const {
        line_ids,
        journal_id,
        commercial_partner_id,
        currency_id,
        company_currency_id
      } = record

      // context="{
      //     'default_move_type': context.get('default_move_type'),
      //     'line_ids': line_ids,
      //     'journal_id': journal_id,
      //     'default_partner_id': commercial_partner_id,
      //     'default_currency_id': currency_id or company_currency_id,
      //     'kanban_view_ref': 'account.account_move_line_view_kanban_mobile',
      // }"

      return {
        default_move_type: context.default_move_type,
        line_ids,
        journal_id,
        default_partner_id: commercial_partner_id,
        default_currency_id: currency_id || company_currency_id
      }
    }
  },
  made_sequence_hole: {},
  move_type: { readonly: '1' },
  name: {
    readonly({ record }) {
      //   'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },
    placeholder: 'Draft'
  },

  narration: {
    // placeholder: 'Terms and Conditions'
    // placeholder: 'Add an internal note...'
  },

  partner_bank_id: {
    domain: ({ record }) => {
      // domain="[('partner_id', '=', bank_partner_id)]"
      const { bank_partner_id } = record
      return [['partner_id', '=', bank_partner_id]]
    },

    readonly({ record }) {
      // attrs="{'readonly': [('state', '!=', 'draft')]}
      const { state } = record
      return state !== 'draft'
    },

    context: ({ record }) => {
      // context="{'default_partner_id': bank_partner_id}"
      const { bank_partner_id } = record
      return { default_partner_id: bank_partner_id }
    }
  },

  partner_credit_warning: {
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  partner_id: {
    domain({ record }) {
      // [('company_id', 'in', [company_id, False])]

      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
    // context: { todo_ctx: "{'res_partner_search_mode': (context.get('default_move_type', 'entry') in ('out_invoice', 'out_refund', 'out_receipt') and 'customer') or (context.get('default_move_type', 'entry') in ('in_invoice', 'in_refund', 'in_receipt') and 'supplier') or False,                                             'show_address': 1, 'default_is_company': True, 'show_vat': True}" }
  },

  partner_shipping_id: {
    groups: 'account.group_delivery_invoice_address',
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    },
    domain({ record }) {
      // ['|', ('company_id', '=', False), ('company_id', '=', company_id)]

      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },
  payment_id: {},
  payment_reference: {},
  payment_state: {},
  posted_before: {},
  qr_code_method: {},
  quick_edit_mode: {},
  quick_edit_total_amount: {
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },
  quick_encoding_vals: {},
  ref: {},
  restrict_mode_hash_table: {},
  reversed_entry_id: {},
  show_name_warning: {},
  show_reset_to_draft_button: {},
  state: {
    selection: [
      ['draft', 'Draft'],
      ['posted', 'Posted'],
      ['cancel', 'Cancelled']
    ]
  },
  statement_line_id: {},
  suitable_journal_ids: {},
  tax_cash_basis_created_move_ids: {},
  tax_cash_basis_origin_move_id: {},
  tax_country_id: {},
  tax_lock_date_message: {
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  tax_totals: {
    readonly({ record }) {
      // 'readonly': ['|', ('state', '!=', 'draft'),
      // '&amp;', ('move_type', 'not in', ('in_invoice', 'in_refund')),
      // ('quick_edit_mode', '=', False)]
      const { state, move_type, quick_edit_mode } = record

      return (
        state !== 'draft' ||
        (!['in_invoice', 'in_refund'].includes(move_type) && !quick_edit_mode)
      )
    }
  },
  to_check: {},
  user_id: {}
}

const AddonsFields = {
  'account.move': ModelFields
}

export default AddonsFields
