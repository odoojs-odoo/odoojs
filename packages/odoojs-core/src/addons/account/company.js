export default {
  models: {
    'res.company': {
      fields: [
        //  'fiscalyear_last_day',
        //  'fiscalyear_last_month',
        //  'period_lock_date',
        //  'fiscalyear_lock_date',
        //  'transfer_account_id',
        //  'expects_chart_of_accounts',
        //  'chart_template_id',
        //  'bank_account_code_prefix',
        //  'cash_account_code_prefix',
        //  'transfer_account_code_prefix',
        //  'account_sale_tax_id',
        //  'account_purchase_tax_id',
        //  'tax_cash_basis_journal_id',
        //  'tax_calculation_rounding_method',
        //  'currency_exchange_journal_id',
        //  'income_currency_exchange_account_id',
        //  'expense_currency_exchange_account_id',
        //  'anglo_saxon_accounting',
        //  'property_stock_account_input_categ_id',
        //  'property_stock_account_output_categ_id',
        //  'property_stock_valuation_account_id',
        //  'bank_journal_ids',
        //  'overdue_msg',
        //  'tax_exigibility',
        //  'account_bank_reconciliation_start',
        //  'incoterm_id',
        //  'invoice_reference_type',
        //  'qr_code',
        //  'invoice_is_email',
        //  'invoice_is_print',

        'account_opening_move_id',
        // 'Opening Journal Entry',
        // "The journal entry containing the initial balance of all this company's accounts."

        'account_opening_journal_id',
        // 'Opening Journal',
        // "Journal where the opening entry of this company's accounting has been posted."

        'account_opening_date',
        // 'Opening Date',
        //"Date at which the opening entry of this company's accounting has been posted."

        //  'account_setup_bank_data_state',
        //  'account_setup_fy_data_state',
        //  'account_setup_coa_state',
        //  'account_onboarding_invoice_layout_state',
        //  'account_onboarding_sample_invoice_state',
        //  'account_onboarding_sale_tax_state',
        //  'account_invoice_onboarding_state',
        //  'account_dashboard_onboarding_state'
      ],
    },
  },
};
