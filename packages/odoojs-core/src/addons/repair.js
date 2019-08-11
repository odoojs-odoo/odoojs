// TO debug 2019-8-10

const models = {
  'repair.order': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.action_repair_cancel_draft = async (id, kwargs, context) => {
        const method = 'action_repair_cancel_draft';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_repair_confirm = async (id, kwargs, context) => {
        const method = 'action_repair_confirm';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_repair_cancel = async (id, kwargs, context) => {
        const method = 'action_repair_cancel';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_invoice_create = async (id, kwargs, context) => {
        // const {group=false} = kwargs
        const method = 'action_invoice_create';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_repair_start = async (id, kwargs, context) => {
        const method = 'action_repair_start';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_repair_end = async (id, kwargs, context) => {
        const method = 'action_repair_end';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_repair_done = async (id, kwargs, context) => {
        const method = 'action_repair_done';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      return cls;
    },
  },
};

export default {
  name: 'repair',
  depends: ['stock', 'sale_management', 'account'],
  models,
};
