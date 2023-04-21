export default {
  hr_employee_action_from_user: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees',
    res_model: 'hr.employee',
    search_view_id: 'tooooooodoooooo',
    domain: "[['user_id', '=', active_id]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_employee_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'search',
    arch: {
      name: {
        string: 'Employee',
        filter_domain: { todo_ctx: "['|', ('work_email', 'ilike', self), ('name', 'ilike', self)]" }
      },
      category_ids: { groups: 'hr.group_hr_user' },
      job_id: {},
      parent_id: { string: 'Manager' },
      _separator: {},
      _filter_message_needaction: {
        _attr: {
          name: 'message_needaction',
          string: 'Unread Messages',
          domain: [['message_needaction', '=', true]]
        }
      },
      _separator_665: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _separator_645: {},
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
      _separator_991: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
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
        _filter_group_job: {
          _attr: {
            name: 'group_job',
            string: 'Job',
            domain: [],
            context: { group_by: 'job_id' }
          }
        },
        _filter_group_category_ids: {
          _attr: {
            name: 'group_category_ids',
            string: 'Tags',
            domain: [],
            context: { group_by: 'category_ids' }
          }
        }
      },
      _searchpanel: {
        company_id: { groups: 'base.group_multi_company' },
        department_id: {}
      }
    }
  },

  view_employee_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'form',
    arch: {
      header: {
        _button_plan_wizard_action: {
          _attr: {
            name: 'plan_wizard_action',
            type: 'action',
            string: 'Launch Plan',
            groups: 'hr.group_hr_user'
          }
        }
      },
      sheet: {
        active: { invisible: '1' },
        user_id: { invisible: '1' },
        user_partner_id: { invisible: '1' },
        hr_presence_state: { invisible: '1' },
        hr_icon_display: { invisible: '1' },
        image_128: { invisible: '1' },
        company_id: { invisible: '1' },
        last_activity_time: { invisible: '1' },
        last_activity: { invisible: '1' },
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
        avatar_128: { invisible: '1' },
        _div: {
          _attr: { class: 'o_employee_avatar' },
          image_1920: {
            widget: 'image',
            class: 'oe_avatar m-0',
            options: '{"zoom": true, "preview_image":"avatar_128"}'
          },
          _div: {
            _attr: { class: 'd-flex align-items-end fs-6 o_employee_availability' },
            _small: {
              _attr: {
                title: 'Present',
                invisible: [['hr_icon_display', '!=', 'presence_present']],
                class: 'fa fa-fw fa-circle text-success o_button_icon hr_presence align-middle'
              }
            },
            _small_presence_absent: {
              _attr: {
                name: 'presence_absent',
                title: 'Absent',
                invisible: [['hr_icon_display', '!=', 'presence_absent']],
                class: 'fa fa-fw fa-circle-o text-muted o_button_icon hr_presence align-middle'
              }
            },
            _small_presence_absent_active: {
              _attr: {
                name: 'presence_absent_active',
                title: 'Present but not active',
                invisible: [['hr_icon_display', '!=', 'presence_absent_active']],
                class: 'fa fa-fw fa-circle-o text-success o_button_icon hr_presence align-middle'
              }
            },
            _small_presence_to_define: {
              _attr: {
                name: 'presence_to_define',
                title: 'To define',
                invisible: [['hr_icon_display', '!=', 'presence_to_define']],
                class: 'fa fa-fw fa-circle text-warning o_button_icon hr_presence align-middle'
              }
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
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
              placeholder: "Employee's Name"
            }
          },
          _h2: {
            job_title: { placeholder: 'Job Position' }
          },
          category_ids: {
            widget: 'many2many_tags',
            groups: 'hr.group_hr_user',
            placeholder: 'Tags',
            color_field: 'color',
            no_create_edit: true
          }
        },
        _group: {
          _group: {
            mobile_phone: { widget: 'phone' },
            work_phone: { widget: 'phone' },
            work_email: { widget: 'email' },
            company_id: { groups: 'base.group_multi_company' },
            company_country_id: { invisible: '1' },
            company_country_code: { invisible: '1' }
          },
          _group_824: {
            department_id: {},
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
                _group: {
                  _attr: { string: 'Location' },
                  address_id: {
                    context: { show_address: 1 },
                    always_reload: true,
                    highlight_first_line: true
                  },
                  work_location_id: {
                    context: { todo_ctx: "{'default_address_id': address_id}" }
                  }
                },
                _group_managers: {
                  _attr: {
                    name: 'managers',
                    string: 'Approvers',
                    class: 'hide-group-if-empty'
                  }
                },
                _group_departure: {
                  _attr: {
                    name: 'departure',
                    string: 'Departure',
                    invisible: [['active', '=', true]]
                  },
                  departure_reason_id: {
                    no_edit: true,
                    no_create: true,
                    no_open: true
                  },
                  departure_description: {},
                  departure_date: {}
                },
                _group_667: {
                  _attr: { string: 'Schedule' },
                  resource_calendar_id: { required: '1' },
                  id: { invisible: '1' },
                  tz: { required: [['id', '!=', false]] }
                }
              }
            }
          },
          _page_personal_information: {
            _attr: {
              name: 'personal_information',
              string: 'Private Information',
              groups: 'hr.group_hr_user'
            },
            _group: {
              _group: {
                _attr: { string: 'Private Contact' },
                address_home_id: {
                  context: {
                    show_address: 1,
                    default_type: 'private',
                    form_view_ref: 'base.res_partner_view_form_private'
                  },
                  always_reload: true,
                  highlight_first_line: true
                },
                private_email: { string: 'Email' },
                phone: {
                  string: 'Phone',
                  class: 'o_force_ltr',
                  readonly: 'True'
                },
                bank_account_id: {
                  context: { todo_ctx: "{'default_partner_id': address_home_id}" }
                },
                lang: { string: 'Language' },
                _label_km_home_work: { for: 'km_home_work' },
                _div_div_km_home_work: {
                  _attr: {
                    name: 'div_km_home_work',
                    class: 'o_row'
                  },
                  km_home_work: { class: 'o_hr_narrow_field' },
                  _span: 'Km'
                }
              },
              _group_600: {
                _attr: { string: 'Family Status' },
                marital: {},
                spouse_complete_name: { invisible: [['marital', 'not in', ['married', 'cohabitant']]] },
                spouse_birthdate: { invisible: [['marital', 'not in', ['married', 'cohabitant']]] },
                children: {},
                _separator_emergency: {
                  _attr: {
                    name: 'emergency',
                    string: 'Emergency'
                  }
                },
                emergency_contact: {},
                emergency_phone: { class: 'o_force_ltr' }
              },
              _group_459: {
                _attr: { string: 'Education' },
                certificate: {},
                study_field: {},
                study_school: {},
                _separator_has_work_permit: {
                  _attr: {
                    name: 'has_work_permit',
                    string: 'Work Permit'
                  }
                },
                visa_no: {},
                permit_no: {},
                visa_expire: {},
                work_permit_expiration_date: {},
                has_work_permit: { widget: 'work_permit_upload' }
              },
              _group_189: {
                _attr: { string: 'Citizenship' },
                country_id: {
                  no_open: true,
                  no_create: true
                },
                identification_id: {},
                passport_id: {},
                gender: {},
                birthday: {},
                place_of_birth: {},
                country_of_birth: {}
              }
            }
          },
          _page_hr_settings: {
            _attr: {
              name: 'hr_settings',
              string: 'HR Settings',
              groups: 'hr.group_hr_user'
            },
            _group: {
              _group_active_group: {
                _attr: {
                  name: 'active_group',
                  string: 'Status'
                },
                employee_type: {},
                user_id: {
                  string: 'Related User',
                  domain: [['share', '=', false]],
                  context: {
                    allow_create_employee: false,
                    default_create_employee: false
                  }
                }
              },
              _group_identification_group: {
                _attr: {
                  name: 'identification_group',
                  string: 'Attendance/Point of Sale'
                },
                pin: { string: 'PIN Code' },
                _label_barcode: { for: 'barcode' },
                _div: {
                  _attr: { class: 'o_row' },
                  barcode: {},
                  _button_generate_random_barcode: {
                    _attr: {
                      name: 'generate_random_barcode',
                      type: 'object',
                      string: 'Generate',
                      invisible: [['barcode', '!=', false]],
                      class: 'btn btn-link'
                    }
                  },
                  _button_hr_employee_print_badge: {
                    _attr: {
                      name: 'hr_employee_print_badge',
                      type: 'action',
                      string: 'Print Badge',
                      invisible: [['barcode', '=', false]],
                      class: 'btn btn-link'
                    }
                  }
                }
              },
              _group_payroll_group: {
                _attr: {
                  name: 'payroll_group',
                  string: 'Payroll'
                },
                job_id: {}
              },
              _group_application_group: {
                _attr: { name: 'application_group' }
              }
            }
          }
        }
      }
    }
  },

  view_employee_form_smartbutton: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'view_employee_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          related_contacts_count: { invisible: '1' },
          _button_action_related_contacts: {
            _attr: {
              name: 'action_related_contacts',
              type: 'object',
              icon: 'fa-address-card-o',
              invisible: [['related_contacts_count', '=', 0]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: { class: 'o_stat_value' },
                related_contacts_count: {}
              },
              _span_531: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Contacts'
                }
              }
            }
          }
        }
      }
    }
  },

  view_employee_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_plan_wizard_action: {
            _attr: {
              name: 'plan_wizard_action',
              type: 'action',
              string: 'Launch Plan',
              context: { action_plan: true }
            }
          }
        },
        name: { readonly: '1' },
        work_phone: {
          class: 'o_force_ltr',
          readonly: '1'
        },
        work_email: {},
        activity_ids: { widget: 'list_activity' },
        activity_user_id: {
          string: 'Activity by',
          widget: 'many2one_avatar_user',
          optional: 'hide'
        },
        activity_date_deadline: {
          widget: 'remaining_days',
          allow_order: '1'
        },
        company_id: {
          groups: 'base.group_multi_company',
          readonly: '1'
        },
        department_id: {},
        job_id: {},
        parent_id: {},
        address_id: { invisible: '1' },
        _field_company_id_992: {
          company_id: { invisible: '1' }
        },
        work_location_id: { optional: 'hide' },
        coach_id: { invisible: '1' },
        active: { invisible: '1' },
        category_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color'
        },
        country_id: { optional: 'hide' }
      }
    }
  },

  hr_kanban_view_employees: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'otherview',
    arch: {}
  },

  hr_employee_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'otherview',
    arch: {}
  },

  open_view_employee_list_my: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees',
    res_model: 'hr.employee',
    search_view_id: 'view_employee_filter',
    domain: '[]',
    context: { chat_icon: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  open_view_employee_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees Structure',
    res_model: 'hr.employee',
    search_view_id: 'view_employee_filter',
    domain: "[['parent_id','=',False]]",
    views: {
      tree: 'view_employee_tree',
      form: '=======todo=========='
    }
  },

  open_view_employee_list: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees',
    res_model: 'hr.employee',
    search_view_id: 'view_employee_filter',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  view_partner_tree2: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        work_phone: { class: 'o_force_ltr' },
        work_email: {},
        company_id: { groups: 'base.group_multi_company' },
        department_id: {},
        job_id: {},
        coach_id: { invisible: '1' },
        parent_id: { invisible: '1' }
      }
    }
  },

  action_hr_employee_create_user: {
    _odoo_model: 'ir.actions.server',
    model_id: 'model_hr_employee',
    model: 'hr_employee'
  },

  act_employee_from_department: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Employees',
    res_model: 'hr.employee',
    search_view_id: 'view_employee_filter',
    context: { todo_ctx: '{\n                "default_department_id": active_id,\n                "search_default_group_department": 1,\n                "search_default_department_id": active_id,\n                "expand": 1}\n            ' },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
