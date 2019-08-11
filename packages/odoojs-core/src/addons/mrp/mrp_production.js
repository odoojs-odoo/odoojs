const models = {
  'mrp.production': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.action_assign = async (id, kwargs, context) => {
        const method = 'action_assign';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_plan = async (id, kwargs, context) => {
        const method = 'button_plan';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_cancel = async (id, kwargs, context) => {
        const method = 'action_cancel';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.post_inventory = async (id, kwargs, context) => {
        const method = 'post_inventory';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_mark_done = async (id, kwargs, context) => {
        const method = 'button_mark_done';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_unreserve = async (id, kwargs, context) => {
        const method = 'button_unreserve';
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
