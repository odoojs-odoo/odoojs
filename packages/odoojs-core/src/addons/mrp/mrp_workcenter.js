const models = {
  'mrp.workcenter.productivity': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.button_block = async (id, kwargs, context) => {
        const method = 'button_block';
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
