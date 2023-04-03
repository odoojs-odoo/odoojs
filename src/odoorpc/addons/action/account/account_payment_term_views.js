export default {
  view_payment_term_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'tree',
    fields: {
      // sequence: {},
      name: {},
      company_id: {}
    }
  },

  view_payment_term_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          // sequence: {},
          name: {},
          active: { widget: 'web_ribbon' }
        },

        _group_company_id: {
          company_id: {}
        },

        _group_note: {
          _span: 2,
          note: {}
        },

        _group_display_on_invoice: {
          display_on_invoice: {}
        },

        _group_line_ids: {
          _span: 2,
          line_ids: {
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: {
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
          }
        },
        _group_help: {
          example_amount: { invisible: 1 },
          example_date: { invisible: 1 },
          example_preview: { invisible: 1 },
          _span: 2,
          _html: 1,
          _children: {
            a: 'The Payment Term must have one Balance line.',
            b({ record }) {
              const { example_amount, example_date } = record
              return `For any invoice of ${example_amount} dated ${example_date}`
            },
            c({ record }) {
              const { example_preview } = record
              return `the due date(s) and amount(s) will be: ${example_preview}`
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
    _odoo_model: 'ir.actions',
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
