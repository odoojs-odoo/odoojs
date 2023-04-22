export default {
  hr_expense_view_expenses_analysis_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        company_currency_id: { invisible: '1' },
        // attachment_number: { invisible: 'True' },
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
        // activity_ids: {
        //   widget: 'list_activity',
        //   optional: 'show'
        // },
        accounting_date: {
          groups:
            'account.group_account_invoice,account.group_account_readonly',
          readonly: '0',
          optional: 'hide'
        },
        reference: { optional: 'hide' },
        analytic_distribution: {
          widget: 'analytic_distribution',
          optional: 'show'
        },
        account_id: { optional: 'hide' },
        company_id: { optional: 'show' },
        unit_amount_display: {
          string: 'Unit Price',
          widget: 'monetary',
          optional: 'hide',
          currency_field: 'company_currency_id'
        },
        quantity: { optional: 'hide' },
        tax_ids: { widget: 'many2many_tags', optional: 'hide' },
        amount_tax_company: { optional: 'hide' },
        attachment_number: {
          invisible({ record }) {
            // invisible: [['attachment_number', '=', 0]],
            const { attachment_number } = record
            return !attachment_number
          },
          class: 'fa fa-paperclip pe-0'
        },
        total_amount_company: {
          widget: 'monetary',
          optional: 'show',
          currency_field: 'company_currency_id'
        },
        total_amount: { groups: 'base.group_multi_currency', optional: 'hide' },
        currency_id: { optional: 'hide' },
        state: { widget: 'badge', readonly: '1', optional: 'show' }
      }
    }
  },

  hr_expense_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'form',
    arch: {
      header: {
        buttons: {
          _button_action_submit_expenses: {
            name: 'action_submit_expenses',
            type: 'object',
            string: 'Create Report',
            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['attachment_number', '<=', 0],
              //   ['sheet_id', '!=', false]
              // ],
              const { attachment_number, sheet_id } = record
              return attachment_number <= 0 || !sheet_id
            },
            class: 'oe_highlight o_expense_submit'
          },
          // _widget_attach_document: {
          //   _attr: {
          //     name: 'attach_document',
          //     string: 'Attach Receipt'
          //     // invisible: [['attachment_number', '<', 1]]
          //   }
          // },
          // _widget_attach_document_778: {
          //   _attr: {
          //     name: 'attach_document',
          //     string: 'Attach Receipt'
          //     // invisible: [['attachment_number', '>=', 1]]
          //   }
          // },
          _button_action_submit_expenses_129: {
            name: 'action_submit_expenses',
            type: 'object',
            string: 'Create Report',

            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['attachment_number', '>=', 1],
              //   ['sheet_id', '!=', false]
              // ],
              const { attachment_number, sheet_id } = record
              return attachment_number >= 1 || !sheet_id
            },
            class: 'o_expense_submit'
          },

          _button_action_view_sheet: {
            name: 'action_view_sheet',
            type: 'object',
            string: 'View Report',
            invisible({ record }) {
              // invisible: [['sheet_id', '=', false]],
              const { sheet_id } = record
              return !sheet_id
            },
            class: 'oe_highlight'
          },
          _button_action_split_wizard: {
            name: 'action_split_wizard',
            type: 'object',
            string: 'Split Expense',

            invisible({ record }) {
              // invisible: [
              //   '|',
              //   ['sheet_id', '!=', false],
              //   ['product_has_cost', '=', true]
              // ]
              const { sheet_id, product_has_cost } = record
              return !sheet_id || product_has_cost
            }
          }
        },

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,reported,approved,done,refused'
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
          _h1: { name: {} }
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
              product_id: { class: 'w-100' },
              _div: {
                _attr: {
                  invisible({ record }) {
                    //   invisible: [
                    //     '|',
                    //     ['product_description', '=', false],
                    //     ['product_id', '=', false]
                    //   ],
                    const { product_description, product_id } = record
                    return !product_description || !product_id
                  },
                  class: 'fst-italic'
                },
                product_description: {}
              }
            },
            _field_unit_amount_527: {
              unit_amount: {
                widget: 'monetary',
                invisible({ record }) {
                  // invisible: [['product_has_cost', '=', false]],
                  const { product_has_cost } = record
                  return !product_has_cost
                },
                force_save: '1'
              }
            },
            product_uom_category_id: { invisible: '1' },
            _label_quantity: {
              for: 'quantity',
              invisible({ record }) {
                // invisible: [['product_has_cost', '=', false]],
                const { product_has_cost } = record
                return !product_has_cost
              }
            },
            _div_866: {
              _attr: {
                invisible({ record }) {
                  // invisible: [['product_has_cost', '=', false]],
                  const { product_has_cost } = record
                  return !product_has_cost
                }
              },
              _div: {
                _attr: { class: 'o_row' },
                quantity: {},
                product_uom_id: {
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
              invisible({ record }) {
                // invisible: [['product_has_cost', '=', true]]
                const { product_has_cost } = record
                return product_has_cost
              }
            },
            _div_133: {
              _attr: {
                invisible({ record }) {
                  // invisible: [['product_has_cost', '=', true]]
                  const { product_has_cost } = record
                  return product_has_cost
                }
              },
              _div: {
                _attr: {
                  invisible({ record }) {
                    // invisible: [['product_has_cost', '=', true]]
                    const { product_has_cost } = record
                    return product_has_cost
                  },
                  class: 'o_row'
                },
                total_amount: { widget: 'monetary', class: 'oe_inline' },
                currency_id: {}
              },
              _div_300: {
                _attr: {
                  invisible({ record }) {
                    //   invisible: [
                    //     ['same_currency', '=', true],
                    //     ['product_has_cost', '=', false]
                    //   ],
                    const { same_currency, product_has_cost } = record
                    return same_currency && !product_has_cost
                  },
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
              invisible({ record }) {
                //   invisible: [['product_has_tax', '=', false]]
                const { product_has_tax } = record
                return !product_has_tax
              }
            },
            _div_776: {
              _attr: {
                invisible({ record }) {
                  //   invisible: [['product_has_tax', '=', false]]
                  const { product_has_tax } = record
                  return !product_has_tax
                },
                class: 'd-flex o_row'
              },
              _div: {
                _attr: { class: 'p-2' },
                tax_ids: {
                  widget: 'many2many_tags',
                  invisible({ record }) {
                    //   invisible: [['product_has_tax', '=', false]]
                    const { product_has_tax } = record
                    return !product_has_tax
                  },

                  force_save: '1',
                  no_create: true
                }
              },
              _div_214: {
                _attr: { class: 'd-flex pt-2' },
                _span: {
                  _attr: {
                    invisible({ record }) {
                      //   invisible: [['product_has_tax', '=', false]]
                      const { product_has_tax } = record
                      return !product_has_tax
                    },
                    class: 'oe_inline o_form_label ms-1 me-1',
                    text: '('
                  }
                },
                amount_tax: {
                  invisible({ record }) {
                    //   invisible: [['product_has_tax', '=', false]]
                    const { product_has_tax } = record
                    return !product_has_tax
                  },
                  class: 'ps-0'
                },
                _span_852: {
                  _attr: {
                    invisible({ record }) {
                      //   invisible: [['product_has_tax', '=', false]]
                      const { product_has_tax } = record
                      return !product_has_tax
                    },
                    class: 'oe_inline o_form_label ms-1 me-3',
                    text: ')'
                  }
                }
              }
            },
            employee_id: { widget: 'many2one_avatar_employee' },
            _label_payment_mode: {
              for: 'payment_mode',
              invisible({ record }) {
                // invisible: [['product_has_cost', '=', true]]
                const { product_has_cost } = record
                return product_has_cost
              }
            },
            _div_193: {
              _attr: {
                invisible({ record }) {
                  // invisible: [['product_has_cost', '=', true]]
                  const { product_has_cost } = record
                  return product_has_cost
                }
              },
              payment_mode: { widget: 'radio' }
            }
          },
          _group_261: {
            reference: {
              invisible({ record }) {
                // invisible: [['product_has_cost', '=', true]]
                const { product_has_cost } = record
                return product_has_cost
              }
            },
            date: {},
            accounting_date: {
              invisible({ record }) {
                // invisible: [
                //   '|',
                //   ['accounting_date', '=', false],
                //   ['state', 'not in', ['approved', 'done']]
                // ],
                const { accounting_date, state } = record
                return !accounting_date || !['approved', 'done'].includes(state)
              }
            },
            account_id: { no_create: true },
            sheet_id: { invisible: '1' },
            analytic_distribution: { widget: 'analytic_distribution' },
            company_id: {}
          }
        }
      }
    }
  },

  hr_expense_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'hr.expense',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Expense',
          filter_domain(self) {
            return [
              '|',
              '|',
              ['employee_id', 'ilike', self],
              ['name', 'ilike', self],
              ['product_id', 'ilike', self]
            ]
          }
        },
        // date: {},
        employee_id: {}
      },

      filters: {
        group_my: {
          my_expenses: {
            name: 'my_expenses',
            string: 'My Expenses',
            domain({ env }) {
              return [['employee_id.user_id', '=', env.uid]]
            }
          },
          my_team_expenses: {
            name: 'my_team_expenses',
            string: 'My Team',
            help: 'Expenses of Your Team Member',
            groups: 'hr_expense.group_hr_expense_team_approver',

            domain({ env }) {
              return [['employee_id.parent_id.user_id', '=', env.uid]]
            }
          }
        },
        group_state: {
          no_report: {
            name: 'no_report',
            string: 'To Report',
            domain: [['sheet_id', '=', false]]
          },
          refused: {
            name: 'refused',
            string: 'Refused',
            help: 'Refused Expenses',
            domain: [['state', '=', 'refused']]
          }
        },
        group_date: {
          date: { name: 'date', string: 'Expense Date', date: 'date' }
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

  hr_expense_actions_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Expenses Analysis',
    res_model: 'hr.expense',
    search_view_id: 'hr_expense_view_search',
    views: {
      tree: 'hr_expense_view_expenses_analysis_tree',
      form: 'hr_expense_view_form'
    }
  }
}
