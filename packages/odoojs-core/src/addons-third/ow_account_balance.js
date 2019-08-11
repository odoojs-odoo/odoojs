const account_move_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.get_number_cn = async () => {
    const data = await cls._rpc_call('get_number_cn', []);
    return data;
  };

  cls.carryover_profit = async (date, line_ids, kwargs, context) => {
    const method = 'carryover_profit';
    const args = [date, line_ids];
    return await cls._rpc_call_as_create_read(method, args, kwargs, context);
  };

  cls.carryover_vat = async (line_ids, kwargs, context) => {
    const method = 'carryover_vat';
    const args = [line_ids];
    return await cls._rpc_call_as_create_read(method, args, kwargs, context);
  };

  cls.carryover_additional_tax = async (line_ids, tax_ids, kwargs, context) => {
    const method = 'carryover_additional_tax';
    const args = [line_ids, tax_ids];
    return await cls._rpc_call_as_create_read(method, args, kwargs, context);
  };

  return cls;
};

const account_stock_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.post = async (id, kwargs, context) => {
    const method = 'post';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.post_open = async (id, kwargs, context) => {
    const method = 'post_open';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.unpost = async (id, kwargs, context) => {
    const method = 'unpost';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.get_price = async id => {
    const data = await cls._rpc_call('get_price', [id]);
    return data;
  };

  cls.set_out_amount = async (id, kwargs, context) => {
    const method = 'set_out_amount';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  return cls;
};

const account_balance_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.post = async (id, kwargs, context) => {
    const method = 'post';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.unpost = async (id, kwargs, context) => {
    const method = 'unpost';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.find_open = async (date = null, kwargs, context) => {
    const method = 'find_open';
    const args = [date];
    return await cls._rpc_call_as_create_read(method, args, kwargs, context);
  };

  cls.generate_balance = async (date, kwargs, context) => {
    const method = 'generate_balance';
    const args = [date];
    return await cls._rpc_call_as_create_read(method, args, kwargs, context);
  };
  /*
  cls.get_balance_sheet = async ( date ) => {
    const data = await cls._rpc_call('get_balance_sheet', [date] );
    return data;
  };

  cls.get_detail_ledger = async ( date ) => {
    const data = await cls._rpc_call('get_detail_ledger', [date] );
    return data;
  };

  cls.get_general_ledger = async ( date ) => {
    const data = await cls._rpc_call('get_general_ledger', [date] );
    return data;
  };

  cls.get_profit_sheet = async ( date ) => {
    const data = await cls._rpc_call('get_profit_sheet', [date] );
    return data;
  };

  cls.get_balance = async ( date ) => {
    const data = await cls._rpc_call('get_balance', [date] );
    return data;
  };

  cls.get_move_sum = async ( date ) => {
    const data = await cls._rpc_call('get_move_sum', [date] );
    return data;
  };

  cls.get_move_sum_lines = async ( date ) => {
    const data = await cls._rpc_call('get_move_sum_lines', [date] );
    return data;
  };
*/

  return cls;
};

const models = {
  'account.move': {
    extend: account_move_extend,
  },

  'account.balance': {
    extend: account_balance_extend,
  },

  'account.stock': {
    extend: account_stock_extend,
  },
};

export default {
  name: 'ow_account_balance',
  depends: ['ow_account'],

  models,
};
