export default {
  hr_employee_public_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.public',
    type: 'search',
    arch: {
      name: {
        string: 'Employees',
        filter_domain: { todo_ctx: "['|',('work_email','ilike',self),('name','ilike',self)]" }
      },
      job_title: { string: 'Job Title' },
      department_id: { string: 'Department' },
      parent_id: { string: 'Manager' },
      company_id: { string: 'Company' },
      _separator: {},
      _filter_my_team: {
        _attr: {
          name: 'my_team',
          string: 'My Team',
          domain: { todo_ctx: "[('parent_id.user_id', '=', uid)]" }
        }
      },
      _filter_my_department: {
        _attr: {
          name: 'my_department',
          string: 'My Department',
          domain: [['member_of_department', '=', true]]
        }
      },
      _separator_438: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_manager: {
          _attr: {
            name: 'group_manager',
            string: 'Manager',
            domain: [],
            context: { group_by: 'parent_id' }
          }
        },
        _filter_group_department: {
          _attr: {
            name: 'group_department',
            string: 'Department',
            domain: [],
            context: { group_by: 'department_id' }
          }
        },
        _filter_group_company: {
          _attr: {
            name: 'group_company',
            string: 'Company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        }
      },
      _searchpanel: {
        company_id: { groups: 'base.group_multi_company' },
        department_id: {}
      }
    }
  },

  hr_employee_public_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.public',
    type: 'form',
    arch: {
      sheet: {
        image_128: { invisible: '1' },
        user_id: { invisible: '1' },
        user_partner_id: { invisible: '1' },
        active: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        avatar_1920: {
          widget: 'image',
          class: 'oe_avatar',
          options: '{"zoom": true, "preview_image":"avatar_128"}'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Employee Name'
          },
          _h1: {
            _attr: { class: 'd-flex flex-row' },
            _span: {
              _attr: { class: 'me-2' },
              _widget_hr_employee_chat: {
                _attr: {
                  name: 'hr_employee_chat',
                  invisible: "not context.get['chat_icon']"
                }
              }
            },
            name: {
              required: 'True',
              placeholder: 'e.g. John Doe'
            }
          },
          _h2: {
            job_title: { placeholder: 'Job Title' }
          }
        },
        _group: {
          _group: {
            mobile_phone: {
              widget: 'phone',
              options: "{'enable_sms': false}"
            },
            work_phone: {
              widget: 'phone',
              options: "{'enable_sms': false}"
            },
            work_email: { widget: 'email' }
          },
          _group_836: {
            department_id: {
              context: { open_employees_kanban: 1 }
            },
            employee_type: {},
            company_id: { groups: 'base.group_multi_company' },
            parent_id: {},
            coach_id: {}
          }
        },
        _notebook: {
          _page_public: {
            _attr: {
              name: 'public',
              string: 'Work Information'
            },
            _div: {
              _attr: { class: 'd-lg-flex' },
              _div: {
                _attr: { class: 'flex-grow-1' },
                _group_location: {
                  _attr: {
                    name: 'location',
                    string: 'Location'
                  },
                  address_id: {
                    context: { show_address: 1 },
                    always_reload: true,
                    highlight_first_line: true
                  },
                  work_location_id: {}
                },
                _group_managers: {
                  _attr: {
                    name: 'managers',
                    string: 'Approvers',
                    invisible: '1'
                  }
                },
                _group: {
                  _attr: {
                    string: 'Schedule',
                    groups: 'base.group_no_one'
                  },
                  resource_calendar_id: {}
                }
              }
            }
          }
        }
      }
    }
  },

  hr_employee_public_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.public',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        work_phone: { class: 'o_force_ltr' },
        work_email: {},
        company_id: { groups: 'base.group_multi_company' },
        department_id: {},
        job_title: {},
        parent_id: {},
        coach_id: { invisible: '1' }
      }
    }
  },

  hr_employee_public_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee.public',
    type: 'otherview',
    arch: {}
  },

  hr_employee_public_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees',
    res_model: 'hr.employee.public',
    search_view_id: 'hr_employee_public_view_search',
    domain: '[]',
    context: { chat_icon: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
