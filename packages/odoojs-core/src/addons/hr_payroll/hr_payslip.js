const hr_payslip_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.compute_sheet = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'compute_sheet',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_payslip_done = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'action_payslip_done',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.action_payslip_draft = async (id, fields = {}, kwargs = {}) => {
    // TBD 20190430:
    // 1: manualy unpost account.move of this payslip
    // 2: then manualy del account.move of this payslip
    // 3: check no account.move of this payslip
    // 4: set payslip.state= draft

    return cls.call_as_write_read(
      {
        method: 'action_payslip_draft',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

const hr_payslip_run_extend = BaseClass => {
  class cls extends BaseClass {}

  cls.draft_payslip_run = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'draft_payslip_run',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  cls.close_payslip_run = async (id, fields = {}, kwargs = {}) => {
    return cls.call_as_write_read(
      {
        method: 'close_payslip_run',
        args: [id],
        kwargs,
      },
      fields
    );
  };

  return cls;
};

export default {
  models: {
    'hr.payslip': {
      fields: [
        'struct_id',
        'name',
        'number',
        'employee_id',
        'date_from',
        'date_to',
        'state',
        'line_ids',
        'company_id',
        'worked_days_line_ids',
        'input_line_ids',
        'paid',
        'note',
        'contract_id',
        'details_by_salary_rule_category',
        'credit_note',
        'payslip_run_id',
        'payslip_count',
      ],

      extend: hr_payslip_extend,
    },

    'hr.payslip.line': {
      fields: [
        'name',
        'code',
        'sequence',
        'appears_on_payslip',
        'note',
        'slip_id',
        'salary_rule_id',
        'employee_id',
        'contract_id',
        'rate',
        'amount',
        'quantity',
        'total',
      ],
    },

    'hr.payslip.worked_days': {
      fields: [
        'name',
        'payslip_id',
        'sequence',
        'code',
        'number_of_days',
        'number_of_hours',
        'contract_id',
      ],
    },

    'hr.payslip.input': {
      fields: [
        'name',
        'payslip_id',
        'sequence',
        'code',
        'amount',
        'contract_id',
      ],
    },

    'hr.payslip.run': {
      fields: [
        'name',
        'payslip_id',
        'state',
        'date_start',
        'date_end',
        'credit_note',
      ],

      extend: hr_payslip_run_extend,
    },
  },
};
