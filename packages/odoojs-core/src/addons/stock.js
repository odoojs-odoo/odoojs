// TO debug 2019-8-10

const models = {
  'product.product': {
    // TO debug
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.get_theoretical_quantity = async (
        product_id,
        location_id,
        kwargs
      ) => {
        //const { lot_id=null, package_id=null, owner_id=null, to_uom=null } = kwargs
        return cls.call(
          'get_theoretical_quantity',
          [product_id, location_id],
          kwargs
        );
      };
      return cls;
    },
  },

  'stock.picking': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.action_confirm = async (id, kwargs, context) => {
        const method = 'action_confirm';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_validate = async (id, kwargs, context = {}) => {
        const data = await cls._rpc_call_with_code(
          'button_validate',
          [id],
          kwargs,
          { ...context, step: 1, message: 'wizard' }
        );

        if (data.code) {
          return data;
        }

        if (data.result !== true) {
          return data;
        }

        return await cls.browse(id, null, {
          ...context,
          step: 2,
          message: 'picking',
        });
      };

      return cls;
    },
  },

  'stock.scrap': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.do_scrap = async (id, fields = {}, kwargs, context) => {
        const method = 'do_scrap';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      return cls;
    },
  },
};

export default {
  name: 'stock',
  depends: ['product'],
  models,
};
