// TO debug 2019-8-10

const models = {
  'hr.payroll.structure': {
    extend: BaseClass => {
      class cls extends BaseClass {
        get_all_rules() {
          const data = this._rpc_call('get_all_rules', this.id);
          return data;
        }
      }

      return cls;
    },
  },
};

export default {
  models,
};
