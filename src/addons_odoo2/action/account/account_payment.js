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
              type: 'object',
              string: 'Confirm'
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
          groups: 'base.group_multi_currency',
          optional: 'hide'
        },
        currency_id: {
          string: 'Payment Currency',
          groups: 'base.group_multi_currency',
          optional: 'hide'
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
          position: 'attributes',
          __todo__string: 'Vendor'
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
          position: 'attributes',
          __todo__string: 'Partner'
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
        string: 'Payment',
        filter_domain: {
          todo_ctx: "['|', '|', '|', '|', ('name', 'ilike', self), ('partner_id', 'ilike', self), ('ref', 'ilike', self), ('amount_company_currency_signed' , 'ilike', self), ('amount', 'ilike', self)]"
        }
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
          domain: [['partner_type', '=', 'customer'], ['is_internal_transfer', '=', false]]
        }
      },
      _filter_outbound_filter: {
        _attr: {
          name: 'outbound_filter',
          string: 'Vendor Payments',
          domain: [['partner_type', '=', 'supplier'], ['is_internal_transfer', '=', false]]
        }
      },
      _filter_transfers_filter: {
        _attr: {
          name: 'transfers_filter',
          string: 'Internal Transfers',
          domain: [['is_internal_transfer', '=', true]]
        }
      },
      _separator_241: {},
      _filter_state_draft: {
        _attr: {
          name: 'state_draft',
          string: 'Draft',
          domain: [['state', '=', 'draft']]
        }
      },
      _filter_state_posted: {
        _attr: {
          name: 'state_posted',
          string: 'Posted',
          domain: [['state', '=', 'posted']]
        }
      },
      _separator_297: {},
      _filter_state_sent: {
        _attr: {
          name: 'state_sent',
          string: 'Sent',
          domain: [['is_move_sent', '=', true]]
        }
      },
      _filter_matched: {
        _attr: {
          name: 'matched',
          string: 'Bank Matched',
          domain: [['is_matched', '=', true]]
        }
      },
      _filter_reconciled: {
        _attr: {
          name: 'reconciled',
          string: 'Reconciled',
          domain: [['is_reconciled', '=', true]]
        }
      },
      _separator_896: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Payment Date',
          date: 'date'
        }
      },
      _separator_971: {},
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
      _separator_337: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
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
      header: {
        _button_action_post: {
          _attr: {
            name: 'action_post',
            type: 'object',
            string: 'Confirm',
            invisible: [['state', '!=', 'draft']],
            class: 'oe_highlight'
          }
        },
        _button_action_draft: {
          _attr: {
            name: 'action_draft',
            type: 'object',
            string: 'Reset To Draft',
            groups: 'account.group_account_invoice',
            invisible: [['state', 'not in', ('posted', 'cancel')]],
            class: 'btn btn-secondary'
          }
        },
        _button_action_cancel: {
          _attr: {
            name: 'action_cancel',
            type: 'object',
            string: 'Cancel',
            invisible: [['state', '!=', 'draft']]
          }
        },
        _button_mark_as_sent: {
          _attr: {
            name: 'mark_as_sent',
            type: 'object',
            string: 'Mark as Sent',
            invisible: ['|', '|', ['state', '!=', 'posted'], ['is_move_sent', '=', true], ['payment_method_code', '!=', 'manual']]
          }
        },
        _button_unmark_as_sent: {
          _attr: {
            name: 'unmark_as_sent',
            type: 'object',
            string: 'Unmark as Sent',
            invisible: ['|', '|', ['state', '!=', 'posted'], ['is_move_sent', '=', false], ['payment_method_code', '!=', 'manual']]
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,posted'
        }
      },
      sheet: {
        _div: {
          _attr: {
            invisible: ['|', '|', ['paired_internal_transfer_payment_id', '!=', false], ['is_internal_transfer', '=', false], ['state', '!=', 'draft']],
            class: 'alert alert-info text-center',
            text: 'A second payment will be created automatically in the destination journal.'
          }
        },
        _div_832: {
          _attr: {
            invisible: ['|', '|', ['is_internal_transfer', '=', false], ['require_partner_bank_account', '=', false], ['partner_bank_id', '!=', false]],
            class: 'alert alert-warning text-center',
            text: 'The selected payment method requires a bank account but none is set on'
          },
          _button_action_open_destination_journal: {
            _attr: {
              name: 'action_open_destination_journal',
              type: 'object',
              class: 'oe_link alert-link',
              text: 'the destination journal'
            }
          }
        },
        _div_138: {
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
              type: 'object',
              icon: 'fa-bars',
              invisible: [['reconciled_invoices_count', '=', 0]],
              class: 'oe_stat_button'
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
                    invisible: [['reconciled_invoices_type', '!=', 'invoice']],
                    text: 'Invoice'
                  }
                },
                _span_626: {
                  _attr: {
                    invisible: [['reconciled_invoices_type', '=', 'invoice']],
                    text: 'Credit Note'
                  }
                }
              }
            }
          },
          _button_button_open_bills: {
            _attr: {
              name: 'button_open_bills',
              type: 'object',
              icon: 'fa-bars',
              invisible: [['reconciled_bills_count', '=', 0]],
              class: 'oe_stat_button'
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
              type: 'object',
              icon: 'fa-bars',
              invisible: [['reconciled_statement_lines_count', '=', 0]],
              class: 'oe_stat_button'
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
              type: 'object',
              icon: 'fa-bars',
              class: 'oe_stat_button'
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
            bg_color: 'bg-info',
            invisible: [['state', '!=', 'invoicing_legacy']]
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            _attr: {
              invisible: [['state', '!=', 'draft']]
            },
            _span: 'Draft'
          },
          _h1_417: {
            _attr: {
              invisible: [['state', '=', 'draft']]
            },
            name: {
              readonly: '1'
            }
          }
        },
        _group: {
          _group_group1: {
            _attr: {
              name: 'group1'
            },
            is_internal_transfer: {
              readonly: [['state', '!=', 'draft']]
            },
            payment_type: {
              widget: 'radio',
              readonly: [['state', '!=', 'draft']],
              horizontal: true
            },
            partner_id: {
              string: 'Customer',
              readonly: [['state', '!=', 'draft']],
              invisible: ['|', ['partner_type', '!=', 'customer'], ['is_internal_transfer', '=', true]],
              context: {
                default_is_company: true
              },
              no_quick_create: true
            },
            _field_partner_id_348: {
              partner_id: {
                string: 'Vendor',
                readonly: [['state', '!=', 'draft']],
                invisible: ['|', ['partner_type', '!=', 'supplier'], ['is_internal_transfer', '=', true]],
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
                readonly: [['state', '!=', 'draft']]
              },
              currency_id: {
                groups: 'base.group_multi_currency',
                readonly: [['state', '!=', 'draft']],
                required: '1',
                no_create: true,
                no_open: true
              }
            },
            date: {
              readonly: [['state', '!=', 'draft']]
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
              readonly: [['state', '!=', 'draft']]
            },
            payment_method_line_id: {
              readonly: [['state', '!=', 'draft']],
              required: '1',
              no_create: true,
              no_open: true
            },
            partner_bank_id: {
              string: 'Customer Bank Account',
              invisible: ['|', '|', '|', ['show_partner_bank_account', '=', false], ['partner_type', '!=', 'customer'], ['is_internal_transfer', '=', true], ['payment_type', '=', 'inbound']],
              required: [['require_partner_bank_account', '=', true], ['is_internal_transfer', '=', false]],
              context: {
                todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
              }
            },
            _field_partner_bank_id_954: {
              partner_bank_id: {
                string: 'Vendor Bank Account',
                invisible: ['|', '|', '|', ['show_partner_bank_account', '=', false], ['partner_type', '!=', 'supplier'], ['is_internal_transfer', '=', true], ['payment_type', '=', 'inbound']],
                required: [['require_partner_bank_account', '=', true], ['is_internal_transfer', '=', false]],
                context: {
                  todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
                }
              }
            },
            _field_partner_bank_id_782: {
              partner_bank_id: {
                string: 'Company Bank Account',
                invisible: ['|', '|', ['show_partner_bank_account', '=', false], ['is_internal_transfer', '=', true], ['payment_type', '=', 'outbound']],
                required: [['require_partner_bank_account', '=', true], ['is_internal_transfer', '=', false]],
                context: {
                  todo_ctx: "{'default_partner_id': partner_id, 'default_allow_out_payment': True}"
                }
              }
            },
            destination_journal_id: {
              invisible: [['is_internal_transfer', '=', false]],
              readonly: [['state', '!=', 'draft']],
              required: [['is_internal_transfer', '=', true], ['state', '=', 'draft']],
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
                invisible: [['qr_code', '=', false]],
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
    search_view_id: 'tooooooodoooooo',
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
    search_view_id: 'tooooooodoooooo',
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
    search_view_id: 'tooooooodoooooo',
    domain: '[]',
    context: {
      default_payment_type: 'outbound',
      search_default_transfers_filter: 1
    },
    views: {
      tree: 'view_account_supplier_payment_tree',
      form: '=======todo=========='
    }
  },

  action_account_confirm_payments: {
    _odoo_model: 'ir.actions.server',
    type: 'ir.actions.server',
    model_id: 'account.model_account_payment',
    model: 'account_payment'
  }
}
