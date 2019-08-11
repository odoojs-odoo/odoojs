const hrPayslip = Model => {
  const state = {};
  const effects = {
    *compute_sheet({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.compute_sheet(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *action_payslip_done({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_payslip_done(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    *action_payslip_draft({ payload }, { call, put }) {
      const { id, fields } = payload;
      const data = yield Model.action_payslip_draft(id, null, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {};
  return { state, effects, reducers };
};

export default {
  'hr.payslip': hrPayslip,
};
