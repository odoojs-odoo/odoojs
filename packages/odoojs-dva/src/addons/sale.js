const saleOrder = Model => {
  const state = {};
  const effects = {
    *action_confirm({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_confirm(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *goto_wizard_create_invoices({ payload }, { call, put }) {
      const { id } = payload;
      const data = yield Model.goto_wizard_create_invoices(id);
      yield put({ type: 'save_one', payload: { data, wizard: 1 } });
    },

    *call_wizard_create_invoices({ payload }, { call, put }) {
      const { id, fields, wizard_id, wizard_vals } = payload;

      const data = yield Model.call_wizard_create_invoices(id, {
        fields,
        wizard_id,
        wizard_vals,
      });

      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'sale.order': saleOrder,
};
