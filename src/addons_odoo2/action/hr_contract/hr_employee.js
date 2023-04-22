export default {
  view_employee_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'hr.view_employee_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='work_email']",
            position: 'after'
          },
          first_contract_date: { optional: 'hide' }
        }
      }
    }
  },

  hr_hr_employee_view_form2: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'hr.view_employee_form',
    arch: {
      sheet: {
        _data: {
          _div_button_box: {
            _attr: {
              name: 'button_box',
              position: 'inside'
            },
            contract_warning: { invisible: '1' },
            employee_type: { invisible: '1' },
            _button_action_open_contract_history: {
              _attr: {
                name: 'action_open_contract_history',
                type: 'object',
                icon: 'fa-book',
                groups: 'hr_contract.group_hr_contract_manager',
                invisible: [['employee_type', 'not in', ['employee', 'student', 'trainee']]],
                class: 'oe_stat_button'
              },
              _div: {
                _attr: {
                  invisible: [['first_contract_date', '=', false]],
                  class: 'o_stat_info'
                },
                _span: {
                  _attr: {
                    title: 'In Contract Since',
                    invisible: [['contract_warning', '=', true]],
                    class: 'o_stat_text text-success',
                    text: 'In Contract Since'
                  }
                },
                _span_532: {
                  _attr: {
                    invisible: [['contract_warning', '=', true]],
                    class: 'o_stat_value text-success'
                  },
                  first_contract_date: { readonly: '1' }
                },
                _span_309: {
                  _attr: {
                    title: 'In Contract Since',
                    invisible: [['contract_warning', '=', false]],
                    class: 'o_stat_text text-danger',
                    text: 'In Contract Since'
                  }
                },
                _span_757: {
                  _attr: {
                    invisible: [['contract_warning', '=', false]],
                    class: 'o_stat_value text-danger'
                  },
                  first_contract_date: { readonly: '1' }
                }
              },
              _div_232: {
                _attr: {
                  invisible: [['first_contract_date', '!=', false]],
                  class: 'o_stat_info'
                },
                _span: {
                  _attr: { class: 'o_stat_value text-danger' },
                  contracts_count: {}
                },
                _span_348: {
                  _attr: {
                    invisible: [['contracts_count', '!=', 1]],
                    class: 'o_stat_text text-danger',
                    text: 'Contract'
                  }
                },
                _span_856: {
                  _attr: {
                    invisible: [['contracts_count', '=', 1]],
                    class: 'o_stat_text text-danger',
                    text: 'Contracts'
                  }
                }
              }
            }
          },
          _xpath: {
            _attr: {
              expr: "//page[@name='hr_settings']//field[@name='employee_type']",
              position: 'after'
            },
            first_contract_date: {
              invisible: ['|', ['employee_type', 'not in', ['employee', 'student']], ['first_contract_date', '=', false]],
              readonly: '1'
            }
          },
          _xpath_895: {
            _attr: {
              expr: "//field[@name='bank_account_id']",
              position: 'replace'
            },
            bank_account_id: {
              invisible: [['address_home_id', '=', false]],
              context: { display_partner: true }
            }
          },
          _xpath_720: {
            _attr: {
              expr: "//field[@name='resource_calendar_id']",
              position: 'replace'
            },
            calendar_mismatch: { invisible: '1' },
            _label_resource_calendar_id: { for: 'resource_calendar_id' },
            _div: {
              resource_calendar_id: { required: '1' },
              _span: {
                _attr: {
                  invisible: [['calendar_mismatch', '=', false]],
                  class: 'fa fa-exclamation-triangle text-danger o_calendar_warning ms-3'
                }
              }
            }
          },
          job_id: {
            position: 'before',
            __todo__before: {
              contract_id: {
                groups: 'hr_contract.group_hr_contract_manager',
                readonly: '1'
              }
            }
          }
        }
      }
    }
  },

  hr_employee_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.employee',
    inherit_id: 'hr.view_employee_filter',
    arch: {
      sheet: {
        _data: {
          _xpath: {
            _attr: {
              expr: "//filter[@name='message_needaction']",
              position: 'after'
            },
            _separator: {},
            _filter_with_contract_warning: {
              _attr: {
                name: 'with_contract_warning',
                string: 'Contract Warning',
                domain: [['contract_warning', '=', true]]
              }
            }
          }
        }
      }
    }
  }
}
