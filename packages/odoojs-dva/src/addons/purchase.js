const purchaseOrder = Model => {
  const state = {};
  const effects = {
    *button_confirm({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.button_confirm(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *action_view_invoice({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_view_invoice(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'purchase.order': purchaseOrder,
};
