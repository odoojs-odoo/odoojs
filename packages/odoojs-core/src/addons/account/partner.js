//TBD 2019-5-19
//account.fiscal.position
//account.fiscal.position.tax
//account.fiscal.position.account

export default {
  models: {
    'res.partner': {
      fields: [
        'credit',
        'debit',
        //  'debit_limit',
        //  'total_invoiced',
        //  'currency_id',
        //  'contracts_count',
        //  'journal_item_count',
        'property_account_payable_id',
        'property_account_receivable_id',
        //  'property_payment_term_id',
        //  'property_supplier_payment_term_id',
        //  'ref_company_ids',
        //  'has_unreconciled_entries',
        //  'last_time_entries_checked',
        //  'invoice_ids',
        //  'contract_ids',
        //  'bank_account_count',
        //  'trust',
        //  'invoice_warn',
        //  'invoice_warn_msg',
      ],
    },
  },
};
