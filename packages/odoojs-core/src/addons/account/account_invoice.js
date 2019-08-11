// TBD 2019-8-9

const models = {
  'account.invoice': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.compute_taxes = async (id, kwargs, context) => {
        const method = 'compute_taxes';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_invoice_open = async (id, kwargs, context) => {
        const method = 'action_invoice_open';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      // TBD 2019-8-9
      cls.goto_wizard_register_payments = async (
        id,
        { wizard_fields = {} },
        kwargs = {}
      ) => {
        // journal_id 随便取一个
        // payment_method_id 随便取一个
        // call go_wizard:
        //   1. fields_get,
        //   2. default_get,
        //   3. create wizard
        //   4. call wizard onchage

        const data1 = await cls
          .env('account.payment.method')
          ._rpc_call_with_code(
            'search',
            [[]],
            { limit: 1 },
            { step: 1, message: 'find method' }
          );
        if (data1.code) {
          return data1;
        }

        const pm_id = data1.result[0];
        //console.log( pm_id )

        const data2 = await cls
          .env('account.journal')
          ._rpc_call_with_code(
            'search',
            [[]],
            { limit: 1 },
            { step: 2, message: 'find journal' }
          );
        if (data2.code) {
          return data2;
        }
        const jnl_id = data2.result[0];
        //console.log( jnl_id )

        const wizard = cls.env('account.register.payments');

        const data3 = await wizard.default_get(
          [],
          { context: { active_ids: [id], active_model: cls._name } },
          { return_with_code: 1, step: 3, message: 'find default' }
        );

        if (data3.code) {
          return data3;
        }

        const wizard_vals = {
          payment_method_id: pm_id,
          journal_id: jnl_id,
          ...data3.result,
        };

        const data4 = await wizard._rpc_call(
          'create',
          [wizard_vals],
          { context: { active_ids: [id], active_model: cls._name } },
          { return_with_code: 1, step: 4, message: 'create wizard' }
        );

        if (data4.code) {
          return data4;
        }

        const wizard_id = data4.result;

        const data5 = await wizard._rpc_call(
          '_onchange_amount',
          [wizard_id],
          null,
          { return_with_code: 1, step: 5, message: 'on change amount' }
        );

        if (data5.code) {
          return data5;
        }

        const data6 = await wizard._rpc_call(
          '_onchange_journal',
          [wizard_id],
          null,
          { return_with_code: 1, step: 6, message: 'on change journal' }
        );

        if (data6.code) {
          return data6;
        }

        const domain = { ...data5.result.domain, ...data6.result.domain };

        const data7 = await wizard.browse(
          wizard_id,
          { fields: wizard_fields },
          { return_with_code: 1, step: 7, message: 'browse wizard' }
        );

        if (data7.code) {
          return data7;
        }

        return cls._return({
          code: 0,
          result: {
            id,
            register_payment_wizard_id: data7.result._look(wizard_fields),
            domain,
          },
        });
      };

      cls.call_wizard_register_payments = async (id, kwargs = {}) => {
        const { fields, wizard_id, wizard_vals } = kwargs;

        const wizard = cls.env('account.register.payments');
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
          'create_payments',
          [wizard_id],
          { context: { active_ids: [id] } },
          { return_with_code: 1, step: 2, message: 'call create payments' }
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
  models,
};
