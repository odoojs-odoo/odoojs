const getDvamodel = Model => {
  const state = {};

  const effects = {
    *post({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.post(id, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *button_cancel({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.button_cancel(id, {}, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};

  return { state, effects, reducers };
};

export default getDvamodel;
