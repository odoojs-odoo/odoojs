const stockPicking = Model => {
  const state = {};
  const effects = {
    *action_confirm({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_confirm(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'stock.picking': stockPicking,
};
