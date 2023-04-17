export default {
  partner_view_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_partner_invoices: {
            _attr: {
              name: 'action_view_partner_invoices',
              groups: 'account.group_account_invoice,account.group_account_readonly',
              context: {
                todo_ctx: "{'default_partner_id': active_id}"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-pencil-square-o'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                currency_id: {
                  invisible: '1'
                },
                total_invoiced: {
                  widget: 'monetary',
                  currency_field: 'currency_id'
                }
              },
              _span_825: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Invoiced'
                }
              }
            }
          }
        },
        _page_internal_notes: {
          _attr: {
            name: 'internal_notes'
          },
          _group: {
            _attr: {
              groups: 'account.group_account_invoice,account.group_account_readonly'
            },
            _group: {
              _attr: {
                groups: 'account.group_warning_account'
              },
              _separator: {
                _attr: {
                  string: 'Warning on the Invoice'
                }
              },
              invoice_warn: {},
              invoice_warn_msg: {
                attrs: {
                  required: "[('invoice_warn', '!=', False), ('invoice_warn', '!=', 'no-message')]",
                  invisible: "[('invoice_warn', 'in', (False, 'no-message'))]"
                },
                placeholder: 'Type a message...'
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
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//sheet',
            position: 'before'
          },
          _div: {
            _attr: {
              groups: 'account.group_account_invoice,account.group_account_readonly',
              attrs: {
                invisible: "[('duplicated_bank_account_partners_count', '=', 0)]"
              },
              class: 'alert alert-warning',
              text: 'One or more Bank Accounts set on this partner are also used by other'
            },
            _bold: {
              _button_action_view_partner_with_same_bank: {
                _attr: {
                  name: 'action_view_partner_with_same_bank',
                  string: 'Partners',
                  class: 'alert-link',
                  type: 'object'
                }
              }
            }
          }
        },
        _page_sales_purchases: {
          _attr: {
            name: 'sales_purchases'
          },
          _page_accounting: {
            _attr: {
              name: 'accounting',
              string: 'Invoicing',
              groups: 'account.group_account_invoice,account.group_account_readonly',
              attrs: {
                invisible: "[('is_company', '=', False), ('parent_id', '!=', False)]"
              }
            },
            duplicated_bank_account_partners_count: {
              invisible: '1'
            },
            show_credit_limit: {
              invisible: '1'
            },
            _group: {
              _group_banks: {
                _attr: {
                  name: 'banks',
                  string: 'Bank Accounts',
                  groups: 'account.group_account_invoice,account.group_account_readonly'
                },
                bank_ids: {
                  context: {
                    default_allow_out_payment: true
                  },
                  views: {
                    tree: {
                      arch: {
                        sheet: {
                          sequence: {
                            widget: 'handle'
                          },
                          bank_id: {},
                          acc_number: {},
                          allow_out_payment: {
                            widget: 'boolean_toggle'
                          },
                          acc_holder_name: {
                            invisible: '1'
                          }
                        }
                      }
                    }
                  }
                },
                _button_base__action_res_partner_bank_account_form: {
                  _attr: {
                    name: 'base.action_res_partner_bank_account_form',
                    string: 'View accounts detail',
                    context: {
                      todo_ctx: "{'search_default_partner_id': active_id, 'default_partner_id': active_id}"
                    },
                    class: 'btn-link',
                    type: 'action'
                  }
                }
              },
              _group_accounting_entries: {
                _attr: {
                  name: 'accounting_entries',
                  string: 'Accounting Entries',
                  groups: 'account.group_account_readonly'
                },
                currency_id: {
                  invisible: '1'
                },
                property_account_receivable_id: {},
                property_account_payable_id: {}
              },
              _group_credit_limits: {
                _attr: {
                  name: 'credit_limits',
                  string: 'Credit Limits',
                  groups: 'account.group_account_invoice,account.group_account_readonly',
                  attrs: {
                    invisible: "[('show_credit_limit', '=', False)]"
                  }
                },
                credit: {},
                _label_use_partner_credit_limit: {
                  for: 'use_partner_credit_limit'
                },
                _div: {
                  _attr: {
                    class: 'o_row'
                  },
                  use_partner_credit_limit: {},
                  credit_limit: {
                    attrs: {
                      invisible: "[('use_partner_credit_limit', '=', False)]"
                    },
                    class: 'oe_inline'
                  }
                }
              }
            }
          },
          _page_accounting_disabled: {
            _attr: {
              name: 'accounting_disabled',
              string: 'Invoicing',
              groups: 'account.group_account_invoice,account.group_account_readonly',
              attrs: {
                invisible: "['|', ('is_company', '=', True), ('parent_id', '=', False)]"
              }
            },
            _div: {
              _p: {
                _attr: {
                  text: 'Accounting-related settings are managed on'
                },
                _button_open_commercial_entity: {
                  _attr: {
                    name: 'open_commercial_entity',
                    string: 'the parent company',
                    class: 'oe_link',
                    type: 'object'
                  }
                }
              }
            }
          }
        },
        _xpath_622: {
          _attr: {
            expr: "//group[@name='misc']",
            position: 'before'
          },
          _group_fiscal_information: {
            _attr: {
              name: 'fiscal_information',
              string: 'Fiscal Information',
              groups: 'account.group_account_invoice,account.group_account_readonly'
            },
            property_account_position_id: {
              no_create: true,
              no_open: true
            }
          }
        },
        _group_sale: {
          _attr: {
            name: 'sale'
          },
          property_payment_term_id: {
            string: 'Payment Terms',
            groups: 'account.group_account_invoice,account.group_account_readonly',
            no_open: true,
            no_create: true
          }
        },
        _group_purchase: {
          _attr: {
            name: 'purchase'
          },
          property_supplier_payment_term_id: {
            string: 'Payment Terms',
            groups: 'account.group_account_invoice,account.group_account_readonly',
            no_open: true,
            no_create: true
          }
        }
      }
    }
  },

  res_partner_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_res_partner_filter',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='inactive']",
            position: 'before'
          },
          _filter_customer: {
            _attr: {
              name: 'customer',
              string: 'Customer Invoices',
              domain: "[('customer_rank', '>', 0)]"
            }
          },
          _filter_supplier: {
            _attr: {
              name: 'supplier',
              string: 'Vendor Bills',
              domain: "[('supplier_rank', '>', 0)]"
            }
          },
          _separator: {}
        }
      }
    }
  },

  res_partner_action_customer: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Customers',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    context: {
      search_default_customer: 1,
      res_partner_search_mode: 'customer',
      default_is_company: true,
      default_customer_rank: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  res_partner_action_supplier: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendors',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    context: {
      search_default_supplier: 1,
      res_partner_search_mode: 'supplier',
      default_is_company: true,
      default_supplier_rank: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
