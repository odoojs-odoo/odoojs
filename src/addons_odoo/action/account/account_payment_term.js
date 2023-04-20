export default {
  view_payment_term_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  view_payment_term_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'form',
    arch: {
      sheet: {
        active: { invisible: '1' },
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },
        _group: {
          _group_name: {
            name: {}
          },

          _group_company_id: {
            company_id: { groups: 'base.group_multi_company' }
          }
        },

        _group_note: {
          note: {}
        },

        _label_display_on_invoice: { for: 'display_on_invoice' },
        display_on_invoice: {},

        _separator: { _attr: { string: 'Terms' } },

        _p: 'The last line\'s computation type should be "Balance" to ensure that the whole amount will be allocated.',

        line_ids: {
          widget: 'x2many_tree',
          views: {
            tree: {
              arch: {
                sheet: {
                  value: {},
                  value_amount: {
                    invisible: ({ record }) => {
                      //  'invisible': [('value', '=', 'balance')]}" digits="[2, 2]"/>
                      const { value } = record
                      return value === 'balance'
                    }
                  },
                  months: {},
                  days: {},
                  end_month: { widget: 'boolean_toggle' },
                  days_after: {
                    invisible: ({ record }) => {
                      // 'invisible': [('end_month','=', False)]}"/>
                      const { end_month } = record
                      return !end_month
                    }
                  },
                  discount_percentage: {},
                  discount_days: {}
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _group_name: {
                    value: {},
                    value_amount: {
                      invisible: ({ record }) => {
                        //  'invisible': [('value', '=', 'balance')]}" digits="[2, 2]"/>
                        const { value } = record
                        return value === 'balance'
                      }
                    },
                    months: {},
                    days: {},
                    end_month: { widget: 'boolean_toggle' },
                    days_after: {
                      invisible: ({ record }) => {
                        // 'invisible': [('end_month','=', False)]}"/>
                        const { end_month } = record
                        return !end_month
                      }
                    },
                    discount_percentage: {},
                    discount_days: {}
                  }
                }
              }
            }
          }
        },

        _div: {
          _attr: {
            invisible({ editable }) {
              return !editable
            }
          },

          _separator: { _attr: { string: 'Example' } },
          example_invalid: { invisible: 1 },
          _div_1: {
            _attr: {
              invisible({ record }) {
                // 'invisible': [('example_invalid', '=', False)]
                const { example_invalid } = record
                return !example_invalid
              }
            },
            _span: 'The Payment Term must have one Balance line.'
          },

          _div_2: {
            _attr: {
              class: 'd-flex',
              invisible({ record }) {
                //'invisible': [('example_invalid', '=', True)]
                const { example_invalid } = record
                return example_invalid
              }
            },
            _span: 'For any invoice of ',
            example_amount: { nolabel: 1, readonly: 1 },
            _span_2: ' dated ',
            example_date: { nolabel: 1, readonly: 1 },
            _span_3: ' the due date(s) and amount(s) will be: '
          },
          example_preview: {
            nolabel: 1,
            readonly: 1,
            invisible({ record }) {
              //'invisible': [('example_invalid', '=', True)]
              const { example_invalid } = record
              return example_invalid
            }
          }
        }
      }
    },
    fields: {}
  },

  view_payment_term_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_payment_term_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Terms',
    type: 'ir.actions.act_window',
    res_model: 'account.payment.term',
    search_view_id: 'view_payment_term_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_payment_term_tree',
      form: 'view_payment_term_form'
    }
  }
}
