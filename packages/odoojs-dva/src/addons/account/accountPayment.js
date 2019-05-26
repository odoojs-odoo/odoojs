const getDvamodel = (Model, fields_default = {}) => {
  const state = {};

  const effects = {
    *post({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.post(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};

  return { state, effects, reducers };
};

export default getDvamodel;
