export default {
  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        parent_state: { invisible: '1' },
        _group: {
          name: {},
          partner_id: {
            domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]],
            readonly: '1'
          }
        },
        _notebook: {
          _page_information: {
            _attr: {
              name: 'information',
              string: 'Information'
            },
            _group: {
              _group: {
                _attr: { string: 'Amount' },
                account_id: {
                  domain: { todo_ctx: "[('company_id', '=', company_id)]" },
                  readonly: '1',
                  no_create: true
                },
                debit: { readonly: '1' },
                credit: { readonly: '1' },
                balance: { readonly: '1' },
                quantity: { readonly: '1' }
              },
              _group_905: {
                _attr: { string: 'Accounting Documents' },
                move_id: { readonly: '1' },
                statement_line_id: {
                  invisible: [['statement_line_id', '=', false]],
                  readonly: 'True'
                }
              },
              _group_725: {
                _attr: { string: 'Dates' },
                date: { groups: 'account.group_account_readonly' },
                date_maturity: {}
              },
              _group_466: {
                _attr: {
                  string: 'Taxes',
                  invisible: [['tax_line_id', '=', false], ['tax_ids', '=', []]]
                },
                tax_line_id: {
                  invisible: [['tax_line_id', '=', false]],
                  readonly: '1'
                },
                tax_ids: {
                  widget: 'many2many_tags',
                  invisible: [['tax_ids', '=', []]],
                  readonly: '1'
                },
                tax_tag_invert: {
                  groups: 'base.group_no_one',
                  readonly: '1'
                },
                tax_audit: {}
              },
              _group_697: {
                _attr: {
                  string: 'Matching',
                  invisible: [['matched_debit_ids', '=', []], ['matched_credit_ids', '=', []]]
                },
                _label_full_reconcile_id: { for: 'full_reconcile_id' },
                _div: {
                  full_reconcile_id: { invisible: [['full_reconcile_id', '=', false]] },
                  matched_debit_ids: { invisible: '1' },
                  matched_credit_ids: { invisible: '1' },
                  _button_open_reconcile_view: {
                    _attr: {
                      name: 'open_reconcile_view',
                      type: 'object',
                      string: '-> View partially reconciled entries',
                      invisible: ['|', ['full_reconcile_id', '!=', false], '&', ['matched_debit_ids', '=', []], ['matched_credit_ids', '=', []]],
                      class: 'oe_link'
                    }
                  }
                }
              },
              _group_822: {
                _attr: {
                  string: 'Currency',
                  groups: 'base.group_multi_currency'
                },
                currency_id: { invisible: '1' },
                amount_currency: {}
              },
              _group_863: {
                _attr: {
                  string: 'Product',
                  invisible: [['product_id', '=', false]]
                },
                product_id: { readonly: '1' }
              },
              _group_678: {
                _attr: { string: 'States' },
                blocked: {}
              },
              _group_614: {
                _attr: {
                  string: 'Analytic',
                  groups: 'analytic.group_analytic_accounting'
                },
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  groups: 'analytic.group_analytic_accounting',
                  readonly: '1'
                }
              }
            }
          },
          _page_analytic_lines: {
            _attr: {
              name: 'analytic_lines',
              string: 'Analytic Lines',
              groups: 'analytic.group_analytic_accounting'
            },
            date: { invisible: '1' },
            analytic_line_ids: {
              context: { todo_ctx: "{'tree_view_ref':'analytic.view_account_analytic_line_tree', 'default_general_account_id':account_id, 'default_name': name, 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}" }
            }
          }
        }
      }
    }
  },

  account_move_line_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'otherview',
    arch: {}
  },

  account_move_line_view_kanban_mobile: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account_move_line_view_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//kanban[hasclass('o_kanban_mobile')]",
            position: 'attributes'
          },
          _attribute_create: {
            _attr: {
              name: 'create',
              text: 'true',
              create: 'true'
            }
          }
        }
      }
    }
  },

  view_move_line_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'otherview',
    arch: {}
  },

  view_move_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'tree',
    arch: {
      sheet: {
        move_id: { invisible: '1' },
        date: { readonly: '1' },
        company_id: { invisible: '1' },
        _field_company_id_600: {
          company_id: {
            groups: 'base.group_multi_company',
            readonly: '1',
            optional: 'hide'
          }
        },
        journal_id: {
          readonly: '1',
          optional: 'hide',
          no_open: true
        },
        move_name: {
          string: 'Journal Entry',
          widget: 'open_move_widget'
        },
        account_id: {
          groups: 'account.group_account_readonly',
          domain: { todo_ctx: "[('company_id', '=', company_id)]" },
          no_open: true,
          no_create: true
        },
        partner_id: {
          readonly: [['move_type', '!=', 'entry']],
          optional: 'show'
        },
        ref: {
          readonly: 'False',
          optional: 'hide'
        },
        product_id: {
          readonly: '1',
          optional: 'hide'
        },
        name: { optional: 'show' },
        tax_ids: {
          widget: 'many2many_tags',
          readonly: '1',
          optional: 'hide'
        },
        amount_currency: {
          groups: 'base.group_multi_currency',
          invisible: [['is_same_currency', '=', true]],
          readonly: '1',
          optional: 'show'
        },
        currency_id: {
          string: 'Currency',
          groups: 'base.group_multi_currency',
          invisible: [['is_same_currency', '=', true]],
          readonly: '1',
          optional: 'hide'
        },
        debit: { readonly: '1' },
        credit: { readonly: '1' },
        tax_tag_ids: {
          string: 'Tax Grids',
          widget: 'many2many_tags',
          optional: 'hide'
        },
        discount_date: {
          string: 'Discount Date',
          optional: 'hide'
        },
        discount_amount_currency: {
          string: 'Discount Amount',
          optional: 'hide'
        },
        tax_line_id: {
          string: 'Originator Tax',
          readonly: '1',
          optional: 'hide'
        },
        date_maturity: {
          readonly: '1',
          optional: 'hide'
        },
        balance: {
          readonly: '1',
          optional: 'hide'
        },
        matching_number: {
          readonly: '1',
          optional: 'show'
        },
        amount_residual: {
          string: 'Residual',
          invisible: [['is_account_reconcile', '=', false]],
          readonly: '1',
          optional: 'hide'
        },
        amount_residual_currency: {
          string: 'Residual in Currency',
          invisible: ['|', ['is_same_currency', '=', true], ['is_account_reconcile', '=', false]],
          readonly: '1',
          optional: 'hide'
        },
        analytic_distribution: {
          widget: 'analytic_distribution',
          groups: 'analytic.group_analytic_accounting',
          optional: 'show',
          product_field: 'product_id',
          account_field: 'account_id',
          force_applicability: 'optional'
        },
        move_type: { invisible: '1' },
        parent_state: { invisible: '1' },
        account_type: { invisible: '1' },
        statement_line_id: { invisible: '1' },
        company_currency_id: { invisible: '1' },
        is_same_currency: { invisible: '1' },
        is_account_reconcile: { invisible: '1' },
        sequence: { invisible: '1' },
        _groupby_partner_id: {
          _attr: { name: 'partner_id' },
          _button_edit: {
            _attr: {
              name: 'edit',
              type: 'edit',
              title: 'Edit',
              icon: 'fa-edit'
            }
          }
        }
      }
    }
  },

  view_move_line_tree_grouped_sales_purchases: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        date: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        tax_tag_ids: {
          position: 'attributes',
          __todo__optional: 'show'
        }
      }
    }
  },

  view_move_line_tree_grouped_bank_cash: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        date: {
          position: 'attributes',
          __todo__optional: 'hide'
        }
      }
    }
  },

  view_move_line_tree_grouped_misc: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        date: {
          position: 'attributes',
          __todo__optional: 'hide'
        }
      }
    }
  },

  view_move_line_tree_grouped_general: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        account_id: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        balance: {
          position: 'attributes',
          __todo__optional: 'show'
        }
      }
    }
  },

  view_move_line_tree_grouped_partner: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        partner_id: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        date_maturity: {
          position: 'attributes',
          __todo__optional: 'show'
        },
        balance: {
          position: 'attributes',
          __todo__optional: 'show'
        }
      }
    }
  },

  view_move_line_tax_audit_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    inherit_id: 'account.view_move_line_tree',
    arch: {
      sheet: {
        matching_number: {
          position: 'replace',
          __todo__replace: {
            tax_line_id: { string: 'Tax' },
            tax_base_amount: {},
            tax_audit: {}
          }
        },
        analytic_distribution: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        debit: {
          position: 'attributes',
          __todo__optional: 'show'
        },
        credit: {
          position: 'attributes',
          __todo__optional: 'show'
        },
        journal_id: {
          position: 'attributes',
          __todo__optional: 'show'
        }
      }
    }
  },

  account_move_line_graph_date: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'otherview',
    arch: {}
  },

  view_account_move_line_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'search',
    arch: {
      name: {
        string: 'Journal Item',
        filter_domain: { todo_ctx: "[                         '|', '|', '|',                         ('name', 'ilike', self), ('ref', 'ilike', self), ('account_id', 'ilike', self), ('partner_id', 'ilike', self)]" }
      },
      _field_name_688: {
        name: {}
      },
      ref: {},
      date: {},
      account_id: {},
      account_root_id: {},
      account_type: {},
      partner_id: {},
      journal_id: {},
      move_id: {
        string: 'Journal Entry',
        filter_domain: { todo_ctx: "[                         '|', '|', ('move_id.name', 'ilike', self), ('move_id.ref', 'ilike', self), ('move_id.partner_id', 'ilike', self)]" }
      },
      tax_ids: {},
      tax_line_id: { string: 'Originator Tax' },
      reconcile_model_id: {},
      _separator: {},
      _filter_unposted: {
        _attr: {
          name: 'unposted',
          string: 'Unposted',
          help: 'Unposted Journal Items',
          domain: [['parent_state', '=', 'draft']]
        }
      },
      _filter_posted: {
        _attr: {
          name: 'posted',
          string: 'Posted',
          help: 'Posted Journal Items',
          domain: [['parent_state', '=', 'posted']]
        }
      },
      _separator_521: {},
      _filter_to_check: {
        _attr: {
          name: 'to_check',
          string: 'To Check',
          domain: [['move_id.to_check', '=', true]]
        }
      },
      _separator_682: {},
      _filter_unreconciled: {
        _attr: {
          name: 'unreconciled',
          string: 'Unreconciled',
          help: "Journal items where matching number isn't set",
          domain: [['amount_residual', '!=', 0], ['account_id.reconcile', '=', true]]
        }
      },
      _separator_613: {},
      _filter_sales: {
        _attr: {
          name: 'sales',
          string: 'Sales',
          domain: [['journal_id.type', '=', 'sale']],
          context: { default_journal_type: 'sale' }
        }
      },
      _filter_purchases: {
        _attr: {
          name: 'purchases',
          string: 'Purchases',
          domain: [['journal_id.type', '=', 'purchase']],
          context: { default_journal_type: 'purchase' }
        }
      },
      _filter_bank: {
        _attr: {
          name: 'bank',
          string: 'Bank',
          domain: [['journal_id.type', '=', 'bank']],
          context: { default_journal_type: 'bank' }
        }
      },
      _filter_cash: {
        _attr: {
          name: 'cash',
          string: 'Cash',
          domain: [['journal_id.type', '=', 'cash']],
          context: { default_journal_type: 'cash' }
        }
      },
      _filter_misc_filter: {
        _attr: {
          name: 'misc_filter',
          string: 'Miscellaneous',
          domain: [['journal_id.type', '=', 'general']],
          context: { default_journal_type: 'general' }
        }
      },
      _separator_897: {},
      _filter_trade_payable: {
        _attr: {
          name: 'trade_payable',
          string: 'Payable',
          help: 'From Trade Payable accounts',
          domain: [['account_id.account_type', '=', 'liability_payable'], ['account_id.non_trade', '=', false]]
        }
      },
      _filter_trade_receivable: {
        _attr: {
          name: 'trade_receivable',
          string: 'Receivable',
          help: 'From Trade Receivable accounts',
          domain: [['account_id.account_type', '=', 'asset_receivable'], ['account_id.non_trade', '=', false]]
        }
      },
      _filter_non_trade_payable: {
        _attr: {
          name: 'non_trade_payable',
          string: 'Non Trade Payable',
          help: 'From Non Trade Receivable accounts',
          invisible: '1',
          domain: [['account_id.account_type', '=', 'liability_payable'], ['account_id.non_trade', '=', true]]
        }
      },
      _filter_non_trade_receivable: {
        _attr: {
          name: 'non_trade_receivable',
          string: 'Non Trade Receivable',
          help: 'From Non Trade Receivable accounts',
          invisible: '1',
          domain: [['account_id.account_type', '=', 'asset_receivable'], ['account_id.non_trade', '=', true]]
        }
      },
      _filter_pl_accounts: {
        _attr: {
          name: 'pl_accounts',
          string: 'P&L Accounts',
          help: 'From P&L accounts',
          domain: [['account_id.internal_group', 'in', ('income', 'expense')]]
        }
      },
      _separator_580: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Date',
          date: 'date'
        }
      },
      _separator_592: {},
      _filter_date_between: {
        _attr: {
          name: 'date_between',
          string: 'Report Dates',
          invisible: '1',
          domain: { todo_ctx: "[('date', '>=', context.get('date_from')), ('date', '<=', context.get('date_to'))]" }
        }
      },
      _filter_date_before: {
        _attr: {
          name: 'date_before',
          string: 'Report Dates',
          invisible: '1',
          domain: { todo_ctx: "[('date', '<=', context.get('date_to'))]" }
        }
      },
      _separator_288: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_by_move: {
          _attr: {
            name: 'group_by_move',
            string: 'Journal Entry',
            domain: [],
            context: { group_by: 'move_name' }
          }
        },
        _filter_group_by_account: {
          _attr: {
            name: 'group_by_account',
            string: 'Account',
            domain: [],
            context: { group_by: 'account_id' }
          }
        },
        _filter_group_by_partner: {
          _attr: {
            name: 'group_by_partner',
            string: 'Partner',
            domain: [],
            context: { group_by: 'partner_id' }
          }
        },
        _filter_journal: {
          _attr: {
            name: 'journal',
            string: 'Journal',
            domain: [],
            context: { group_by: 'journal_id' }
          }
        },
        _filter_groupby_date: {
          _attr: {
            name: 'groupby_date',
            string: 'Date',
            domain: [],
            context: { group_by: 'date' }
          }
        },
        _filter_group_by_taxes: {
          _attr: {
            name: 'group_by_taxes',
            string: 'Taxes',
            domain: [],
            context: { group_by: 'tax_ids' }
          }
        },
        _filter_group_by_tax_tags: {
          _attr: {
            name: 'group_by_tax_tags',
            string: 'Tax Grid',
            domain: [],
            context: { group_by: 'tax_tag_ids' }
          }
        },
        _filter_group_by_matching: {
          _attr: {
            name: 'group_by_matching',
            string: 'Matching #',
            domain: [],
            context: { group_by: 'full_reconcile_id' }
          }
        }
      },
      _searchpanel: {
        _attr: { class: 'account_root' },
        account_root_id: {}
      }
    }
  },

  action_move_line_select: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'search_default_account_id': [active_id], 'search_default_posted': 1}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_automatic_entry: {
    _odoo_model: 'ir.actions.server',
    model_id: 'account.model_account_move_line',
    model: 'account_move_line'
  },

  action_account_moves_all_a: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'general',
      search_default_group_by_move: 1,
      search_default_posted: 1,
      create: 0
    },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  },

  action_account_moves_all_grouped_matching: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'general',
      search_default_posted: 1,
      expand: '1'
    },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  },

  action_account_moves_journal_sales: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'sales',
      search_default_group_by_move: 1,
      search_default_posted: 1,
      search_default_sales: 1,
      expand: 1
    },
    views: {
      tree: 'view_move_line_tree_grouped_sales_purchases',
      form: '=======todo=========='
    }
  },

  action_account_moves_journal_purchase: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Purchases',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'purchase',
      search_default_group_by_move: 1,
      search_default_posted: 1,
      search_default_purchases: 1,
      expand: 1
    },
    views: {
      tree: 'view_move_line_tree_grouped_sales_purchases',
      form: '=======todo=========='
    }
  },

  action_account_moves_journal_bank_cash: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bank and Cash',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'bank',
      search_default_group_by_move: 1,
      search_default_posted: 1,
      search_default_bank: 1,
      search_default_cash: 1,
      expand: 1
    },
    views: {
      tree: 'view_move_line_tree_grouped_bank_cash',
      form: '=======todo=========='
    }
  },

  action_account_moves_journal_misc: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Miscellaneous',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'general',
      search_default_group_by_move: 1,
      search_default_posted: 1,
      search_default_misc_filter: 1,
      expand: 1
    },
    views: {
      tree: 'view_move_line_tree_grouped_misc',
      form: '=======todo=========='
    }
  },

  action_account_moves_ledger_partner: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Partner Ledger',
    res_model: 'account.move.line',
    search_view_id: 'view_account_move_line_filter',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: {
      journal_type: 'general',
      search_default_group_by_partner: 1,
      search_default_posted: 1,
      search_default_trade_payable: 1,
      search_default_trade_receivable: 1,
      search_default_unreconciled: 1
    },
    views: {
      tree: 'view_move_line_tree_grouped_partner',
      form: '=======todo=========='
    }
  },

  action_account_moves_all_tree: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']]]",
    context: { todo_ctx: "{'search_default_partner_id': [active_id], 'default_partner_id': active_id, 'search_default_posted':1}" },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  },

  action_account_moves_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    search_view_id: 'tooooooodoooooo',
    domain: "[['display_type', 'not in', ['line_section', 'line_note']], ['parent_state', '!=', 'cancel']]",
    context: {
      journal_type: 'general',
      search_default_posted: 1
    },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  }
}
