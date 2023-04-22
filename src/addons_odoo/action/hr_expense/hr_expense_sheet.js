const expense_line_ids_tree_sheet = {
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
    optional: 'show'
  },
  account_id: { readonly: 'True', optional: 'hide' },
  product_has_cost: { invisible: 'True' },
  unit_amount: {
    widget: 'monetary',
    readonly({ record }) {
      // readonly: [['product_has_cost', '=', false]],
      const { product_has_cost } = record
      return !product_has_cost
    },
    optional: 'hide'
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
    optional: 'show',
    context({ record }) {
      const { company_id } = record
      return {
        default_company_id: company_id
      }
    }
  },
  amount_tax: {
    groups: 'base.group_multi_currency',
    context({ record }) {
      const { company_id } = record
      return {
        default_company_id: company_id
      }
    },
    readonly: 'True',
    optional: 'hide'
  },
  total_amount: {
    readonly({ record }) {
      // readonly: [['product_has_cost', '=', true]],
      const { product_has_cost } = record
      return product_has_cost
    },
    optional: 'show'
  },
  amount_tax_company: { groups: '', readonly: 'True', optional: 'hide' },
  company_currency_id: { invisible: '1' },
  total_amount_company: {
    groups: 'base.group_multi_currency',
    readonly: 'True',
    optional: 'show'
  },
  is_refused: { invisible: 'True' }
}

const expense_line_ids_form_sheet = {
  product_id: {},
  name: {}
}

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
        buttons: {
          _button_action_submit_sheet: {
            name: 'action_submit_sheet',
            type: 'object',
            string: 'Submit to Manager',
            class: 'oe_highlight o_expense_sheet_submit',
            invisible({ record }) {
              // states: 'draft',
              const { state } = record
              return ['draft'].includes(state)
            }
          },
          _button_approve_expense_sheets: {
            name: 'approve_expense_sheets',
            type: 'object',
            string: 'Approve',

            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['can_approve', '=', false],
              //   ['state', '!=', 'submit']
              // ],
              const { can_approve, state } = record
              return !can_approve || state != 'submit'
            },
            context: { validate_analytic: true },
            class: 'oe_highlight o_expense_sheet_approve'
          },
          _button_action_sheet_move_create: {
            name: 'action_sheet_move_create',
            type: 'object',
            string: 'Post Journal Entries',
            groups: 'account.group_account_invoice',
            invisible({ record }) {
              // invisible: [['state', '!=', 'approve']],
              const { state } = record
              return state != 'approve'
            },
            class: 'oe_highlight o_expense_sheet_post'
          },
          _button_action_register_payment: {
            name: 'action_register_payment',
            type: 'object',
            string: 'Register Payment',
            groups: 'account.group_account_invoice',
            invisible({ record }) {
              // invisible: [['state', '!=', 'post']],
              const { state } = record
              return state != 'post'
            },
            context: { dont_redirect_to_payments: true },
            class: 'oe_highlight o_expense_sheet_pay'
          },
          _button_action_unpost: {
            name: 'action_unpost',
            type: 'object',
            string: 'Cancel',
            groups:
              'account.group_account_readonly,account.group_account_invoice',
            invisible({ record }) {
              // invisible: [['state', '!=', 'post']],
              const { state } = record
              return state != 'post'
            }
          },
          _button_hr_expense__hr_expense_refuse_wizard_action: {
            name: 'hr_expense.hr_expense_refuse_wizard_action',
            type: 'action',
            string: 'Refuse',
            groups: 'hr_expense.group_hr_expense_team_approver',

            invisible({ record }) {
              // states: 'submit,approve',
              const { state } = record
              return ['submit', 'approve'].includes(state)
            },
            context: { hr_expense_refuse_model: 'hr.expense.sheet' }
          },
          _button_reset_expense_sheets: {
            name: 'reset_expense_sheets',
            type: 'object',
            string: 'Reset to Draft',

            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['can_reset', '=', false],
              //   ['state', 'not in', ['submit', 'cancel', 'approve']]
              // ]
              const { can_reset, state } = record
              return (
                !can_reset || !['submit', 'cancel', 'approve'].includes(state)
              )
            }
          }
        },

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,submit,approve,post,done',
            force_save: '1'
          }
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

              invisible({ record }) {
                // invisible: [
                //   '|',
                //   ['state', 'not in', ['post', 'done']],
                //   ['account_move_id', '=', false]
                // ],
                const { account_move_id, state } = record
                return !account_move_id || !['post', 'done'].includes(state)
              },
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
              invisible({ record }) {
                // invisible: [['expense_number', '=', 0]],
                const { expense_number } = record
                return !expense_number
              },
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
            bg_color: 'bg-success',
            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['payment_state', '!=', 'paid'],
              //   ['payment_mode', '==', 'own_account']
              // ]
              const { payment_state, payment_mode } = record
              return payment_state != 'paid' || payment_mode == 'own_account'
            }
          }
        },
        _widget_web_ribbon_964: {
          _attr: {
            name: 'web_ribbon',
            title: 'Paid',
            bg_color: 'bg-success',
            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['payment_state', '!=', 'paid'],
              //   ['payment_mode', '==', 'company_account']
              // ]
              const { payment_state, payment_mode } = record
              return (
                payment_state != 'paid' || payment_mode == 'company_account'
              )
            }
          }
        },
        _widget_web_ribbon_417: {
          _attr: {
            name: 'web_ribbon',
            title: 'Partial',
            bg_color: 'bg-info',
            invisible({ record }) {
              // invisible: [['payment_state', '!=', 'partial']]
              const { payment_state } = record
              return payment_state != 'partial'
            }
          }
        },
        _widget_web_ribbon_830: {
          _attr: {
            name: 'web_ribbon',
            title: 'In Payment',
            invisible({ record }) {
              // invisible: [['payment_state', '!=', 'in_payment']]
              const { payment_state } = record
              return payment_state != 'in_payment'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name', class: 'oe_edit_only' },
          _h1: {
            name: { force_save: '1' }
          }
        },
        _group: {
          _group_employee_details: {
            _attr: { name: 'employee_details' },
            employee_id: { widget: 'many2one_avatar_employee' },
            payment_mode: {},
            journal_id: {
              no_open: true,
              no_create: true
            },
            bank_journal_id: {
              invisible({ record }) {
                // invisible: [['payment_mode', '!=', 'company_account']],
                const { payment_mode } = record
                return payment_mode != 'company_account'
              },

              no_open: true,
              no_create: true
            },
            address_id: { invisible: '1' },
            department_id: { invisible: '1' }
          },
          _group: {
            company_id: {},
            user_id: { widget: 'many2one_avatar_user' },
            accounting_date: {
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              invisible({ record }) {
                // invisible: [['state', 'not in', ['approve', 'post', 'done']]],
                const { state } = record
                return !['approve', 'post', 'done'].includes(state)
              }
            }
          }
        },
        _notebook: {
          _page_expenses: {
            _attr: { name: 'expenses', string: 'Expense' },
            is_editable: { invisible: '1' },
            expense_line_ids: {
              widget: 'many2many',

              force_save: '1',
              reload_on_button: true,
              views: {
                tree: { arch: { sheet: { ...expense_line_ids_tree_sheet } } },
                form: { arch: { sheet: { ...expense_line_ids_form_sheet } } }
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
                invisible({ record }) {
                  // invisible: [['state', 'not in', ('post', 'done')]],
                  const { state } = record
                  return !['post', 'done'].includes(state)
                },
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
