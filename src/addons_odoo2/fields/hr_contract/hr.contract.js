const ModelFields = {
  active: {},
  calendar_mismatch: {},
  company_country_id: {},
  company_id: {
    groups: 'base.group_multi_company',
    readonly: '1'
  },

  contract_type_id: { groups: '===todo==' },
  contract_type_id_$_form_$$_212: { groups: '!hr_contract.group_hr_contract_manager' },
  contract_type_id_$_form_$$_315: { groups: 'hr_contract.group_hr_contract_manager' },
  country_code: {},
  date_end: {
    string: 'Contract End Date',
    readonly: '1'
  },

  date_start: {
    string: 'Contract Start Date',
    readonly: '1'
  },

  department_id: { groups: '===todo==' },
  department_id_$_form_$$_522: { groups: 'hr_contract.group_hr_contract_manager' },
  department_id_$_form_$$_819: { groups: '!hr_contract.group_hr_contract_manager' },
  employee_id: { readonly: '1' },
  hr_responsible_id: { required: '1' },
  job_id: { groups: '===todo==' },
  job_id_$_form_$$_202: { groups: 'hr_contract.group_hr_contract_manager' },
  job_id_$_form_$$_885: { groups: '!hr_contract.group_hr_contract_manager' },
  kanban_state: {
    groups: '===todo==',
    readonly: '===todo=='
  },

  kanban_state_$_form_$$_606: {
    groups: '!hr_contract.group_hr_contract_manager',
    readonly: '1'
  },

  kanban_state_$_form_$$_621: {
    groups: 'hr_contract.group_hr_contract_manager',
    readonly: '0'
  },

  message_needaction: {},
  name: {
    placeholder: 'Contract Reference',
    readonly: '1'
  },

  notes: { placeholder: 'Type in notes about this contract...' },
  resource_calendar_id: {
    groups: '===todo==',
    required: '1'
  },

  resource_calendar_id_$_form_$$_127: { groups: 'hr_contract.group_hr_contract_manager' },
  resource_calendar_id_$_form_$$_575: { groups: '!hr_contract.group_hr_contract_manager' },
  state: {},
  structure_type_id: {
    groups: '===todo==',
    domain: { todo_ctx: "['|', ('country_id', '=', False), ('country_id', '=', company_country_id)]" }
  },

  structure_type_id_$_form_$$_134: { groups: 'hr_contract.group_hr_contract_manager' },
  structure_type_id_$_form_$$_335: { groups: '!hr_contract.group_hr_contract_manager' },
  wage: {}
}

const AddonsFields = {
  'hr.contract': ModelFields
}

export default AddonsFields

