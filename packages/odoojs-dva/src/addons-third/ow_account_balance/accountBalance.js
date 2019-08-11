const getDvamodel = Model => {
  const state = {
    isGenerated: 0,
    balances: [],
    moveLinesSum: [],
    moveSum: {},
    detailLedgerData: [],
    generalLedgerData: [],
    balanceSheetData: [],
    profitSheetData: [],
  };

  const effects = {
    *post({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.post(id, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *unpost({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.unpost(id, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *find_open({ payload }, { call, put }) {
      const { date, fields } = payload;
      const data = yield Model.find_open(date, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *generate_balance({ payload }, { call, put }) {
      const { date, fields } = payload;
      const data = yield Model.generate_balance(date, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    /*
    *get_balance({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_balance(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      yield put({
          type: 'save',
          payload: {balances: result, error: error2 },
      });
    },

    *get_move_sum_lines({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_move_sum_lines(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      yield put({
          type: 'save',
          payload: {moveLinesSum: result, error: error2},
      });
    },

    *get_move_sum({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_move_sum(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      yield put({
          type: 'save',
          payload: {moveSum: result, error: error2},
      });
    },

    *get_detail_ledger({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_detail_ledger(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      yield put({
          type: 'save',
          payload: {detailLedgerData: result, error: error2},
      });
    },

    *get_general_ledger({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_general_ledger(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      yield put({
          type: 'save',
          payload: {generalLedgerData: result, error: error2},
      });
    },

    *get_balance_sheet({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_balance_sheet(date)

      const {code, result, error} = data;
      const error2 = code ? error : {};

      const ret2 = result.map(item=>{
        return {
          ...item,
          name: `${item.name0}${item.name}`,
          balance: item.balance * item.sign,
          year_open: item.year_open * item.sign,
        }
      })


      yield put({
          type: 'save',
          payload: {balanceSheetData: ret2, error: error2},
      });
    },


    *get_profit_sheet({payload}, { call, put }) {
      const {date } = payload
      const data = yield Model.get_profit_sheet(date)
      const {code, result, error} = data;
      const error2 = code ? error : {};
      const ret2 = result.map(item=>{
        return {
          ...item,
          name: `${item.name0}${item.name}`,
          amount_year: item.amount_year * item.sign,
          amount_month: item.amount_month * item.sign,
        }
      })

      yield put({
          type: 'save',
          payload: {profitSheetData: ret2, error: error2},
      });
    },
*/
  };

  const reducers = {};

  return { state, effects, reducers };
};

export default getDvamodel;
