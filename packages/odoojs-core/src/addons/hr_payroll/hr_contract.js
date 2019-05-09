export default {
  models: {
    'hr.contract': {
      fields: [
        'struct_id',
        //'schedule_pay',
        //'resource_calendar_id',
      ],
    },

    'hr.contract.advantage.template': {
      fields: ['name', 'code', 'lower_bound', 'upper_bound', 'default_value'],
    },

    'hr.employee': {
      fields: ['slip_ids', 'payslip_count'],
    },
  },
};
