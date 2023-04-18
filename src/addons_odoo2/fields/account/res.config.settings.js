const ModelFields = {
  account_cash_basis_base_account_id: {},
  account_default_credit_limit: {},
  account_fiscal_country_id: {},
  account_journal_early_pay_discount_gain_account_id: {},
  account_journal_early_pay_discount_loss_account_id: {},
  account_journal_payment_credit_account_id: {},
  account_journal_payment_debit_account_id: {},
  account_journal_suspense_account_id: {},
  account_storno: {},
  account_use_credit_limit: {},
  chart_template_id: {},
  country_code: {
    groups: 'account.group_account_manager'
  },

  currency_exchange_journal_id: {},
  currency_id: {
    context: {
      active_test: false
    }
  },

  early_pay_discount_computation: {},
  expense_currency_exchange_account_id: {},
  group_analytic_accounting: {},
  group_cash_rounding: {},
  group_multi_currency: {},
  group_sale_delivery_address: {},
  group_show_line_subtotals_tax_excluded: {},
  group_show_line_subtotals_tax_included: {},
  group_show_purchase_receipts: {},
  group_show_sale_receipts: {},
  group_warning_account: {},
  has_accounting_entries: {},
  has_chart_of_accounts: {},
  income_currency_exchange_account_id: {},
  incoterm_id: {},
  invoice_is_email: {},
  invoice_is_print: {},
  invoice_terms: {
    placeholder: 'Insert your terms & conditions here...'
  },

  module_account_bank_statement_import_camt: {},
  module_account_bank_statement_import_csv: {},
  module_account_bank_statement_import_ofx: {},
  module_account_bank_statement_import_qif: {},
  module_account_batch_payment: {},
  module_account_budget: {},
  module_account_check_printing: {},
  module_account_intrastat: {},
  module_account_invoice_extract: {},
  module_account_payment: {},
  module_account_reports: {},
  module_account_sepa: {},
  module_account_sepa_direct_debit: {},
  module_account_taxcloud: {},
  module_currency_rate_live: {},
  module_l10n_eu_oss: {},
  module_product_margin: {},
  module_snailmail_account: {},
  preview_ready: {},
  purchase_tax_id: {
    domain: {
      todo_ctx: "[('type_tax_use', 'in', ('purchase', 'all')), ('company_id', '=', company_id)]"
    }
  },

  qr_code: {},
  quick_edit_mode: {
    placeholder: 'Disabled'
  },

  sale_tax_id: {
    domain: {
      todo_ctx: "[('type_tax_use', 'in', ('sale', 'all')), ('company_id', '=', company_id)]"
    }
  },

  show_line_subtotals_tax_selection: {},
  tax_calculation_rounding_method: {},
  tax_cash_basis_journal_id: {},
  tax_exigibility: {},
  terms_type: {},
  transfer_account_id: {},
  use_invoice_terms: {}
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

