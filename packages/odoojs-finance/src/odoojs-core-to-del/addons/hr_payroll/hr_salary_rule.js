const hr_payroll_structure_extend = BaseClass => {
  class cls extends BaseClass {
    get_all_rules() {
      const data = this.call('get_all_rules', this.id);
      return data;
    }
  }

  return cls;
};
export default {
  models: {
    'hr.payroll.structure': {
      fields: [
        'name',
        'code',
        'company_id',
        'note',
        'parent_id',
        'children_ids',
        'rule_ids',
      ],
      extend: hr_payroll_structure_extend,
    },

    'hr.contribution.register': {
      fields: ['company_id', 'partner_id', 'name', 'register_line_ids', 'note'],
    },

    'hr.salary.rule.category': {
      fields: [
        'name',
        'code',
        'parent_id',
        'children_ids',
        'note',
        'company_id',
      ],
    },

    'hr.salary.rule': {
      fields: [
        'name',
        'code',
        'sequence',
        'quantity',
        'category_id',
        'active',
        'appears_on_payslip',
        'parent_rule_id',
        'company_id',
        'condition_select',
        'condition_range',
        'condition_python',
        'condition_range_min',
        'condition_range_max',
        'amount_fix',
        'amount_percentage',
        'amount_python_compute',
        'amount_percentage_base',
        'child_ids',
        'register_id',
        'input_ids',
        'note',
      ],
    },

    'hr.salary.rule.input': {
      fields: ['name', 'code', 'input_id'],
    },
  },
};
