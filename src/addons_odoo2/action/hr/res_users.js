export default {
  res_users_view_form_simple_modif: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form_simple_modif',
    arch: {
      sheet: {
        _footer: {
          _attr: { position: 'attributes' },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '1',
              invisible: '1'
            }
          }
        },
        _h1: {
          _attr: { position: 'replace' }
        },
        _xpath: {
          _attr: {
            expr: "//field[@name='image_1920']",
            position: 'replace'
          }
        },
        _xpath_412: {
          _attr: {
            expr: "//field[@name='company_id']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '1',
              invisible: '1'
            }
          }
        }
      }
    }
  },

  view_users_form_simple_modif_resource: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form_simple_modif',
    arch: {
      sheet: {
        tz: {
          position: 'attributes',
          __todo__required: '1'
        },
        _field_tz_957: {
          tz: {
            position: 'after',
            __todo__after: {
              is_system: { invisible: '1' }
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//button[@name='%(base.action_view_base_language_install)d']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('is_system', '=', False)]}",
              attrs: "{'invisible': [('is_system', '=', False)]}"
            }
          }
        }
      }
    }
  },

  res_users_view_form_profile: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'res_users_view_form_simple_modif',
    arch: {
      sheet: {
        _form: {
          _attr: { position: 'attributes' },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: 'false',
              create: 'false'
            }
          },
          _attribute_delete: {
            _attr: {
              name: 'delete',
              text: 'false',
              delete: 'false'
            }
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'hr_employee_profile_form',
              js_class: 'hr_employee_profile_form'
            }
          }
        },
        _notebook: {
          _attr: { position: 'replace' },
          hr_presence_state: { invisible: '1' },
          _header: {},
          _sheet: '$0'
        },
        _notebook_954: {
          _attr: { position: 'before' },
          _div_button_box: {
            _attr: {
              name: 'button_box',
              class: 'oe_button_box'
            },
            _button: {
              _attr: {
                id: 'hr_presence_button',
                invisible: [['hr_presence_state', '=', 'absent']],
                class: 'oe_stat_button'
              },
              _div: {
                _attr: {
                  title: 'Available',
                  invisible: [['hr_presence_state', '!=', 'present']],
                  class: 'fa fa-fw fa-circle text-success o_button_icon'
                }
              },
              _div_144: {
                _attr: {
                  title: 'Away',
                  invisible: [['hr_presence_state', '!=', 'to_define']],
                  class: 'fa fa-fw fa-circle text-warning o_button_icon'
                }
              },
              _div_482: {
                _attr: {
                  title: 'Not available',
                  invisible: [['hr_presence_state', '!=', 'absent']],
                  class: 'fa fa-fw fa-circle text-danger o_button_icon'
                }
              },
              _div_958: {
                _attr: {
                  invisible: [['hr_presence_state', '=', 'present']],
                  class: 'o_stat_info'
                },
                _span: {
                  _attr: {
                    class: 'o_stat_text',
                    text: 'Not Connected'
                  }
                }
              },
              _div_813: {
                _attr: {
                  invisible: [['hr_presence_state', '!=', 'present']],
                  class: 'o_stat_info'
                },
                _span: {
                  _attr: {
                    invisible: [['last_activity_time', '=', false]],
                    class: 'o_stat_value'
                  },
                  last_activity_time: {}
                },
                _span_958: {
                  _attr: {
                    invisible: [['last_activity_time', '!=', false]],
                    class: 'o_stat_value'
                  },
                  last_activity: {}
                },
                _span_196: {
                  _attr: {
                    class: 'o_stat_text',
                    text: 'Connected Since'
                  }
                }
              }
            }
          },
          avatar_128: { invisible: '1' },
          image_1920: {
            widget: 'image',
            class: 'oe_avatar',
            options: '{"zoom": true, "preview_image":"avatar_128"}'
          },
          _div_title: {
            _attr: { class: 'oe_title' },
            _h1: {
              name: {
                required: 'True',
                readonly: "context.get['from_my_profile', False]",
                placeholder: "Employee's Name"
              }
            }
          },
          _div: {
            _attr: { class: 'row' },
            _h2: {
              _attr: { class: 'col-lg-6 ps-lg-0' },
              job_title: {
                readonly: [['can_edit', '=', false]],
                class: 'w-100',
                placeholder: 'Job Position'
              }
            }
          },
          _group: {
            _group: {
              can_edit: { invisible: '1' },
              mobile_phone: {
                widget: 'phone',
                readonly: [['can_edit', '=', false]],
                options: "{'enable_sms': false}"
              },
              work_phone: {
                widget: 'phone',
                readonly: [['can_edit', '=', false]],
                options: "{'enable_sms': false}"
              }
            },
            _group_380: {
              work_email: {
                widget: 'email',
                readonly: [['can_edit', '=', false]]
              },
              work_location_id: { readonly: [['can_edit', '=', false]] },
              company_id: { invisible: '1' }
            },
            _group_533: {
              employee_parent_id: { readonly: [['can_edit', '=', false]] },
              coach_id: { readonly: [['can_edit', '=', false]] }
            }
          }
        },
        _notebook_781: {
          _attr: { position: 'inside' },
          _page_public: {
            _attr: {
              name: 'public',
              string: 'Work Information'
            },
            _div: {
              _attr: {
                id: 'o_work_employee_container',
                class: 'd-lg-flex'
              },
              _div: {
                _attr: {
                  id: 'o_work_employee_main',
                  class: 'flex-grow-1'
                },
                _group: {
                  _attr: { string: 'Location' },
                  department_id: { readonly: [['can_edit', '=', false]] },
                  address_id: {
                    readonly: [['can_edit', '=', false]],
                    context: { show_address: 1 },
                    always_reload: true,
                    highlight_first_line: true
                  }
                },
                _group_managers: {
                  _attr: {
                    name: 'managers',
                    string: 'Approvers',
                    class: 'hide-group-if-empty'
                  }
                }
              }
            }
          },
          _page_personal_information: {
            _attr: {
              name: 'personal_information',
              string: 'Private Information'
            },
            _group: {
              _group: {
                _attr: { string: 'Contact Information' },
                employee_ids: { invisible: '1' },
                address_home_id: { invisible: '1' },
                _label_private_street: {
                  for: 'private_street',
                  string: 'Private Address'
                },
                _div: {
                  _attr: { class: 'o_address_format' },
                  private_street: {
                    class: 'o_address_street',
                    placeholder: 'Street...'
                  },
                  private_street2: {
                    class: 'o_address_street',
                    placeholder: 'Street 2...'
                  },
                  private_city: {
                    class: 'o_address_city',
                    placeholder: 'City'
                  },
                  private_state_id: {
                    context: { todo_ctx: "{'default_country_id': private_country_id}" },
                    class: 'o_address_state',
                    placeholder: 'State',
                    no_open: true,
                    no_quick_create: true
                  },
                  private_zip: {
                    class: 'o_address_zip',
                    placeholder: 'ZIP'
                  },
                  private_country_id: {
                    class: 'o_address_country',
                    placeholder: 'Country',
                    no_open: true,
                    no_create: true
                  }
                },
                private_email: {
                  string: 'Email',
                  readonly: [['can_edit', '=', false]],
                  invisible: [['address_home_id', '=', false]]
                },
                employee_phone: {
                  string: 'Phone',
                  readonly: [['can_edit', '=', false]],
                  invisible: [['address_home_id', '=', false]],
                  class: 'o_force_ltr',
                  options: "{'enable_sms': false}"
                },
                private_lang: {
                  string: 'Language',
                  readonly: [['can_edit', '=', false]],
                  invisible: [['address_home_id', '=', false]]
                },
                employee_bank_account_id: { readonly: [['can_edit', '=', false]] },
                km_home_work: { readonly: [['can_edit', '=', false]] }
              },
              _group_240: {
                _attr: { string: 'Citizenship' },
                employee_country_id: {
                  readonly: [['can_edit', '=', false]],
                  no_open: true,
                  no_create: true
                },
                identification_id: { readonly: [['can_edit', '=', false]] },
                passport_id: { readonly: [['can_edit', '=', false]] },
                gender: { readonly: [['can_edit', '=', false]] },
                birthday: { readonly: [['can_edit', '=', false]] },
                place_of_birth: { readonly: [['can_edit', '=', false]] },
                country_of_birth: { readonly: [['can_edit', '=', false]] }
              },
              _group_568: {
                _attr: { string: 'Marital Status' },
                marital: { readonly: [['can_edit', '=', false]] },
                spouse_complete_name: {
                  invisible: [['marital', 'not in', ['married', 'cohabitant']]],
                  readonly: [['can_edit', '=', false]]
                },
                spouse_birthdate: {
                  invisible: [['marital', 'not in', ['married', 'cohabitant']]],
                  readonly: [['can_edit', '=', false]]
                }
              },
              _group_241: {
                _attr: { string: 'Education' },
                certificate: { readonly: [['can_edit', '=', false]] },
                study_field: { readonly: [['can_edit', '=', false]] },
                study_school: { readonly: [['can_edit', '=', false]] }
              },
              _group_295: {
                _attr: { string: 'Dependant' },
                children: { readonly: [['can_edit', '=', false]] }
              },
              _group_329: {
                _attr: { string: 'Emergency' },
                emergency_contact: { readonly: [['can_edit', '=', false]] },
                emergency_phone: {
                  widget: 'phone',
                  readonly: [['can_edit', '=', false]],
                  options: "{'enable_sms': false}"
                }
              },
              _group_has_work_permit: {
                _attr: {
                  name: 'has_work_permit',
                  string: 'Work Permit'
                },
                visa_no: { readonly: [['can_edit', '=', false]] },
                permit_no: { readonly: [['can_edit', '=', false]] },
                visa_expire: { readonly: [['can_edit', '=', false]] }
              }
            }
          },
          _page_hr_settings: {
            _attr: {
              name: 'hr_settings',
              string: 'HR Settings'
            },
            _group: {
              _group_active_group: {
                _attr: {
                  name: 'active_group',
                  string: 'Status'
                },
                employee_type: { readonly: [['can_edit', '=', false]] }
              },
              _group_identification_group: {
                _attr: {
                  name: 'identification_group',
                  string: 'Attendance'
                },
                pin: { readonly: [['can_edit', '=', false]] },
                barcode: { readonly: [['can_edit', '=', false]] }
              }
            }
          }
        }
      }
    }
  },

  view_users_simple_form_inherit_hr: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_simple_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='mobile']",
            position: 'after'
          },
          create_employee_id: {
            invisible: '1',
            force_save: '1'
          },
          create_employee: {
            string: 'Create Employee',
            invisible: [['create_employee_id', '>', 0]],
            force_save: '1'
          }
        }
      }
    }
  },

  view_users_simple_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_simple_form',
    arch: {
      sheet: {
        _sheet: {
          _attr: { position: 'after' },
          _footer: {
            _button: {
              _attr: {
                string: 'Save',
                class: 'btn btn-primary'
              }
            },
            _button_194: {
              _attr: {
                string: 'Cancel',
                class: 'btn btn-secondary'
              }
            }
          }
        }
      }
    }
  },

  res_users_action_my: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Change my Preferences',
    res_model: 'res.users',
    search_view_id: 'tooooooodoooooo',
    context: { from_my_profile: true },
    views: {
      tree: 'hr.res_users_view_form_profile',
      form: '=======todo=========='
    }
  },

  res_users_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.users',
    inherit_id: 'base.view_users_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//header',
            position: 'inside'
          },
          share: { invisible: '1' },
          employee_ids: { invisible: '1' },
          employee_id: { invisible: '1' },
          _button_action_create_employee: {
            _attr: {
              name: 'action_create_employee',
              type: 'object',
              string: 'Create employee',
              invisible: ['|', '|', ['id', '=', false], ['share', '=', true], ['employee_id', '!=', false]]
            }
          }
        },
        _xpath_186: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_hr_employee_action_from_user: {
            _attr: {
              name: 'hr_employee_action_from_user',
              type: 'action',
              icon: 'fa-users',
              invisible: [['employee_count', '=', 0]],
              context: { active_test: false },
              class: 'oe_stat_button'
            },
            employee_count: {
              string: 'Employee(s)',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
