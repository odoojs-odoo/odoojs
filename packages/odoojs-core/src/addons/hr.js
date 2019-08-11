// TO debug 2019-8-10

const models = {
  'hr.job': {
    extend: BaseClass => {
      class cls extends BaseClass {
        set_recruit() {
          const data = this._rpc_call('set_recruit', [this.id]);
          return data;
        }

        set_open() {
          const data = this._rpc_call('set_open', [this.id]);
          return data;
        }
      }

      return cls;
    },
  },
};

export default {
  name: 'hr',
  depends: [
    //'mail',
    // resource
  ],
  models,
};
