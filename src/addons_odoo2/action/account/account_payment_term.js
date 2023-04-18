export default {
  view_payment_term_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'search',
    arch: {
      name: {
        string: 'Payment Terms'
      },
      active: {},
      _separator: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  view_payment_term_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  view_payment_term_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'form',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['active', '=', true]],
            title: 'Archived'
          }
        },
        _group: {
          _group: {
            name: {}
          },
          _group_826: {
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          }
        },
        _group_493: {
          note: {
            placeholder: 'Payment term explanation for the customer...'
          }
        },
        _label_display_on_invoice: {
          for: 'display_on_invoice'
        },
        display_on_invoice: {},
        _separator: {
          _attr: {
            string: 'Terms'
          }
        },
        _p: {
          _attr: {
            class: 'text-muted',
            text: 'The last line's computation type should be "Balance" to ensure that the whole amount will be allocated.'
          }
        },
        line_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  _attr: {
                    string: 'Payment Terms'
                  },
                  value: {
                    string: 'Due Type'
                  },
                  value_amount: {
                    invisible: [['value', '=', 'balance']],
                    digits: '[2, 2]'
                  },
                  months: {},
                  days: {},
                  end_month: {
                    widget: 'boolean_toggle'
                  },
                  days_after: {
                    invisible: [['end_month', '=', false]]
                  },
                  discount_percentage: {},
                  discount_days: {}
                }
              }
            }
          }
        },
        _div: {
          _attr: {
            class: 'oe_edit_only'
          },
          _separator: {
            _attr: {
              string: 'Example'
            }
          },
          example_invalid: {
            invisible: '1'
          },
          _div: {
            _attr: {
              invisible: [['example_invalid', '=', false]],
              text: 'The Payment Term must have one Balance line.'
            }
          },
          _div_599: {
            _attr: {
              invisible: [['example_invalid', '=', true]],
              class: 'd-flex',
              text: 'For any invoice of'
            },
            _span: {
              _attr: {
                class: 'mx-1'
              }
            },
            example_amount: {},
            _span_417: {
              _attr: {
                class: 'mx-1'
              }
            },
            _span_596: {
              _attr: {
                class: 'mx-1'
              }
            },
            example_date: {
              class: 'oe_inline'
            }
          },
          example_preview: {
            invisible: [['example_invalid', '=', true]]
          }
        }
      }
    }
  },

  view_account_payment_term_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.term',
    type: 'otherview',
    arch: {}
  },

  action_payment_term_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Terms',
    search_view_id: 'view_payment_term_search',
    res_model: 'account.payment.term',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
