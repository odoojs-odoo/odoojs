export default {
  view_account_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_post: {
            _attr: {
              name: 'action_post',
              string: 'Confirm',
              type: 'object'
            }
          }
        },
        company_currency_id: {
          invisible: '1'
        },
        date: {},
        name: {},
        journal_id: {},
        payment_method_line_id: {},
        partner_id: {
          string: 'Customer'
        },
        amount_signed: {
          string: 'Amount in Currency',
          groups: 'base.group_multi_currency'
        },
        currency_id: {
          string: 'Payment Currency',
          groups: 'base.group_multi_currency'
        },
        amount_company_currency_signed: {
          string: 'Amount',
          widget: 'monetary'
        },
        state: {
          widget: 'badge'
        }
      }
    }
  },

  view_account_supplier_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    inherit_id: 'account.view_account_payment_tree',
    arch: {
      sheet: {
        partner_id: {
          ===todo===string: 'Vendor'
        }
      }
    }
  },

  view_account_various_payment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    inherit_id: 'account.view_account_payment_tree',
    arch: {
      sheet: {
        partner_id: {
          ===todo===string: 'Partner'
        }
      }
    }
  },

  view_account_payment_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'otherview',
    arch: {}
  },

  view_account_payment_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'search',
    arch: {
      name: {
        string: 'Payment'
      },
      partner_id: {
        string: 'Customer/Vendor'
      },
      journal_id: {},
      is_internal_transfer: {},
      _separator: {},
      _filter_inbound_filter: {
        _attr: {
          name: 'inbound_filter',
          string: 'Customer Payments',
          domain: "[('partner_type', '=', 'customer'), ('is_internal_transfer', '=', False)]"
        }
      },
      _filter_outbound_filter: {
        _attr: {
          name: 'outbound_filter',
          string: 'Vendor Payments',
          domain: "[('partner_type', '=', 'supplier'), ('is_internal_transfer', '=', False)]"
        }
      },
      _filter_transfers_filter: {
        _attr: {
          name: 'transfers_filter',
          string: 'Internal Transfers',
          domain: "[('is_internal_transfer', '=', True)]"
        }
      },
      _separator_190: {},
      _filter_state_draft: {
        _attr: {
          name: 'state_draft',
          string: 'Draft',
          domain: "[('state', '=', 'draft')]"
        }
      },
      _filter_state_posted: {
        _attr: {
          name: 'state_posted',
          string: 'Posted',
          domain: "[('state', '=', 'posted')]"
        }
      },
      _separator_206: {},
      _filter_state_sent: {
        _attr: {
          name: 'state_sent',
          string: 'Sent',
          domain: "[('is_move_sent', '=', True)]"
        }
      },
      _filter_matched: {
        _attr: {
          name: 'matched',
          string: 'Bank Matched',
          domain: "[('is_matched', '=', True)]"
        }
      },
      _filter_reconciled: {
        _attr: {
          name: 'reconciled',
          string: 'Reconciled',
          domain: "[('is_reconciled', '=', True)]"
        }
      },
      _separator_980: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Payment Date'
        }
      },
      _separator_118: {},
      company_id: {
        groups: 'base.group_multi_company'
      },
      _filter_partner: {
        _attr: {
          name: 'partner',
          string: 'Customer/Vendor',
          domain: [],
          context: {
            group_by: 'partner_id'
          }
        }
      },
      _filter_journal: {
        _attr: {
          name: 'journal',
          string: 'Journal',
          domain: [],
          context: {
            group_by: 'journal_id'
          }
        }
      },
      _filter_paymentmethodline: {
        _attr: {
          name: 'paymentmethodline',
          string: 'Payment Method Line',
          domain: [],
          context: {
            group_by: 'payment_method_line_id'
          }
        }
      },
      _filter_state: {
        _attr: {
          name: 'state',
          string: 'Status',
          domain: [],
          context: {
            group_by: 'state'
          }
        }
      },
      _filter_groupby_date: {
        _attr: {
          name: 'groupby_date',
          string: 'Payment Date',
          domain: [],
          context: {
            group_by: 'date'
          }
        }
      },
      _filter_currency: {
        _attr: {
          name: 'currency',
          string: 'Currency',
          groups: 'base.group_multi_currency',
          domain: [],
          context: {
            group_by: 'currency_id'
          }
        }
      },
      _filter_company: {
        _attr: {
          name: 'company',
          string: 'Company',
          groups: 'base.group_multi_company',
          domain: [],
          context: {
            group_by: 'company_id'
          }
        }
      },
      _separator_628: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      }
    }
  },

  view_account_payment_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_action_post: {
            _attr: {
              name: 'action_post',
              string: 'Confirm',
              attrs: {
                invisible: "[('state', '!=', 'draft')]"
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_draft: {
            _attr: {
              name: 'action_draft',
              string: 'Reset To Draft',
              groups: 'account.group_account_invoice',
              attrs: {
                invisible: "[('state', 'not in', ('posted', 'cancel'))]"
              },
              class: 'btn btn-secondary',
              type: 'object'
            }
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              string: 'Cancel',
              attrs: {
                invisible: "[('state', '!=', 'draft')]"
              },
              type: 'object'
            }
          },
          _button_mark_as_sent: {
            _attr: {
              name: 'mark_as_sent',
              string: 'Mark as Sent',
              attrs: {
                invisible: "['|', '|', ('state', '!=', 'posted'), ('is_move_sent', '=', True), ('payment_method_code', '!=', 'manual')]"
              },
              type: 'object'
            }
          },
          _button_unmark_as_sent: {
            _attr: {
              name: 'unmark_as_sent',
              string: 'Unmark as Sent',
              attrs: {
                invisible: "['|', '|', ('state', '!=', 'posted'), ('is_move_sent', '=', False), ('payment_method_code', '!=', 'manual')]"
              },
              type: 'object'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        _div: {
          _attr: {
            attrs: {
              invisible: "['|', '|', ('paired_internal_transfer_payment_id', '!=', False), ('is_internal_transfer', '=', False), ('state', '!=', 'draft')]"
            },
            class: 'alert alert-info text-center',
            text: 'A second payment will be created automatically in the destination journal.'
          }
        },
        _div_550: {
          _attr: {
            attrs: {
              invisible: "['|', '|', ('is_internal_transfer', '=', False), ('require_partner_bank_account', '=', False), ('partner_bank_id', '!=', False)]"
            },
            class: 'alert alert-warning text-center',
            text: 'The selected payment method requires a bank account but none is set on'
          },
          _button_action_open_destination_journal: {
            _attr: {
              name: 'action_open_destination_journal',
              class: 'oe_link alert-link',
              type: 'object',
              text: 'the destination journal'
            }
          }
        },
        _div_997: {
          _attr: {
            class: 'o_attachment_preview'
          }
        },
        id: {
          invisible: '1'
        },
        is_move_sent: {
          invisible: '1'
        },
        is_reconciled: {
          invisible: '1'
        },
        is_matched: {
          invisible: '1'
        },
        payment_method_code: {
          invisible: '1'
        },
        show_partner_bank_account: {
          invisible: '1'
        },
        require_partner_bank_account: {
          invisible: '1'
        },
        available_payment_method_line_ids: {
          invisible: '1'
        },
        available_partner_bank_ids: {
          invisible: '1'
        },
        suitable_journal_ids: {
          invisible: '1'
        },
        country_code: {
          invisible: '1'
        },
        partner_type: {
          invisible: '1'
        },
        posted_before: {
          invisible: '1'
        },
        reconciled_invoices_type: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        paired_internal_transfer_payment_id: {
          invisible: '1'
        },
        available_journal_ids: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_button_open_invoices: {
            _attr: {
              name: 'button_open_invoices',
              attrs: {
                invisible: "[('reconciled_invoices_count', '=', 0)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_text'
                },
                reconciled_invoices_count: {},
                _span: {
                  _attr: {
                    attrs: {
                      invisible: "[('reconciled_invoices_type', '!=', 'invoice')]"
                    },
                    text: 'Invoice'
                  }
                },
                _span_375: {
                  _attr: {
                    attrs: {
                      invisible: "[('reconciled_invoices_type', '=', 'invoice')]"
                    },
                    text: 'Credit Note'
                  }
                }
              }
            }
          },
          _button_button_open_bills: {
            _attr: {
              name: 'button_open_bills',
              attrs: {
                invisible: "[('reconciled_bills_count', '=', 0)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_text'
                },
                reconciled_bills_count: {},
                _span: 'Bill'
              }
            }
          },
          _button_button_open_statement_lines: {
            _attr: {
              name: 'button_open_statement_lines',
              attrs: {
                invisible: "[('reconciled_statement_lines_count', '=', 0)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
              reconciled_statement_lines_count: {},
              _span: 'Transaction'
            }
          },
          _button_button_open_journal_entry: {
            _attr: {
              name: 'button_open_journal_entry',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            },
            _div: {
              _attr: {
                class: 'o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Journal Entry'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            attrs: {
              invisible: "[('state', '!=', 'invoicing_legacy')]"
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            _attr: {
              attrs: {
                invisible: "[('state', '!=', 'draft')]"
              }
            },
            _span: 'Draft'
          },
          _h1_720: {
            _attr: {
              attrs: {
                invisible: "[('state', '=', 'draft')]"
              }
            },
            name: {}
          }
        },
        _group: {
          _group_group1: {
            _attr: {
              name: 'group1'
            },
            is_internal_transfer: {
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              }
            },
            payment_type: {
              widget: 'radio',
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              },
              horizontal: true
            },
            partner_id: {
              string: 'Customer',
              attrs: {
                readonly: "[('state', '!=', 'draft')]",
                invisible: "['|', ('partner_type', '!=', 'customer'), ('is_internal_transfer', '=', True)]"
              },
              context: {
                default_is_company: true
              },
              no_quick_create: true
            },
            _field_partner_id_796: {
              partner_id: {
                string: 'Vendor',
                attrs: {
                  readonly: "[('state', '!=', 'draft')]",
                  invisible: "['|', ('partner_type', '!=', 'supplier'), ('is_internal_transfer', '=', True)]"
                },
                context: {
                  default_is_company: true
                },
                no_quick_create: true
              }
            },
            _label_amount: {
              for: 'amount'
            },
            _div_amount_div: {
              _attr: {
                name: 'amount_div',
                class: 'o_row'
              },
              amount: {
                attrs: {
                  readonly: "[('state', '!=', 'draft')]"
                }
              },
              currency_id: {
                groups: 'base.group_multi_currency',
                attrs: {
                  readonly: "[('state', '!=', 'draft')]"
                },
                no_create: true,
                no_open: true
              }
            },
            date: {
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              }
            },
            ref: {
              string: 'Memo'
            }
          },
          _group_group2: {
            _attr: {
              name: 'group2'
            },
            journal_id: {
              domain: {
                todo_ctx: "[('id', 'in', available_journal_ids)]"
              },
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              }
            },
            payment_method_line_id: {
              attrs: {
                readonly: "[('state', '!=', 'draft')]"
              },
              no_create: true,
              no_open: true
            },
            partner_bank_id: {
              string: 'Customer Bank Account',
              attrs: {
                invisible: "['|', '|', '|', ('show_partner_bank_account', '=', False), ('partner_type', '!=', 'customer'), ('is_internal_transfer', '=', True), ('payment_type', '=', 'inbound')]",
                required: "[('require_partner_bank_account', '=', True), ('is_internal_transfer', '=', False)]"
              },
              context: {
                todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
              }
            },
            _field_partner_bank_id_549: {
              partner_bank_id: {
                string: 'Vendor Bank Account',
                attrs: {
                  invisible: "['|', '|', '|', ('show_partner_bank_account', '=', False), ('partner_type', '!=', 'supplier'), ('is_internal_transfer', '=', True), ('payment_type', '=', 'inbound')]",
                  required: "[('require_partner_bank_account', '=', True), ('is_internal_transfer', '=', False)]"
                },
                context: {
                  todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
                }
              }
            },
            _field_partner_bank_id_873: {
              partner_bank_id: {
                string: 'Company Bank Account',
                attrs: {
                  invisible: "['|', '|', ('show_partner_bank_account', '=', False), ('is_internal_transfer', '=', True), ('payment_type', '=', 'outbound')]",
                  required: "[('require_partner_bank_account', '=', True), ('is_internal_transfer', '=', False)]"
                },
                context: {
                  todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
                }
              }
            },
            destination_journal_id: {
              attrs: {
                invisible: "[('is_internal_transfer', '=', False)]",
                readonly: "[('state', '!=', 'draft')]",
                required: "[('is_internal_transfer', '=', True), ('state', '=', 'draft')]"
              },
              context: {
                todo_ctx: "{'default_partner_id': partner_id}"
              }
            }
          },
          _group: {
            qr_code: {
              invisible: '1'
            },
            _div: {
              _attr: {
                attrs: {
                  invisible: "[('qr_code', '=', False)]"
                },
                class: 'text-center'
              },
              qr_code: {
                widget: 'html'
              }
            }
          }
        }
      }
    }
  },

  view_account_payment_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment',
    type: 'otherview',
    arch: {}
  },

  action_account_payments: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payments',
    res_model: 'account.payment',
    context: {
      default_payment_type: 'inbound',
      default_partner_type: 'customer',
      search_default_inbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    },
    views: {
      tree: 'view_account_payment_tree',
      form: '=======todo=========='
    }
  },

  action_account_payments_payable: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payments',
    res_model: 'account.payment',
    context: {
      default_payment_type: 'outbound',
      default_partner_type: 'supplier',
      search_default_outbound_filter: 1,
      default_move_journal_types: ['bank', 'cash']
    },
    views: {
      tree: 'view_account_supplier_payment_tree',
      form: '=======todo=========='
    }
  },

  action_account_payments_transfer: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Internal Transfers',
    res_model: 'account.payment',
    domain: '[]',
    context: {
      default_payment_type: 'outbound',
      search_default_transfers_filter: 1
    },
    views: {
      tree: 'view_account_supplier_payment_tree',
      form: '=======todo=========='
    }
  }
}
