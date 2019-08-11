// TO debug 2019-8-10

const models = {
  'product.product': {
    extend: BaseClass => {
      class cls extends BaseClass {
        get_history_price(company_id, date = null) {
          const data = this._rpc_call('get_history_price', [company_id, date]);
          return data;
        }
      }

      return cls;
    },
  },
};

export default {
  name: 'product',
  depends: ['mail', 'uom'],
  models,
};
