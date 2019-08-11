// 2019-8-10 ok
const models = {
  'sale.order': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.action_invoice_create = async (id, kwargs, context) => {
        // const {grouped=false, final=false,} = kwargs
        const method = 'action_invoice_create';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_draft = async (id, kwargs, context) => {
        const method = 'action_draft';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_cancel = async (id, kwargs, context) => {
        const method = 'action_cancel';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_done = async (id, kwargs, context) => {
        const method = 'action_done';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_unlock = async (id, kwargs, context) => {
        const method = 'action_unlock';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_confirm = async (id, kwargs, context) => {
        const method = 'action_confirm';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.goto_wizard_create_invoices = async (id, kwargs, context) => {
        const wizard = cls.env('sale.advance.payment.inv');
        return await wizard.create(
          {},
          { context: { active_ids: [id], active_model: cls._name } },
          {
            success: result => {
              return { id, create_invoices_wizard_id: result._look({}) };
            },
          }
        );
      };

      cls.call_wizard_create_invoices = async (id, kwargs = {}) => {
        const { fields, wizard_id, wizard_vals } = kwargs;

        const wizard = cls.env('sale.advance.payment.inv');
        const data1 = await wizard.write(
          wizard_id,
          wizard_vals,
          {},
          { return_with_code: 1, step: 1, message: 'write wizard' }
        );

        if (data1.code) {
          return data1;
        }

        const data2 = await wizard._rpc_call_with_code(
          'create_invoices',
          [wizard_id],
          { context: { active_ids: [id] } },
          { return_with_code: 1, step: 2, message: 'call create invoices' }
        );

        if (data2.code) {
          return data2;
        }
        return cls.browse(id, { fields });
      };

      return cls;
    },
  },
};

export default {
  name: 'sale',
  depends: ['sales_team', 'payment'],
  models,
};
