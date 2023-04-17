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
          domain: "[('active', '=', False)]"
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
            attrs: {
              invisible: "[('active', '=', True)]"
            },
            title: 'Archived'
          }
        },
        _group: {
          _group: {
            name: {}
          },
          _group_474: {
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          }
        },
        _group_667: {
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
                    attrs: {
                      invisible: "[('value', '=', 'balance')]"
                    },
                    digits: '[2, 2]'
                  },
                  months: {},
                  days: {},
                  end_month: {
                    widget: 'boolean_toggle'
                  },
                  days_after: {
                    attrs: {
                      invisible: "[('end_month', '=', False)]"
                    }
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
              attrs: {
                invisible: "[('example_invalid', '=', False)]"
              },
              text: 'The Payment Term must have one Balance line.'
            }
          },
          _div_394: {
            _attr: {
              attrs: {
                invisible: "[('example_invalid', '=', True)]"
              },
              class: 'd-flex',
              text: 'For any invoice of'
            },
            _span: {
              _attr: {
                class: 'mx-1'
              }
            },
            example_amount: {},
            _span_638: {
              _attr: {
                class: 'mx-1'
              }
            },
            _span_977: {
              _attr: {
                class: 'mx-1'
              }
            },
            example_date: {
              class: 'oe_inline'
            }
          },
          example_preview: {
            attrs: {
              invisible: "[('example_invalid', '=', True)]"
            }
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
