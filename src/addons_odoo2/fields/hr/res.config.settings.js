const ModelFields = {
  hr_employee_self_edit: {},
  hr_presence_control_email: {},
  hr_presence_control_email_amount: {},
  hr_presence_control_ip: {},
  hr_presence_control_ip_list: {},
  hr_presence_control_login: {},
  module_hr_attendance: {},
  module_hr_presence: {},
  module_hr_skills: {},
  resource_calendar_id: {
    domain: { todo_ctx: "[('company_id', '=', company_id)]" },
    context: { todo_ctx: "{'default_company_id': company_id}" },
    required: '1'
  }
}

const AddonsFields = {
  'res.config.settings': ModelFields
}

export default AddonsFields

