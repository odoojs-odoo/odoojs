export default {
  view_hr_job_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.job',
    type: 'form',
    arch: {
      sheet: {
        active: { invisible: '1' },
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. Sales Manager' }
          }
        },
        _notebook: {
          _page_recruitment_page: {
            _attr: { name: 'recruitment_page', string: 'Recruitment' },
            _group: {
              _group_recruitment: {
                _attr: { name: 'recruitment' },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                department_id: {},
                contract_type_id: {}
              },
              _group_recruitment2: {
                _attr: { name: 'recruitment2' },
                _label_no_of_recruitment: { for: 'no_of_recruitment' },
                _div_recruitment_target: {
                  _attr: { name: 'recruitment_target', class: 'o_row' },
                  no_of_recruitment: { class: 'col-3 ps-0' },
                  _span: {
                    _attr: { class: 'ps-1', text: 'new Employees' }
                  }
                }
              }
            }
          },
          _page_job_description_page: {
            _attr: { name: 'job_description_page', string: 'Job Summary' },
            description: { options: "{'collaborative': true}" }
          }
        }
      }
    }
  },

  view_hr_job_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.job',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        department_id: {},
        no_of_recruitment: {},
        no_of_employee: { optional: 'hide' },
        expected_employees: { optional: 'hide' },
        no_of_hired_employee: { optional: 'hide' },
        message_needaction: { invisible: '1' },
        company_id: { groups: 'base.group_multi_company', optional: 'hide' }
      }
    }
  },

  view_job_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.job',
    type: 'search',
    arch: {
      fields: {
        name: { string: 'Job Position' },
        department_id: { operator: 'child_of' }
      },

      filters: {
        group_message_needaction: {
          message_needaction: {
            name: 'message_needaction',
            string: 'Unread Messages',
            domain: [['message_needaction', '=', true]]
          }
        },
        group_archived: {
          archived: {
            name: 'archived',
            string: 'Archived',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_hr_job: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Job Positions',
    res_model: 'hr.job',
    search_view_id: 'view_job_filter',
    context: {
      search_default_Current: 1
    },
    views: {
      tree: 'view_hr_job_tree',
      form: 'view_hr_job_form'
    }
  }
}
