const hr_payslip_extend = BaseClass => {
  class cls extends BaseClass {
    action_payslip_draft() {
      const data = this.call('action_payslip_draft', this.id);
      return data;
    }
  }

  cls.compute_sheet = async (id, fields) => {
    const data = await cls.call('compute_sheet', [id]);
    if (data) {
      return await cls.browse(id, fields);
    }
    return data;
  };

  cls.action_payslip_done = async (id, fields) => {
    const data = await cls.call('action_payslip_done', [id]);
    if (data) {
      return await cls.browse(id, fields);
    }
    return data;
  };

  cls.action_payslip_draft = async (id, fields) => {
    // TBD 20190430:
    // 1: manualy unpost account.move of this payslip
    // 2: then manualy del account.move of this payslip
    // 3: check no account.move of this payslip
    // 4: set payslip.state= draft

    const data = await cls.call('action_payslip_draft', [id]);
    if (data) {
      return await cls.browse(id, fields);
    }
    return data;
  };

  return cls;
};

const hr_payslip_run_extend = BaseClass => {
  class cls extends BaseClass {
    draft_payslip_run() {
      const data = this.call('draft_payslip_run', this.id);
      return data;
    }

    close_payslip_run() {
      const data = this.call('close_payslip_run', this.id);
      return data;
    }
  }

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
