const models = {
  'account.move': {
    extend: BaseClass => {
      class cls extends BaseClass {
        /*
        action_post() {
          const data = this._rpc_call('action_post');
          return data;
        }

      */
      }

      cls.post = async (id, kwargs, context) => {
        const method = 'post';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_cancel = async (id, kwargs, context) => {
        const method = 'button_cancel';
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
