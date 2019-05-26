const getDvamodel = (Model, fields_default = {}) => {
  const state = {
    priceData: [],
  };

  const effects = {
    *post({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.post(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *unpost({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.unpost(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *post_open({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.post_open(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *get_price({ payload }, { call, put }) {
      const { id } = payload;
      const data = yield Model.get_price(id);
      const { code, result, error } = data;
      const error2 = code ? error : {};

      yield put({
        type: 'save',
        payload: { priceData: result, error: error2 },
      });
    },

    *set_out_amount({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.set_out_amount(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};

  return { state, effects, reducers };
};

export default getDvamodel;
