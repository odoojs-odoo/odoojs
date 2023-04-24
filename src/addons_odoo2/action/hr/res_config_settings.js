export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('settings')]",
            position: 'inside'
          },
          _div: {
            _attr: {
              string: 'Employees',
              groups: 'hr.group_hr_manager',
              class: 'app_settings_block'
            },
            _h2: 'Employees',
            _div_employees_setting_container: {
              _attr: {
                name: 'employees_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'presence_control_setting',
                  title: 'Presence of employees',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Presence Control'
                    }
                  },
                  _div_hr_presence_options: {
                    _attr: {
                      name: 'hr_presence_options',
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'd-flex' },
                      module_hr_attendance: { class: 'ml16' },
                      _label_module_hr_attendance: {
                        for: 'module_hr_attendance',
                        class: 'o_light_label'
                      }
                    },
                    _div_207: {
                      _attr: { class: 'd-flex' },
                      hr_presence_control_login: { class: 'ml16' },
                      _label_hr_presence_control_login: {
                        for: 'hr_presence_control_login',
                        class: 'o_light_label'
                      }
                    }
                  }
                }
              },
              _div_941: {
                _attr: {
                  id: 'presence_reporting_setting',
                  title: 'Advanced presence of employees',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_hr_presence: {}
                },
                _div_379: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_hr_presence: { for: 'module_hr_presence' },
                  _div_hr_presence_options_advanced: {
                    _attr: {
                      name: 'hr_presence_options_advanced',
                      class: 'text-muted',
                      text: 'Presence reporting screen, email and IP address control.'
                    }
                  },
                  _div: {
                    _attr: {
                      invisible: [['module_hr_presence', '=', false]],
                      class: 'd-flex mt-1'
                    },
                    hr_presence_control_email: { class: 'ml16' },
                    _label_hr_presence_control_email: {
                      for: 'hr_presence_control_email',
                      class: 'o_light_label'
                    }
                  },
                  _div_726: {
                    _attr: {
                      invisible: ['|', ['module_hr_presence', '=', false], ['hr_presence_control_email', '=', false]],
                      class: 'd-flex ml32'
                    },
                    _span: {
                      _attr: {
                        class: 'flex-shrink-0 ml8 me-2',
                        text: 'Minimum number of emails to send'
                      }
                    },
                    hr_presence_control_email_amount: { class: 'ms-2 oe_inline' }
                  },
                  _div_784: {
                    _attr: {
                      invisible: [['module_hr_presence', '=', false]],
                      class: 'd-flex'
                    },
                    hr_presence_control_ip: { class: 'ml16' },
                    _label_hr_presence_control_ip: {
                      for: 'hr_presence_control_ip',
                      class: 'o_light_label'
                    }
                  },
                  _div_851: {
                    _attr: {
                      invisible: ['|', ['module_hr_presence', '=', false], ['hr_presence_control_ip', '=', false]],
                      class: 'd-flex ml32'
                    },
                    _span: {
                      _attr: {
                        class: 'flex-shrink-0 ml8 me-2',
                        text: 'IP Addresses (comma-separated)'
                      }
                    },
                    hr_presence_control_ip_list: { class: 'ms-2 oe_inline' }
                  }
                }
              },
              _div_451: {
                _attr: {
                  id: 'enrich_employee_setting',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_hr_skills: {}
                },
                _div_222: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_hr_skills: { for: 'module_hr_skills' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Enrich employee profiles with skills and resumes'
                    }
                  }
                }
              }
            },
            _h2_763: 'Work Organization',
            _div_work_organization_setting_container: {
              _attr: {
                name: 'work_organization_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'default_company_schedule_setting',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_resource_calendar_id: { for: 'resource_calendar_id' },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: { class: 'row' },
                    _div: {
                      _attr: {
                        class: 'text-muted col-lg-8',
                        text: 'Set default company schedule to manage your employees working time'
                      }
                    }
                  },
                  _div_782: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'mt16' },
                      resource_calendar_id: {
                        domain: { todo_ctx: "[('company_id', '=', company_id)]" },
                        context: { todo_ctx: "{'default_company_id': company_id}" },
                        class: 'o_light_label',
                        required: '1'
                      }
                    }
                  }
                }
              }
            },
            _h2_987: 'Employee Update Rights',
            _div_employee_rights_setting_container: {
              _attr: {
                name: 'employee_rights_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'Allow employees to update their own data.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  hr_employee_self_edit: {}
                },
                _div_124: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_hr_employee_self_edit: { for: 'hr_employee_self_edit' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Allow employees to update their own data'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  hr_config_settings_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'hr',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
