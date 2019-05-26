const account_move_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.carryover_profit = async (date, line_ids, fields = {}, kwargs = {}) => {
    return cls.call_as_create_read(
      {
        method: 'carryover_profit',
        args: [date, line_ids],
        kwargs,
      },
      fields
    );
  };

  cls.carryover_vat = async (line_ids, fields = {}, kwargs = {}) => {
    return cls.call_as_create_read(
      {
        method: 'carryover_vat',
        args: [line_ids],
        kwargs,
      },
      fields
    );
  };

  cls.carryover_additional_tax = async (
    line_ids,
    tax_ids,
    fields = {},
    kwargs = {}
  ) => {
    return cls.call_as_create_read(
      {
        method: 'carryover_additional_tax',
        args: [line_ids, tax_ids],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

const account_stock_extend = BaseClass => {
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

  cls.post_open = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'post_open',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.unpost = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'unpost',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.get_price = async id => {
    const data = await cls.call('get_price', [id]);
    return data;
  };

  cls.set_out_amount = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'set_out_amount',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

const account_balance_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.find_open = async (date = null, fields = {}, kwargs = {}) => {
    return cls.call_as_create_read(
      {
        method: 'find_open',
        args: [date],
        kwargs,
      },
      fields
    );
  };

  cls.generate_balance = async (date, fields = {}, kwargs = {}) => {
    //const data = await cls.call('generate_balance', [date] );
    //return data;

    return cls.call_as_create_read(
      {
        method: 'generate_balance',
        args: [date],
        kwargs,
      },
      fields
    );
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
  depends: ['ow_account'],

  models: {
    'account.sub.account': {
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

    'account.balance': {
      fields: ['company_id', 'date', 'line_ids', 'is_init'],

      extend: account_balance_extend,
    },

    'account.balance.line': {
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
        'type',
        'quantity',
        'price',
        'balance',
        'debit',
        'credit',
      ],
    },

    'account.stock': {
      fields: [
        'company_id',
        'name',
        'ref',
        'state',
        'date',
        'product_type',
        'direction',
        'move_type',
        'journal_id',
        'account_id',
        'opp_account_id',
        'line_ids',
        'amount',
      ],

      extend: account_stock_extend,
    },

    'account.stock.line': {
      fields: [
        'stock_id',
        'company_id',
        'name',
        'date',
        'product_type',
        'direction',
        'move_type',
        'journal_id',
        'account_id',
        'opp_account_id',
        'product_id',
        'amount',
        'price',
        'quantity_in',
        'quantity_out',
        'quantity',
      ],
    },
  },
};
