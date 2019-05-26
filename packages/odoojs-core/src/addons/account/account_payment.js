const account_payment_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.post = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'post',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

export default {
  models: {
    'account.payment.method': {
      fields: ['name', 'code', 'payment_type'],
    },

    'account.payment': {
      fields: [
        'invoice_ids',
        'multi',
        'payment_type',
        'payment_method_id',
        'payment_method_code',
        'partner_type',
        'partner_id',
        'amount',
        'currency_id',
        'payment_date',
        'communication',
        'journal_id',
        //  'hide_payment_method',
        //  'payment_difference',
        //  'payment_difference_handling',
        //  'writeoff_account_id',
        //  'writeoff_label',
        //  'partner_bank_account_id',
        //  'show_partner_bank_account',
        'company_id',
        'name',
        'state',
        'payment_type',
        'payment_reference',
        'move_name',
        'destination_account_id',
        'destination_journal_id',
        'invoice_ids',
        'reconciled_invoice_ids',
        'has_invoices',
        'move_line_ids',
        'move_reconciled',
      ],

      extend: account_payment_extend,
    },
  },
};
