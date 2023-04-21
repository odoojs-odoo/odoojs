export default {
  view_hr_expense_sheet_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.sheet',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        product_ids: { invisible: '1' },
        employee_id: { widget: 'many2one_avatar_employee' },
        accounting_date: {
          groups: 'account.group_account_manager',
          optional: 'hide'
        },
        create_date: { optional: 'hide' },
        name: { string: 'Expense Report' },
        user_id: { widget: 'many2one_avatar_user', optional: 'hide' },
        company_id: { groups: 'base.group_multi_company', optional: 'show' },
        // activity_ids: {
        //   widget: 'list_activity',
        //   readonly: '1',
        //   optional: 'show'
        // },
        total_amount: { optional: 'show' },
        currency_id: { optional: 'hide' },
        journal_id: { optional: 'hide' },
        state: { widget: 'badge', optional: 'show' },
        payment_state: { widget: 'badge', optional: 'show' }
      }
    }
  },

  view_hr_expense_sheet_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.sheet',
    type: 'form',
    arch: {
      header: {
        _button_action_submit_sheet: {
          _attr: {
            name: 'action_submit_sheet',
            type: 'object',
            string: 'Submit to Manager',
            // states: 'draft',
            class: 'oe_highlight o_expense_sheet_submit'
          }
        },
        _button_approve_expense_sheets: {
          _attr: {
            name: 'approve_expense_sheets',
            type: 'object',
            string: 'Approve',
            // invisible: [
            //   '|',
            //   ['can_approve', '=', false],
            //   ['state', '!=', 'submit']
            // ],
            context: { validate_analytic: true },
            class: 'oe_highlight o_expense_sheet_approve'
          }
        },
        _button_action_sheet_move_create: {
          _attr: {
            name: 'action_sheet_move_create',
            type: 'object',
            string: 'Post Journal Entries',
            groups: 'account.group_account_invoice',
            // invisible: [['state', '!=', 'approve']],
            class: 'oe_highlight o_expense_sheet_post'
          }
        },
        _button_action_register_payment: {
          _attr: {
            name: 'action_register_payment',
            type: 'object',
            string: 'Register Payment',
            groups: 'account.group_account_invoice',
            // invisible: [['state', '!=', 'post']],
            context: { dont_redirect_to_payments: true },
            class: 'oe_highlight o_expense_sheet_pay'
          }
        },
        _button_action_unpost: {
          _attr: {
            name: 'action_unpost',
            type: 'object',
            string: 'Cancel',
            groups:
              'account.group_account_readonly,account.group_account_invoice'
            // invisible: [['state', '!=', 'post']]
          }
        },
        _button_hr_expense__hr_expense_refuse_wizard_action: {
          _attr: {
            name: 'hr_expense.hr_expense_refuse_wizard_action',
            type: 'action',
            string: 'Refuse',
            groups: 'hr_expense.group_hr_expense_team_approver',
            // states: 'submit,approve',
            context: { hr_expense_refuse_model: 'hr.expense.sheet' }
          }
        },
        _button_reset_expense_sheets: {
          _attr: {
            name: 'reset_expense_sheets',
            type: 'object',
            string: 'Reset to Draft'
            // invisible: [
            //   '|',
            //   ['can_reset', '=', false],
            //   ['state', 'not in', ['submit', 'cancel', 'approve']]
            // ]
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,submit,approve,post,done',
          force_save: '1'
        }
      },
      sheet: {
        can_reset: { invisible: '1' },
        can_approve: { invisible: '1' },
        company_id: { invisible: '1' },
        _div: { _attr: { class: 'o_attachment_preview' } },
        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' },
          _button_action_open_account_move: {
            _attr: {
              name: 'action_open_account_move',
              type: 'object',
              icon: 'fa-file-text-o',
              groups:
                'account.group_account_user,account.group_account_readonly',
              // invisible: [
              //   '|',
              //   ['state', 'not in', ['post', 'done']],
              //   ['account_move_id', '=', false]
              // ],
              class: 'oe_stat_button',
              text: 'Journal Entry'
            }
          },
          account_move_id: { invisible: '1' },
          _button_action_get_expense_view: {
            _attr: {
              name: 'action_get_expense_view',
              type: 'object',
              icon: 'fa-file-text-o',
              // invisible: [['expense_number', '=', 0]],
              class: 'oe_stat_button'
            },
            expense_number: { string: 'Expenses', widget: 'statinfo' }
          }
        },
        payment_state: { invisible: 'True' },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Posted',
            bg_color: 'bg-success'
            // invisible: [
            //   '|',
            //   ['payment_state', '!=', 'paid'],
            //   ['payment_mode', '==', 'own_account']
            // ]
          }
        },
        _widget_web_ribbon_964: {
          _attr: {
            name: 'web_ribbon',
            title: 'Paid',
            bg_color: 'bg-success'
            // invisible: [
            //   '|',
            //   ['payment_state', '!=', 'paid'],
            //   ['payment_mode', '==', 'company_account']
            // ]
          }
        },
        _widget_web_ribbon_417: {
          _attr: {
            name: 'web_ribbon',
            title: 'Partial',
            bg_color: 'bg-info'
            // invisible: [['payment_state', '!=', 'partial']]
          }
        },
        _widget_web_ribbon_830: {
          _attr: {
            name: 'web_ribbon',
            title: 'In Payment'
            // invisible: [['payment_state', '!=', 'in_payment']]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name', class: 'oe_edit_only' },
          _h1: {
            name: {
              readonly: [['is_editable', '=', false]],
              placeholder: 'e.g. Trip to NY',
              force_save: '1'
            }
          }
        },
        _group: {
          _group_employee_details: {
            _attr: { name: 'employee_details' },
            employee_id: {
              widget: 'many2one_avatar_employee',
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              }
            },
            payment_mode: {},
            journal_id: {
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              // invisible: [['payment_mode', '!=', 'own_account']],
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              },
              no_open: true,
              no_create: true
            },
            bank_journal_id: {
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              // invisible: [['payment_mode', '!=', 'company_account']],
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              },
              no_open: true,
              no_create: true
            },
            address_id: {
              invisible: '1',
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              }
            },
            department_id: {
              invisible: '1',
              context: {
                // todo_ctx: "{'default_company_id': company_id}"
              }
            }
          },
          _group: {
            company_id: { groups: 'base.group_multi_company' },
            user_id: { widget: 'many2one_avatar_user' },
            accounting_date: {
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              // invisible: [['state', 'not in', ['approve', 'post', 'done']]],
              readonly: [['state', 'in', ['post', 'done']]]
            }
          }
        },
        _notebook: {
          _page_expenses: {
            _attr: { name: 'expenses', string: 'Expense' },
            is_editable: { invisible: '1' },
            expense_line_ids: {
              widget: 'many2many',
              // domain: {
              //   todo_ctx:
              //     "[('state', '=', 'draft'), ('employee_id', '=', employee_id), ('company_id', '=', company_id)]"
              // },
              // readonly: [['is_editable', '=', false]],
              context: {
                // todo_ctx:
                //   "{'form_view_ref' : 'hr_expense.hr_expense_view_form_without_header', 'default_company_id': company_id, 'default_employee_id': employee_id}"
              },
              force_save: '1',
              reload_on_button: true,
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { class: 'o_expense_line_list' },
                      date: { optional: 'show' },
                      product_id: {},
                      name: {},
                      description: { optional: 'hide' },
                      employee_id: { invisible: '1' },
                      state: { invisible: '1' },
                      attachment_number: { invisible: '1' },
                      _button_action_get_attachment_view: {
                        _attr: {
                          name: 'action_get_attachment_view',
                          type: 'object',
                          title: 'View Attachments',
                          icon: 'fa-paperclip',
                          // invisible: [['attachment_number', '=', 0]],
                          class: 'float-end pe-0'
                        }
                      },
                      reference: { readonly: 'True', optional: 'hide' },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        optional: 'show',
                        product_field: 'product_id',
                        account_field: 'account_id',
                        business_domain: 'expense'
                      },
                      account_id: { readonly: 'True', optional: 'hide' },
                      product_has_cost: { invisible: 'True' },
                      unit_amount: {
                        widget: 'monetary',
                        // readonly: [['product_has_cost', '=', false]],
                        optional: 'hide',
                        currency_field: 'currency_id'
                      },
                      currency_id: { readonly: 'True', optional: 'hide' },
                      quantity: {
                        // readonly: [['product_has_cost', '=', false]],
                        optional: 'hide'
                      },
                      company_id: { invisible: '1' },
                      tax_ids: {
                        string: 'Taxes',
                        widget: 'many2many_tags',
                        context: {
                          // todo_ctx: "{'default_company_id': company_id}"
                        },
                        optional: 'show'
                      },
                      amount_tax: {
                        groups: 'base.group_multi_currency',
                        context: {
                          // todo_ctx: "{'default_company_id': company_id}"
                        },
                        readonly: 'True',
                        optional: 'hide'
                      },
                      total_amount: {
                        // readonly: [['product_has_cost', '=', true]],
                        optional: 'show'
                      },
                      amount_tax_company: {
                        readonly: 'True',
                        optional: 'hide'
                      },
                      company_currency_id: { invisible: '1' },
                      total_amount_company: {
                        groups: 'base.group_multi_currency',
                        readonly: 'True',
                        optional: 'show'
                      },
                      is_refused: { invisible: 'True' }
                    }
                  }
                }
              }
            },
            currency_id: { invisible: '1' },
            _group_expense_total: {
              _attr: {
                name: 'expense_total',
                class: 'oe_subtotal_footer oe_right'
              },
              untaxed_amount: {},
              _div: {
                _attr: { class: 'oe_inline o_td_label' },
                _label_total_amount_taxes: { for: 'total_amount_taxes' }
              },
              total_amount_taxes: {},
              _div_321: {
                _attr: { class: 'oe_inline o_td_label' },
                _label_total_amount: { for: 'total_amount' }
              },
              total_amount: { class: 'oe_subtotal_footer_separator' },
              amount_residual: {
                invisible: [['state', 'not in', ('post', 'done')]],
                class: 'oe_subtotal_footer_separator'
              }
            }
          }
        }
      }
    }
  },

  hr_expense_sheet_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense.sheet',
    type: 'search',
    arch: {
      fields: {
        name: { string: 'Expense Report' },
        // accounting_date: {},
        employee_id: {},
        department_id: { string: 'Department', operator: 'child_of' },
        journal_id: { string: 'Journal' }
      },

      filters: {
        group_my: {
          my_reports: {
            name: 'my_reports',
            string: 'My Reports',
            domain({ env }) {
              return [['employee_id.user_id', '=', env.uid]]
            }
          },
          my_team_reports: {
            name: 'my_team_reports',
            string: 'My Team',
            help: 'Expenses of Your Team Member',
            groups: 'hr_expense.group_hr_expense_manager',
            domain({ env }) {
              return [['employee_id.parent_id.user_id', '=', env.uid]]
            }
          }
        },
        group_accounting_date: {
          filter_accounting_date: {
            name: 'filter_accounting_date',
            string: 'Date',
            date: 'accounting_date'
          }
        },
        group_inactive: {
          inactive: {
            name: 'inactive',
            string: 'Former Employees',
            groups:
              'hr_expense.group_hr_expense_user,hr_expense.group_hr_expense_manager',
            domain: [['employee_id.active', '=', false]]
          }
        }
      }
    }
  },

  action_hr_expense_sheet_all_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'All Expense Reports',
    res_model: 'hr.expense.sheet',
    search_view_id: 'hr_expense_sheet_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_hr_expense_sheet_tree',
      form: 'view_hr_expense_sheet_form'
    }
  }
}
