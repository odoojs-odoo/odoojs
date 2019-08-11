const models = {
  'mrp.workorder': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.record_production = async (id, kwargs, context) => {
        const method = 'record_production';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_start = async (id, kwargs, context) => {
        const method = 'button_start';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_finish = async (id, kwargs, context) => {
        const method = 'button_finish';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      return cls;
    },
  },
};

export default {
  models,
};
