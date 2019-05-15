import accountBalance from './accountBalance';

const accountMove = (Model, fields_default = {}) => {
  const state = {};
  const effects = {
    *carryover_profit({ payload }, { call, put }) {
      const { date, line_ids, fields = fields_default } = payload;
      const data = yield Model.carryover_profit(date, line_ids, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'account.balance': accountBalance,
  'account.move': accountMove,
};
