const account_move_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.carryover_profit = async (date, line_ids) => {
    const data = await cls.call('carryover_profit', [date, line_ids]);
    return data;
  };

  return cls;
};

const account_balance_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.find_open = async (date = null, fields = {}) => {
    const data = await cls.call('find_open', [date]);
    if (data) {
      return cls.browse(data, fields);
    }
    return data;
  };

  cls.generate_balance = async date => {
    const data = await cls.call('generate_balance', [date]);
    return data;
  };

  cls.get_balance_sheet = async date => {
    const data = await cls.call('get_balance_sheet', [date]);
    return data;
  };

  cls.get_detail_ledger = async date => {
    const data = await cls.call('get_detail_ledger', [date]);
    return data;
  };

  cls.get_general_ledger = async date => {
    const data = await cls.call('get_general_ledger', [date]);
    return data;
  };

  cls.get_profit_sheet = async date => {
    const data = await cls.call('get_profit_sheet', [date]);
    return data;
  };

  cls.get_balance = async date => {
    const data = await cls.call('get_balance', [date]);
    return data;
  };

  cls.get_move_sum = async date => {
    const data = await cls.call('get_move_sum', [date]);
    return data;
  };

  cls.get_move_sum_lines = async date => {
    const data = await cls.call('get_move_sum_lines', [date]);
    return data;
  };

  return cls;
};

export default {
  name: 'ow_account_balance',
  depends: ['account'],

  models: {
    'account.account': {
      fields: ['general_code', 'general_name', 'sub_type'],
    },

    'account.account.tag': {
      fields: [
        'code',
        'type',
        'account_codes',
        'group_num',
        'code4',
        'sign',
        'gt_one_year',
      ],
    },

    'oba.account.sub.account': {
      fields: [
        'account_id',
        'account_code',
        'account_name',
        'code',
        'name',
        'sub_type',
        'partner_id',
        'product_id',
        'journal_id',
        'analytic_account_id',
      ],
    },

    'account.move': {
      fields: ['attachment_count'],

      extend: account_move_extend,
    },

    'account.move.line': {
      fields: ['sub_account_id', 'sub_account_id_is_auto'],
    },

    'oba.account.balance': {
      fields: ['company_id', 'date', 'line_ids', 'is_init'],

      extend: account_balance_extend,
    },

    'oba.account.balance.line': {
      fields: [
        'balance_id',
        'company_id',
        'date',
        'date_maturity',
        'account_id',
        'sub_type',
        'sub_account_id',
        'sub_account_id_is_auto',
        'partner_id',
        'product_id',
        'analytic_account_id',
        'journal_id',
        'balance_open',
        'debit_open',
        'credit_open',
        'balance',
        'debit',
        'credit',
        'balance_close',
        'debit_close',
        'credit_close',
      ],
    },
  },
};
