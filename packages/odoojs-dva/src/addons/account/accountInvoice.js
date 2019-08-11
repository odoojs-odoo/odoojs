const getDvamodel = Model => {
  const state = {};

  const effects = {
    *computeTaxes({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.compute_taxes(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *actionInvoiceOpen({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_invoice_open(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *goto_wizard_register_payments({ payload }, { call, put }) {
      const { id, wizard_fields } = payload;
      const data = yield Model.goto_wizard_register_payments(id, {
        wizard_fields,
      });

      yield put({ type: 'save_one', payload: { data, wizard: 1 } });
    },

    *call_wizard_register_payments({ payload }, { call, put }) {
      const { id, fields, wizard_id, wizard_vals } = payload;

      const data = yield Model.call_wizard_register_payments(id, {
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

export default getDvamodel;
