export default {
  hr_expense_view_expenses_analysis_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'tree',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        company_currency_id: { invisible: '1' },
        attachment_number: { invisible: 'True' },
        date: { optional: 'show' },
        product_id: { optional: 'hide' },
        name: {},
        employee_id: { widget: 'many2one_avatar_employee' },
        sheet_id: {
          invisible: "not context.get['show_report', False]",
          readonly: '1',
          optional: 'show'
        },
        payment_mode: { optional: 'show' },
        activity_ids: {
          widget: 'list_activity',
          optional: 'show'
        },
        accounting_date: {
          groups: 'account.group_account_invoice,account.group_account_readonly',
          readonly: '0',
          optional: 'hide'
        },
        reference: {
          groups: 'account.group_account_readonly',
          optional: 'hide'
        },
        analytic_distribution: {
          widget: 'analytic_distribution',
          groups: 'analytic.group_analytic_accounting',
          optional: 'show',
          product_field: 'product_id',
          business_domain: 'expense'
        },
        account_id: {
          groups: 'account.group_account_readonly',
          optional: 'hide'
        },
        _field_company_id_289: {
          company_id: {
            groups: 'base.group_multi_company',
            readonly: '1',
            optional: 'show'
          }
        },
        unit_amount_display: {
          string: 'Unit Price',
          widget: 'monetary',
          optional: 'hide',
          currency_field: 'company_currency_id'
        },
        quantity: { optional: 'hide' },
        tax_ids: {
          widget: 'many2many_tags',
          groups: 'account.group_account_invoice,account.group_account_readonly',
          optional: 'hide'
        },
        amount_tax_company: {
          groups: 'account.group_account_invoice,account.group_account_readonly',
          optional: 'hide'
        },
        _field_attachment_number_306: {
          attachment_number: {
            invisible: [['attachment_number', '=', 0]],
            class: 'fa fa-paperclip pe-0'
          }
        },
        total_amount_company: {
          widget: 'monetary',
          optional: 'show',
          currency_field: 'company_currency_id'
        },
        total_amount: {
          groups: 'base.group_multi_currency',
          optional: 'hide'
        },
        currency_id: {
          groups: 'base.group_multi_currency',
          optional: 'hide'
        },
        state: {
          widget: 'badge',
          readonly: '1',
          optional: 'show'
        }
      }
    }
  },

  view_expenses_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    inherit_id: 'hr_expense_view_expenses_analysis_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'hr_expense_dashboard_tree',
              js_class: 'hr_expense_dashboard_tree'
            }
          }
        }
      }
    }
  },

  view_my_expenses_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    inherit_id: 'hr_expense.view_expenses_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'hr_expense_dashboard_tree',
              js_class: 'hr_expense_dashboard_tree'
            }
          },
          _attribute_class: {
            _attr: {
              name: 'class',
              text: 'hr_expense h-auto o_forbidden_tooltip_parent',
              class: 'hr_expense h-auto o_forbidden_tooltip_parent'
            }
          }
        }
      }
    }
  },

  hr_expense_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'form',
    arch: {
      header: {
        _button_action_submit_expenses: {
          _attr: {
            name: 'action_submit_expenses',
            type: 'object',
            string: 'Create Report',
            invisible: ['|', ['attachment_number', '<=', 0], ['sheet_id', '!=', false]],
            class: 'oe_highlight o_expense_submit'
          }
        },
        _widget_attach_document: {
          _attr: {
            name: 'attach_document',
            string: 'Attach Receipt',
            invisible: [['attachment_number', '<', 1]]
          }
        },
        _widget_attach_document_311: {
          _attr: {
            name: 'attach_document',
            string: 'Attach Receipt',
            invisible: [['attachment_number', '>=', 1]]
          }
        },
        _button_action_submit_expenses_189: {
          _attr: {
            name: 'action_submit_expenses',
            type: 'object',
            string: 'Create Report',
            invisible: ['|', ['attachment_number', '>=', 1], ['sheet_id', '!=', false]],
            class: 'o_expense_submit'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,reported,approved,done,refused'
        },
        _button_action_view_sheet: {
          _attr: {
            name: 'action_view_sheet',
            type: 'object',
            string: 'View Report',
            invisible: [['sheet_id', '=', false]],
            class: 'oe_highlight'
          }
        },
        _button_action_split_wizard: {
          _attr: {
            name: 'action_split_wizard',
            type: 'object',
            string: 'Split Expense',
            invisible: ['|', ['sheet_id', '!=', false], ['product_has_cost', '=', true]]
          }
        }
      },
      sheet: {
        _div: {
          description: { placeholder: 'Notes...' }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: {
              readonly: [['sheet_is_editable', '=', false]],
              placeholder: 'e.g. Lunch with Customer'
            }
          }
        },
        _group: {
          _group: {
            product_has_cost: { invisible: '1' },
            product_has_tax: { invisible: '1' },
            same_currency: { invisible: '1' },
            is_editable: { invisible: '1' },
            is_ref_editable: { invisible: '1' },
            currency_id: { invisible: '1' },
            company_id: { invisible: '1' },
            company_currency_id: { invisible: '1' },
            amount_tax_company: { invisible: '1' },
            unit_amount: { invisible: '1' },
            attachment_number: { invisible: '1' },
            total_amount_company: { invisible: '1' },
            duplicate_expense_ids: { invisible: '1' },
            sheet_is_editable: { invisible: '1' },
            currency_rate: { invisible: '1' },
            _label_product_id: { for: 'product_id' },
            _div: {
              product_id: {
                readonly: [['sheet_is_editable', '=', false]],
                context: {
                  default_can_be_expensed: 1,
                  tree_view_ref: 'hr_expense.product_product_expense_tree_view',
                  form_view_ref: 'hr_expense.product_product_expense_form_view'
                },
                class: 'w-100',
                required: '1'
              },
              _div: {
                _attr: {
                  invisible: ['|', ['product_description', '=', false], ['product_id', '=', false]],
                  class: 'fst-italic'
                },
                product_description: {}
              }
            },
            _field_unit_amount_654: {
              unit_amount: {
                widget: 'monetary',
                invisible: [['product_has_cost', '=', false]],
                readonly: ['|', ['sheet_is_editable', '=', false], ['product_has_cost', '=', true]],
                required: '1',
                force_save: '1',
                currency_field: 'currency_id',
                field_digits: true
              }
            },
            product_uom_category_id: { invisible: '1' },
            _label_quantity: {
              for: 'quantity',
              invisible: [['product_has_cost', '=', false]]
            },
            _div_220: {
              _attr: { invisible: [['product_has_cost', '=', false]] },
              _div: {
                _attr: { class: 'o_row' },
                quantity: {
                  readonly: [['sheet_is_editable', '=', false]],
                  class: 'oe_inline'
                },
                product_uom_id: {
                  groups: 'uom.group_uom',
                  required: '1',
                  force_save: '1',
                  no_open: true,
                  no_create: true
                }
              },
              total_amount_company: {
                widget: 'monetary',
                currency_field: 'company_currency_id'
              }
            },
            _label_total_amount: {
              for: 'total_amount',
              string: 'Total',
              invisible: [['product_has_cost', '=', true]]
            },
            _div_456: {
              _attr: { invisible: [['product_has_cost', '=', true]] },
              _div: {
                _attr: {
                  invisible: [['product_has_cost', '=', true]],
                  class: 'o_row'
                },
                total_amount: {
                  widget: 'monetary',
                  readonly: [['sheet_is_editable', '=', false]],
                  class: 'oe_inline',
                  currency_field: 'currency_id'
                },
                currency_id: { groups: 'base.group_multi_currency' }
              },
              _div_301: {
                _attr: {
                  invisible: [['same_currency', '=', true], ['product_has_cost', '=', false]],
                  class: 'o_row'
                },
                total_amount_company: {
                  widget: 'monetary',
                  class: 'oe_inline',
                  currency_field: 'company_currency_id'
                },
                label_convert_rate: { class: 'ps-0' }
              }
            },
            _label_tax_ids: {
              for: 'tax_ids',
              invisible: [['product_has_tax', '=', false]]
            },
            _div_774: {
              _attr: {
                invisible: [['product_has_tax', '=', false]],
                class: 'd-flex o_row'
              },
              _div: {
                _attr: { class: 'p-2' },
                tax_ids: {
                  widget: 'many2many_tags',
                  readonly: ['|', ['is_editable', '=', false], ['product_has_cost', '=', true]],
                  invisible: [['product_has_tax', '=', false]],
                  context: { todo_ctx: "{'default_company_id': company_id, 'default_type_tax_use': 'purchase', 'default_price_include': 1}" },
                  force_save: '1',
                  no_create: true
                }
              },
              _div_280: {
                _attr: { class: 'd-flex pt-2' },
                _span: {
                  _attr: {
                    invisible: [['product_has_tax', '=', false]],
                    class: 'oe_inline o_form_label ms-1 me-1',
                    text: '('
                  }
                },
                amount_tax: {
                  invisible: [['product_has_tax', '=', false]],
                  class: 'ps-0'
                },
                _span_953: {
                  _attr: {
                    invisible: [['product_has_tax', '=', false]],
                    class: 'oe_inline o_form_label ms-1 me-3',
                    text: ')'
                  }
                }
              }
            },
            employee_id: {
              widget: 'many2one_avatar_employee',
              groups: 'hr_expense.group_hr_expense_team_approver',
              context: { todo_ctx: "{'default_company_id': company_id}" }
            },
            _label_payment_mode: {
              for: 'payment_mode',
              invisible: [['product_has_cost', '=', true]]
            },
            _div_822: {
              _attr: { invisible: [['product_has_cost', '=', true]] },
              payment_mode: { widget: 'radio' }
            }
          },
          _group_271: {
            reference: {
              groups: 'account.group_account_readonly',
              readonly: [['is_ref_editable', '=', false]],
              invisible: [['product_has_cost', '=', true]]
            },
            date: { readonly: [['sheet_is_editable', '=', false]] },
            accounting_date: { invisible: ['|', ['accounting_date', '=', false], ['state', 'not in', ['approved', 'done']]] },
            account_id: {
              groups: 'account.group_account_readonly',
              domain: { todo_ctx: "[('account_type', 'not in', ('asset_receivable','liability_payable','asset_cash','liability_credit_card')), ('company_id', '=', company_id)]" },
              readonly: ['|', ['is_editable', '=', false], ['sheet_is_editable', '=', false]],
              context: { todo_ctx: "{'default_company_id': company_id}" },
              no_create: true
            },
            sheet_id: { invisible: '1' },
            analytic_distribution: {
              widget: 'analytic_distribution',
              groups: 'analytic.group_analytic_accounting',
              readonly: [['is_editable', '=', false]],
              product_field: 'product_id',
              account_field: 'account_id',
              business_domain: 'expense'
            },
            company_id: { groups: 'base.group_multi_company' }
          }
        }
      }
    }
  },

  hr_expense_view_form_without_header: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    inherit_id: 'hr_expense.hr_expense_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '/form/header',
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '1',
              invisible: '1'
            }
          }
        },
        employee_id: {
          position: 'attributes',
          __todo__readonly: '1'
        },
        company_id: {
          position: 'attributes',
          __todo__readonly: '1'
        }
      }
    }
  },

  hr_expense_view_expenses_analysis_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'otherview',
    arch: {}
  },

  hr_expense_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    inherit_id: 'hr_expense_view_expenses_analysis_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'hr_expense_kanban',
              js_class: 'hr_expense_kanban'
            }
          }
        }
      }
    }
  },

  hr_expense_kanban_view_header: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    inherit_id: 'hr_expense_view_expenses_analysis_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'hr_expense_dashboard_kanban',
              js_class: 'hr_expense_dashboard_kanban'
            }
          }
        }
      }
    }
  },

  hr_expense_view_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'otherview',
    arch: {}
  },

  hr_expense_view_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'otherview',
    arch: {}
  },

  hr_expense_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'search',
    arch: {
      name: {
        string: 'Expense',
        filter_domain: { todo_ctx: "['|', '|', ('employee_id', 'ilike', self), ('name', 'ilike', self), ('product_id', 'ilike', self)]" }
      },
      date: {},
      employee_id: {},
      _filter_my_expenses: {
        _attr: {
          name: 'my_expenses',
          string: 'My Expenses',
          domain: { todo_ctx: "[('employee_id.user_id', '=', uid)]" }
        }
      },
      _filter_my_team_expenses: {
        _attr: {
          name: 'my_team_expenses',
          string: 'My Team',
          help: 'Expenses of Your Team Member',
          groups: 'hr_expense.group_hr_expense_team_approver',
          domain: { todo_ctx: "[('employee_id.parent_id.user_id', '=', uid)]" }
        }
      },
      _separator: {},
      _filter_no_report: {
        _attr: {
          name: 'no_report',
          string: 'To Report',
          domain: [['sheet_id', '=', false]]
        }
      },
      _filter_refused: {
        _attr: {
          name: 'refused',
          string: 'Refused',
          help: 'Refused Expenses',
          domain: [['state', '=', 'refused']]
        }
      },
      _separator_384: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Expense Date',
          date: 'date'
        }
      },
      _separator_225: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Former Employees',
          groups: 'hr_expense.group_hr_expense_user,hr_expense.group_hr_expense_manager',
          domain: [['employee_id.active', '=', false]]
        }
      },
      _separator_649: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
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
      _group: {
        _attr: { string: 'Group By' },
        _filter_employee: {
          _attr: {
            name: 'employee',
            string: 'Employee',
            domain: [],
            context: { group_by: 'employee_id' }
          }
        },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Category',
            domain: [],
            context: { group_by: 'product_id' }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: { group_by: 'state' }
          }
        },
        _filter_expensesmonth: {
          _attr: {
            name: 'expensesmonth',
            string: 'Expense Date',
            help: 'Expense Date',
            domain: [],
            context: { group_by: 'date' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        }
      }
    }
  },

  hr_expense_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'otherview',
    arch: {}
  },

  hr_expense_actions_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Expenses Analysis',
    res_model: 'hr.expense',
    search_view_id: 'hr_expense_view_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  hr_expense_actions_all_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'hr_expense.hr_expense_view_graph',
    act_window_id: 'hr_expense_actions_all'
  },

  hr_expense_actions_all_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'hr_expense.hr_expense_view_pivot',
    act_window_id: 'hr_expense_actions_all'
  },

  hr_expense_actions_all_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'hr_expense_view_expenses_analysis_tree',
    act_window_id: 'hr_expense_actions_all'
  },

  hr_expense_actions_my_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'My Expenses',
    res_model: 'hr.expense',
    search_view_id: 'hr_expense_view_search',
    context: { search_default_my_expenses: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  hr_expense_actions_my_all_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'view_my_expenses_tree',
    act_window_id: 'hr_expense_actions_my_all'
  },

  hr_expense_actions_my_all_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'hr_expense_kanban_view_header',
    act_window_id: 'hr_expense_actions_my_all'
  }
}
