const hr_job_extend = BaseClass => {
  class cls extends BaseClass {
    set_recruit() {
      const data = this.call('set_recruit', [this.id]);
      return data;
    }

    set_open() {
      const data = this.call('set_open', [this.id]);
      return data;
    }
  }

  return cls;
};

export default {
  name: 'hr',
  depends: [
    'mail',
    // resource
  ],
  models: {
    'hr.employee.category': {
      fields: ['name', 'color', 'employee_ids'],
    },

    'hr.job': {
      fields: [
        'name',
        //'expected_employees',
        //'no_of_employee',
        //'no_of_recruitment',
        //'no_of_hired_employee',
        'employee_ids',
        'description',
        'requirements',
        'department_id',
        'company_id',
        'state',
      ],
      extend: hr_job_extend,
    },

    'hr.employee': {
      fields: [
        //'resource_id',
        'company_id',
        //'resource_calendar_id',
        //'tz',
        'name',
        'user_id',
        'active',
        'address_home_id',
        'is_address_home_a_company',
        'country_id',
        'gender',
        'marital',
        'spouse_complete_name',
        'spouse_birthdate',
        'children',
        'place_of_birth',
        'country_of_birth',
        'birthday',
        'ssnid',
        'sinid',
        'identification_id',
        'passport_id',
        'bank_account_id',
        'permit_no',
        'visa_no',
        'visa_expire',
        'additional_note',
        'certificate',
        'study_field',
        'study_school',
        'emergency_contact',
        'emergency_phone',
        'km_home_work',
        //'google_drive_link',
        'job_title',
        //'image',
        //'image_medium',
        //'image_small',
        'address_id',
        'work_phone',
        'mobile_phone',
        'work_email',
        'work_location',
        'job_id',
        'department_id',
        'parent_id',
        'child_ids',
        'coach_id',
        'category_ids',
        'notes',
        'color',
      ],
    },

    'hr.department': {
      fields: [
        'name',
        'complete_name',
        'active',
        'company_id',
        'parent_id',
        'child_ids',
        'manager_id',
        'member_ids',
        'jobs_ids',
        'note',
        'color',
      ],
    },
  },
};
