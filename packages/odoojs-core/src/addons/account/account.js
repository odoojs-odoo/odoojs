// TBD debug 2019-8-10

const models = {
  'account.account': {
    extend: BaseClass => {
      class cls extends BaseClass {
        mark_as_reconciled() {
          const data = this._rpc_call('mark_as_reconciled');
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
