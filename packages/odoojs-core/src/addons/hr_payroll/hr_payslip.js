//  2019-8-10, ok

const models = {
  'hr.payslip': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.compute_sheet = async (id, kwargs, context) => {
        const method = 'compute_sheet';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_payslip_done = async (id, kwargs, context) => {
        const method = 'action_payslip_done';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.action_payslip_draft = async (id, kwargs, context) => {
        // TBD 20190430:
        // 1: manualy unpost account.move of this payslip
        // 2: then manualy del account.move of this payslip
        // 3: check no account.move of this payslip
        // 4: set payslip.state= draft

        const method = 'action_payslip_draft';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      return cls;
    },
  },

  'hr.payslip.run': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.draft_payslip_run = async (id, kwargs, context) => {
        const method = 'draft_payslip_run';
        const args = [id];
        return await cls._rpc_call_as_write_read(method, args, kwargs, context);
      };

      cls.close_payslip_run = async (id, kwargs, context) => {
        const method = 'close_payslip_run';
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
