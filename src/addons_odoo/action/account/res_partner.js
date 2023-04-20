export default {
  res_partner_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_res_partner_filter',
    type: 'search',
    arch: {
      filters: {
        group_type: {},

        group_sell_purchase: {
          customer: { string: '客户', domain: [['customer_rank', '>', 0]] },
          supplier: { string: '供应商', domain: [['supplier_rank', '>', 0]] }
        }
      }
    }
  },

  partner_view_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_first: {
          _attr: {
            invisible: 1,
            help: '占位置用, 后续继承, 插入数据定位用'
          }
        },

        _div_button_box: {
          _button_action_view_partner_invoices: {
            _attr: {
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              type: 'object',
              class: 'oe_stat_button',
              icon: 'fa-pencil-square-o',
              name: 'action_view_partner_invoices',
              context({ active_id }) {
                //  context="{'default_partner_id': active_id}"
                return {
                  default_partner_id: active_id
                }
              }
            },
            currency_id: { invisible: '1' },
            total_invoiced: { widget: 'monetary', string: 'Invoiced' }
          }
        },

        _notebook: {
          _page_internal_notes: {
            _group_invoice: {
              _attr: {
                groups:
                  'account.group_account_invoice,account.group_account_readonly,account.group_warning_account'
              },
              _group_invoice2: {
                _attr: {
                  groups: 'account.group_warning_account'
                },
                _separator: { _attr: { string: 'Warning on the Invoice' } },
                invoice_warn: {},
                invoice_warn_msg: {
                  nolabel: '1',

                  invisible: ({ record }) => {
                    // 'invisible':[('invoice_warn','in',(False,'no-message'))]
                    const { invoice_warn } = record
                    return !invoice_warn || invoice_warn === 'no-message'
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    inherit_id: 'base.view_partner_form',

    arch: {
      sheet: {
        _div_first: {},
        _div_alert_duplicated_bank_account_partners_count: {
          _attr: {
            groups:
              'account.group_account_invoice,account.group_account_readonly',
            invisible({ record }) {
              // {'invisible': [('duplicated_bank_account_partners_count', '=', 0)]}">
              const { duplicated_bank_account_partners_count } = record
              return !duplicated_bank_account_partners_count
            }
          },
          _span_1: {
            _attr: {
              text: ' One or more Bank Accounts set on this partner are also used by other '
            }
          },
          _bold: {
            _button: {
              _attr: {
                type: 'object',
                name: 'action_view_partner_with_same_bank',
                role: 'button',
                string: 'Partners'
              }
            }
          },
          _span_3: {
            _attr: {
              text: '. Please make sure that this is a wanted behavior.'
            }
          }
          //
        },

        _notebook: {
          _page_sales_purchases: {},
          _page_accounting: {
            _attr: {
              string: 'Invoicing',
              name: 'accounting',
              groups:
                'account.group_account_invoice,account.group_account_readonly',
              invisible: ({ record }) => {
                // 'invisible': [('is_company','=',False),
                // ('parent_id','!=',False)]
                const { is_company, parent_id } = record
                return !is_company && !parent_id
              }
            },
            duplicated_bank_account_partners_count: { invisible: '1' },
            show_credit_limit: { invisible: '1' },
            _group_accounting: {
              _group_banks: {
                _attr: {
                  string: 'Bank Accounts',
                  name: 'banks',
                  groups:
                    'account.group_account_invoice,account.group_account_readonly'
                },

                bank_ids: {
                  nolabel: '1',
                  widget: 'x2many_tree',
                  context: { default_allow_out_payment: true },
                  views: {
                    tree: {
                      arch: {
                        sheet: {
                          sequence: { widget: 'handle' },
                          bank_id: {},
                          acc_number: {},
                          allow_out_payment: { widget: 'boolean_toggle' },
                          acc_holder_name: { invisible: '1' }
                        }
                      }
                    },
                    form: {
                      arch: {
                        sheet: {
                          sequence: { widget: 'handle' },
                          bank_id: {},
                          acc_number: {},
                          allow_out_payment: { widget: 'boolean_toggle' },
                          acc_holder_name: { invisible: '1' }
                        }
                      }
                    }
                  }
                },

                _button: {
                  _attr: {
                    type: 'action',
                    string: 'View accounts detail',
                    name: 'base.action_res_partner_bank_account_form',
                    context({ active_id }) {
                      return {
                        search_default_partner_id: active_id,
                        default_partner_id: active_id
                      }
                    }
                  }
                }
              },
              _group_accounting_entries: {
                _attr: {
                  string: 'Accounting Entries',
                  name: 'accounting_entries',
                  groups: 'account.group_account_readonly'
                },
                currency_id: { invisible: '1' },
                property_account_receivable_id: {},
                property_account_payable_id: {}
              },
              _group_credit_limits: {
                _attr: {
                  string: 'Credit Limits',
                  name: 'credit_limits',
                  groups:
                    'account.group_account_invoice,account.group_account_readonly',

                  invisible: ({ record }) => {
                    // 'invisible': [('show_credit_limit', '=', False)]
                    const { show_credit_limit } = record
                    return !show_credit_limit
                  }
                },

                credit: {},
                use_partner_credit_limit: {},
                credit_limit: {
                  invisible: ({ record }) => {
                    // 'invisible': [('use_partner_credit_limit', '=', False)]
                    const { use_partner_credit_limit } = record
                    return !use_partner_credit_limit
                  }
                }
              }
            }
          }
        }

        // _group_sales_purchases__sale: {
        //   property_payment_term_id: {
        //     groups:
        //       'account.group_account_invoice,account.group_account_readonly'
        //   }
        // },
        // _group_sales_purchases__purchase: {
        //   property_supplier_payment_term_id: {
        //     groups:
        //       'account.group_account_invoice,account.group_account_readonly'
        //   }
        // },
        // _group_sales_purchases__fiscal_information: {
        //   property_account_position_id: {
        //     groups:
        //       'account.group_account_invoice,account.group_account_readonly'
        //   }
        // },
        // _group_sales_purchases__misc: {},
      }
    }
  },

  res_partner_action_customer: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Customers',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_customer: 1,
      res_partner_search_mode: 'customer',
      default_is_company: true,
      default_customer_rank: 1
    },
    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  },

  res_partner_action_supplier: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendors',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_supplier: 1,
      res_partner_search_mode: 'supplier',
      default_is_company: true,
      default_supplier_rank: 1
    },
    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  }
}
