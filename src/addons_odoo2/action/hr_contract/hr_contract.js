export default {
  hr_contract_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract',
    type: 'search',
    arch: {
      name: { string: 'Contract' },
      date_start: {},
      date_end: {},
      employee_id: {},
      job_id: {},
      department_id: { operator: 'child_of' },
      resource_calendar_id: {},
      _filter_running: {
        _attr: {
          name: 'running',
          string: 'Running',
          domain: [['state', '=', 'open']]
        }
      },
      _filter_not_running: {
        _attr: {
          name: 'not_running',
          string: 'Not Running',
          domain: [['state', '!=', 'open']]
        }
      },
      _separator: {},
      _filter_current_employee: {
        _attr: {
          name: 'current_employee',
          string: 'Employed',
          domain: [['employee_id.active', '=', true]]
        }
      },
      _separator_806: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _separator_545: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which have a next action date before today',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_by_state: {
          _attr: {
            name: 'group_by_state',
            string: 'Status',
            domain: [],
            context: { group_by: 'state' }
          }
        },
        _filter_group_by_employee: {
          _attr: {
            name: 'group_by_employee',
            string: 'Employee',
            domain: [],
            context: { group_by: 'employee_id' }
          }
        },
        _filter_group_by_date_start: {
          _attr: {
            name: 'group_by_date_start',
            string: 'Start Date',
            domain: [],
            context: { group_by: 'date_start' }
          }
        },
        _filter_group_by_job: {
          _attr: {
            name: 'group_by_job',
            string: 'Job Position',
            domain: [],
            context: { group_by: 'job_id' }
          }
        },
        _filter_group_by_resource_calendar_id: {
          _attr: {
            name: 'group_by_resource_calendar_id',
            string: 'Working Schedule',
            domain: [],
            context: { group_by: 'resource_calendar_id' }
          }
        },
        _filter_group_by_structure_type_id: {
          _attr: {
            name: 'group_by_structure_type_id',
            string: 'Salary Structure Type',
            domain: [],
            context: { group_by: 'structure_type_id' }
          }
        }
      }
    }
  },

  hr_contract_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract',
    type: 'form',
    arch: {
      header: {
        state: {
          widget: 'statusbar',
          groups: '!hr_contract.group_hr_contract_manager'
        },
        _field_state_573: {
          state: {
            widget: 'statusbar',
            groups: 'hr_contract.group_hr_contract_manager',
            clickable: '1'
          }
        }
      },
      sheet: {
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
        _div_title: {
          _attr: {
            name: 'title',
            class: 'oe_title pe-0 w-100 mw-100'
          },
          _h1: {
            _attr: { class: 'd-flex flex-row justify-content-between' },
            name: {
              class: 'text-truncate',
              placeholder: 'Contract Reference'
            },
            kanban_state: {
              widget: 'state_selection',
              groups: '!hr_contract.group_hr_contract_manager',
              class: 'd-flex align-items-center',
              readonly: '1'
            },
            _field_kanban_state_509: {
              kanban_state: {
                widget: 'state_selection',
                groups: 'hr_contract.group_hr_contract_manager',
                class: 'd-flex align-items-center',
                readonly: '0'
              }
            }
          },
          _h2: {
            company_id: {
              groups: 'base.group_multi_company',
              invisible: '1'
            }
          }
        },
        _group_top_info: {
          _attr: { name: 'top_info' },
          _group_top_info_left: {
            _attr: { name: 'top_info_left' },
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            employee_id: {},
            date_start: { string: 'Contract Start Date' },
            date_end: { string: 'Contract End Date' },
            company_country_id: { invisible: '1' },
            country_code: { invisible: '1' },
            structure_type_id: {
              groups: '!hr_contract.group_hr_contract_manager',
              domain: { todo_ctx: "['|', ('country_id', '=', False), ('country_id', '=', company_country_id)]" },
              no_open: true,
              no_create: true
            },
            _field_structure_type_id_441: {
              structure_type_id: {
                groups: 'hr_contract.group_hr_contract_manager',
                domain: { todo_ctx: "['|', ('country_id', '=', False), ('country_id', '=', company_country_id)]" }
              }
            },
            calendar_mismatch: { invisible: '1' },
            _label_resource_calendar_id: { for: 'resource_calendar_id' },
            _div: {
              _attr: { id: 'resource_calendar_warning' },
              resource_calendar_id: {
                groups: '!hr_contract.group_hr_contract_manager',
                required: '1',
                no_open: true,
                no_create: true
              },
              _field_resource_calendar_id_485: {
                resource_calendar_id: {
                  groups: 'hr_contract.group_hr_contract_manager',
                  required: '1'
                }
              },
              _span: {
                _attr: {
                  invisible: ['|', ['calendar_mismatch', '=', false], ['state', '!=', 'open']],
                  class: 'fa fa-exclamation-triangle text-danger o_calendar_warning ms-3'
                }
              }
            }
          },
          _group_top_info_right: {
            _attr: { name: 'top_info_right' },
            department_id: {
              groups: '!hr_contract.group_hr_contract_manager',
              no_open: true,
              no_create: true
            },
            _field_department_id_476: {
              department_id: { groups: 'hr_contract.group_hr_contract_manager' }
            },
            job_id: {
              groups: '!hr_contract.group_hr_contract_manager',
              no_open: true,
              no_create: true
            },
            _field_job_id_971: {
              job_id: { groups: 'hr_contract.group_hr_contract_manager' }
            },
            contract_type_id: {
              groups: '!hr_contract.group_hr_contract_manager',
              no_open: true,
              no_create: true
            },
            _field_contract_type_id_375: {
              contract_type_id: { groups: 'hr_contract.group_hr_contract_manager' }
            },
            hr_responsible_id: { required: '1' }
          }
        },
        _notebook: {
          _page_other: {
            _attr: {
              name: 'other',
              string: 'Contract Details',
              groups: 'hr_contract.group_hr_contract_manager'
            },
            _group: {
              _group_contract_details: {
                _attr: { name: 'contract_details' }
              }
            },
            _group_notes_group: {
              _attr: {
                name: 'notes_group',
                string: 'Notes'
              },
              notes: { placeholder: 'Type in notes about this contract...' }
            }
          },
          _page_information: {
            _attr: {
              name: 'information',
              string: 'Salary Information',
              class: 'o_hr_contract_salary_information'
            },
            _group_salary_info: {
              _attr: { name: 'salary_info' },
              _group_salary: {
                _attr: { name: 'salary' },
                _label_wage: { for: 'wage' },
                _div_wage: {
                  _attr: {
                    name: 'wage',
                    class: 'o_row mw-50'
                  },
                  wage: { class: 'oe_inline o_hr_narrow_field' },
                  _div: {
                    _attr: {
                      class: 'mb-3',
                      text: '/ month'
                    }
                  }
                }
              },
              _group_yearly_advantages: {
                _attr: { name: 'yearly_advantages' }
              }
            }
          }
        }
      }
    }
  },

  hr_contract_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        name: { readonly: '1' },
        employee_id: {
          widget: 'many2one_avatar_employee',
          readonly: '1'
        },
        job_id: {},
        date_start: { readonly: '1' },
        date_end: { readonly: '1' },
        resource_calendar_id: { optional: 'show' },
        structure_type_id: { optional: 'show' },
        state: { widget: 'badge' },
        wage: { invisible: '1' },
        message_needaction: { invisible: '1' },
        _field_company_id_393: {
          company_id: {
            groups: 'base.group_multi_company',
            readonly: '1',
            optional: 'show'
          }
        }
      }
    }
  },

  hr_contract_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract',
    type: 'otherview',
    arch: {}
  },

  hr_contract_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.contract',
    type: 'otherview',
    arch: {}
  },

  action_hr_contract: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Contracts',
    res_model: 'hr.contract',
    search_view_id: 'hr_contract_view_search',
    domain: "[['employee_id', '!=', False]]",
    context: { search_default_group_by_state: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
