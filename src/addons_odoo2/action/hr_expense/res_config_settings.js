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
              string: 'Expenses',
              groups: 'hr_expense.group_hr_expense_manager',
              class: 'app_settings_block'
            },
            _h2: 'Expenses',
            _div_expenses_setting_container: {
              _attr: {
                name: 'expenses_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: "Send an email to this email alias with the receipt in attachment to create an expense in one click. If the first word of the mail subject contains the category's internal reference or the category name, the corresponding category will automatically be set. Type the expense amount in the mail subject to set it on the expense too.",
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  use_mailgateway: {}
                },
                _div_786: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_use_mailgateway: {
                    for: 'use_mailgateway',
                    string: 'Incoming Emails'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Create expenses from incoming emails'
                    }
                  },
                  _div_846: {
                    _attr: {
                      invisible: ['|', ['use_mailgateway', '=', false], ['alias_domain', 'in', ['localhost', '', false]]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      _label_expense_alias_prefix: {
                        for: 'expense_alias_prefix',
                        string: 'Alias',
                        class: 'o_light_label'
                      },
                      expense_alias_prefix: { class: 'oe_inline' },
                      _span: '@',
                      alias_domain: {
                        class: 'oe_inline',
                        readonly: '1',
                        force_save: '1'
                      }
                    }
                  },
                  _div_535: {
                    _attr: {
                      invisible: ['|', ['use_mailgateway', '=', false], ['alias_domain', 'not in', ['localhost', '', false]]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      _button_se_setup__action_general_configurati: {
                        _attr: {
                          name: 'se_setup.action_general_configurati',
                          type: 'action',
                          string: 'Setup your domain alias',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_814: {
                _attr: { class: 'col-lg-6 col-12 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_hr_payroll_expense: { widget: 'upgrade_boolean' }
                },
                _div_767: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_hr_payroll_expense: {
                    for: 'module_hr_payroll_expense',
                    string: 'Reimburse in Payslip'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Reimburse expenses in payslips'
                    }
                  }
                }
              },
              _div_281: {
                _attr: {
                  title: 'use OCR to fill data from a picture of the bill',
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_hr_expense_extract: { widget: 'upgrade_boolean' }
                },
                _div_279: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_hr_expense_extract: {
                    for: 'module_hr_expense_extract',
                    string: 'Expense Digitalization (OCR)'
                  },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Digitalize your receipts with OCR and Artificial Intelligence'
                    }
                  }
                }
              }
            },
            _h2_826: 'Default Journals',
            _div: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_265: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Employee Expense Journal'
                    }
                  },
                  _span_817: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Default accounting journal for expenses paid by employees.'
                    }
                  },
                  _div_106: {
                    _attr: { class: 'row mt8' },
                    expense_journal_id: {}
                  }
                }
              },
              _div_784: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_157: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Company Expense Journal'
                    }
                  },
                  _span_182: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Default accounting journal for expenses paid by the company.'
                    }
                  },
                  _div_232: {
                    _attr: { class: 'row mt8' },
                    company_expense_journal_id: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  action_hr_expense_configuration: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'hr_expense',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
