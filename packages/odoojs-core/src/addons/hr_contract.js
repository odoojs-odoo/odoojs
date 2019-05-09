export default {
  name: 'hr_contract',
  depends: ['hr'],
  models: {
    'hr.employee': {
      fields: [
        //'manager',
        //'medic_exam',
        //'vehicle',
        'contract_ids',
        'contract_id',
        'contracts_count',
      ],
    },

    'hr.contract.type': {
      fields: ['name', 'sequence'],
    },

    'hr.contract': {
      fields: [
        'name',
        'active',
        'employee_id',
        'department_id',
        'type_id',
        'job_id',
        'date_start',
        'date_end',
        'trial_date_end',
        //'resource_calendar_id',
        'wage',
        //'advantages',
        //'notes',
        'state',
        'company_id',
        //'currency_id',
        //'permit_no',
        //'visa_no',
        //'visa_expire',
        //'reported_to_secretariat',
      ],
    },
  },
};
