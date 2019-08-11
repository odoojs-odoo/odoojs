// 2019-8-10 ok
const models = {
  'purchase.order': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.button_confirm = async (id, kwargs, context) => {
        const method = 'button_confirm';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_view_invoice = async (id, kwargs, context) => {
        const data = await cls._rpc_call_with_code(
          'action_view_invoice',
          [id],
          kwargs,
          { ...context, step: 1, message: 'call action' }
        );
        if (data.code) {
          return data;
        }

        const {
          result: { context: context_ret },
        } = data;

        //        console.log(context)
        const invice_model = cls.env('account.invoice');
        const data2 = await invice_model._rpc_call_with_code(
          'create',
          [{}],
          { context: context_ret },
          { ...context, step: 2, message: 'call create invoice' }
        );

        if (data2.code) {
          return data2;
        }

        const { result: inv_id } = data2;
        const ret3 = await invice_model._rpc_call_with_code(
          'purchase_order_change',
          [inv_id],
          null,
          { ...context, step: 3, message: 'call onchange purchase_order' }
        );
        if (ret3.code) {
          return ret3;
        }

        const ret4 = await invice_model._rpc_call_with_code(
          '_onchange_partner_id',
          [inv_id],
          null,
          { ...context, step: 4, message: 'call onchange partner_id' }
        );

        if (ret4.code) {
          return ret4;
        }

        return await cls.browse(id, kwargs, {
          ...context,
          step: 5,
          message: 'call read2',
        });
      };

      cls.button_approve = async (id, kwargs, context) => {
        // const { force } = kwargs;
        const method = 'button_approve';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_draft = async (id, kwargs, context) => {
        const method = 'button_draft';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_cancel = async (id, kwargs, context) => {
        const method = 'button_cancel';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_unlock = async (id, kwargs, context) => {
        const method = 'button_unlock';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.button_done = async (id, kwargs, context) => {
        const method = 'button_done';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_set_date_planned = async (id, kwargs, context) => {
        const method = 'action_set_date_planned';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      return cls;
    },
  },
};

export default {
  name: 'purchase',
  depends: ['account'],
  models,
};
