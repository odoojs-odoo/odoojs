const models = {
  'account.payment': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.post = async (id, kwargs, context) => {
        const method = 'post';
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
