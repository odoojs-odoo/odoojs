const hrPayslip = (Model, fields_default = {}) => {
  const state = {};
  const effects = {
    *compute_sheet({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.compute_sheet(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *action_payslip_done({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.action_payslip_done(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *action_payslip_draft({ payload }, { call, put }) {
      const { id, fields = fields_default } = payload;
      const data = yield Model.action_payslip_draft(id, fields);
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'hr.payslip': hrPayslip,
};
