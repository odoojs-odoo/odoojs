const getDvamodel = (Model, fields_default = {}) => {
  const state = {};
  const effects = {
    *carryover_profit({ payload }, { call, put }) {
      const { date, line_ids, fields = fields_default } = payload;
      const data = yield Model.carryover_profit(date, line_ids, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *carryover_vat({ payload }, { call, put }) {
      const { line_ids, kwargs = {}, fields = fields_default } = payload;
      const data = yield Model.carryover_vat(line_ids, fields, kwargs);
      yield put({ type: 'save_one', payload: { data, fields } });
      return data;
    },

    *carryover_additional_tax({ payload }, { call, put }) {
      const {
        line_ids,
        tax_ids,
        kwargs = {},
        fields = fields_default,
      } = payload;
      const data = yield Model.carryover_additional_tax(
        line_ids,
        tax_ids,
        fields,
        kwargs
      );
      yield put({ type: 'save_one', payload: { data, fields } });
      return data;
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default getDvamodel;
