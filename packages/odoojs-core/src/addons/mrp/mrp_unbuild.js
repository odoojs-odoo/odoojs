const models = {
  'mrp.unbuild': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.action_unbuild = async (id, kwargs, context) => {
        const method = 'action_unbuild';
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
