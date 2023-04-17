export default {
  view_move_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move.line',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        parent_state: {
          invisible: '1'
        },
        _group: {
          name: {},
          partner_id: {
            domain: "['|', ('parent_id', '=', False), ('is_company', '=', True)]"
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
                _attr: {
                  string: 'Amount'
                },
                account_id: {
                  domain: {
                    todo_ctx: "[('company_id', '=', company_id)]"
                  },
                  no_create: true
                },
                debit: {},
                credit: {},
                balance: {},
                quantity: {}
              },
              _group_476: {
                _attr: {
                  string: 'States'
                },
                blocked: {}
              },
              _group_389: {
                _attr: {
                  string: 'Dates'
                },
                date: {
                  groups: 'account.group_account_readonly'
                },
                date_maturity: {}
              },
              _group_909: {
                _attr: {
                  string: 'Taxes',
                  attrs: {
                    invisible: "[('tax_line_id', '=', False), ('tax_ids', '=', [])]"
                  }
                },
                tax_line_id: {
                  attrs: {
                    invisible: "[('tax_line_id', '=', False)]"
                  }
                },
                tax_ids: {
                  widget: 'many2many_tags',
                  attrs: {
                    invisible: "[('tax_ids', '=', [])]"
                  }
                },
                tax_tag_invert: {
                  groups: 'base.group_no_one'
                },
                tax_audit: {}
              },
              _group_221: {
                _attr: {
                  string: 'Matching',
                  attrs: {
                    invisible: "[('matched_debit_ids', '=', []), ('matched_credit_ids', '=', [])]"
                  }
                },
                _label_full_reconcile_id: {
                  for: 'full_reconcile_id'
                },
                _div: {
                  full_reconcile_id: {
                    attrs: {
                      invisible: "[('full_reconcile_id', '=', False)]"
                    }
                  },
                  matched_debit_ids: {
                    invisible: '1'
                  },
                  matched_credit_ids: {
                    invisible: '1'
                  },
                  _button_open_reconcile_view: {
                    _attr: {
                      name: 'open_reconcile_view',
                      string: '-> View partially reconciled entries',
                      attrs: {
                        invisible: "['|', ('full_reconcile_id', '!=', False), '&', ('matched_debit_ids', '=', []), ('matched_credit_ids', '=', [])]"
                      },
                      class: 'oe_link',
                      type: 'object'
                    }
                  }
                }
              },
              _group_411: {
                _attr: {
                  string: 'Currency',
                  groups: 'base.group_multi_currency'
                },
                currency_id: {
                  invisible: '1'
                },
                amount_currency: {}
              },
              _group_507: {
                _attr: {
                  string: 'Product',
                  attrs: {
                    invisible: "[('product_id', '=', False)]"
                  }
                },
                product_id: {}
              },
              _group_525: {
                _attr: {
                  string: 'Analytic',
                  groups: 'analytic.group_analytic_accounting'
                },
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  groups: 'analytic.group_analytic_accounting'
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
            date: {
              invisible: '1'
            },
            analytic_line_ids: {
              context: {
                todo_ctx: "{'tree_view_ref':'analytic.view_account_analytic_line_tree', 'default_general_account_id':account_id, 'default_name': name, 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}"
              }
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
              text: 'true'
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
        move_id: {
          invisible: '1'
        },
        date: {},
        company_id: {
          invisible: '1'
        },
        _field_company_id_305: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        },
        journal_id: {
          no_open: true
        },
        move_name: {
          string: 'Journal Entry',
          widget: 'open_move_widget'
        },
        account_id: {
          groups: 'account.group_account_readonly',
          domain: {
            todo_ctx: "[('company_id', '=', company_id)]"
          },
          no_open: true,
          no_create: true
        },
        partner_id: {
          attrs: {
            readonly: "[('move_type', '!=', 'entry')]"
          }
        },
        ref: {},
        product_id: {},
        name: {},
        tax_ids: {
          widget: 'many2many_tags'
        },
        amount_currency: {
          groups: 'base.group_multi_currency',
          attrs: {
            invisible: "[('is_same_currency', '=', True)]"
          }
        },
        currency_id: {
          string: 'Currency',
          groups: 'base.group_multi_currency',
          attrs: {
            invisible: "[('is_same_currency', '=', True)]"
          }
        },
        debit: {},
        credit: {},
        tax_tag_ids: {
          string: 'Tax Grids',
          widget: 'many2many_tags'
        },
        discount_date: {
          string: 'Discount Date'
        },
        discount_amount_currency: {
          string: 'Discount Amount'
        },
        tax_line_id: {
          string: 'Originator Tax'
        },
        date_maturity: {},
        balance: {},
        matching_number: {},
        amount_residual: {
          string: 'Residual',
          attrs: {
            invisible: "[('is_account_reconcile', '=', False)]"
          }
        },
        amount_residual_currency: {
          string: 'Residual in Currency',
          attrs: {
            invisible: "['|', ('is_same_currency', '=', True), ('is_account_reconcile', '=', False)]"
          }
        },
        analytic_distribution: {
          widget: 'analytic_distribution',
          groups: 'analytic.group_analytic_accounting',
          product_field: 'product_id',
          account_field: 'account_id',
          force_applicability: 'optional'
        },
        move_type: {
          invisible: '1'
        },
        parent_state: {
          invisible: '1'
        },
        account_type: {
          invisible: '1'
        },
        statement_line_id: {
          invisible: '1'
        },
        company_currency_id: {
          invisible: '1'
        },
        is_same_currency: {
          invisible: '1'
        },
        is_account_reconcile: {
          invisible: '1'
        },
        sequence: {
          invisible: '1'
        },
        _groupby_partner_id: {
          _attr: {
            name: 'partner_id'
          },
          _button_edit: {
            _attr: {
              name: 'edit',
              title: 'Edit',
              type: 'edit',
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
          ===todo===optional: 'hide'
        },
        tax_tag_ids: {
          ===todo===optional: 'show'
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
          ===todo===optional: 'hide'
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
          ===todo===optional: 'hide'
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
          ===todo===optional: 'hide'
        },
        balance: {
          ===todo===optional: 'show'
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
          ===todo===optional: 'hide'
        },
        date_maturity: {
          ===todo===optional: 'show'
        },
        balance: {
          ===todo===optional: 'show'
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
          __todo__replace: {
            tax_line_id: {
              string: 'Tax'
            },
            tax_base_amount: {},
            tax_audit: {}
          }
        },
        analytic_distribution: {
          ===todo===optional: 'hide'
        },
        debit: {
          ===todo===optional: 'show'
        },
        credit: {
          ===todo===optional: 'show'
        },
        journal_id: {
          ===todo===optional: 'show'
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
        string: 'Journal Item'
      },
      _field_name_358: {
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
        string: 'Journal Entry'
      },
      tax_ids: {},
      tax_line_id: {
        string: 'Originator Tax'
      },
      reconcile_model_id: {},
      _separator: {},
      _filter_unposted: {
        _attr: {
          name: 'unposted',
          string: 'Unposted',
          domain: "[('parent_state', '=', 'draft')]"
        }
      },
      _filter_posted: {
        _attr: {
          name: 'posted',
          string: 'Posted',
          domain: "[('parent_state', '=', 'posted')]"
        }
      },
      _separator_817: {},
      _filter_to_check: {
        _attr: {
          name: 'to_check',
          string: 'To Check',
          domain: "[('move_id.to_check', '=', True)]"
        }
      },
      _separator_177: {},
      _filter_unreconciled: {
        _attr: {
          name: 'unreconciled',
          string: 'Unreconciled',
          domain: "[('amount_residual', '!=', 0), ('account_id.reconcile', '=', True)]"
        }
      },
      _separator_919: {},
      _filter_sales: {
        _attr: {
          name: 'sales',
          string: 'Sales',
          domain: "[('journal_id.type', '=', 'sale')]",
          context: {
            default_journal_type: 'sale'
          }
        }
      },
      _filter_purchases: {
        _attr: {
          name: 'purchases',
          string: 'Purchases',
          domain: "[('journal_id.type', '=', 'purchase')]",
          context: {
            default_journal_type: 'purchase'
          }
        }
      },
      _filter_bank: {
        _attr: {
          name: 'bank',
          string: 'Bank',
          domain: "[('journal_id.type', '=', 'bank')]",
          context: {
            default_journal_type: 'bank'
          }
        }
      },
      _filter_cash: {
        _attr: {
          name: 'cash',
          string: 'Cash',
          domain: "[('journal_id.type', '=', 'cash')]",
          context: {
            default_journal_type: 'cash'
          }
        }
      },
      _filter_misc_filter: {
        _attr: {
          name: 'misc_filter',
          string: 'Miscellaneous',
          domain: "[('journal_id.type', '=', 'general')]",
          context: {
            default_journal_type: 'general'
          }
        }
      },
      _separator_677: {},
      _filter_trade_payable: {
        _attr: {
          name: 'trade_payable',
          string: 'Payable',
          domain: "[('account_id.account_type', '=', 'liability_payable'), ('account_id.non_trade', '=', False)]"
        }
      },
      _filter_trade_receivable: {
        _attr: {
          name: 'trade_receivable',
          string: 'Receivable',
          domain: "[('account_id.account_type', '=', 'asset_receivable'), ('account_id.non_trade', '=', False)]"
        }
      },
      _filter_non_trade_payable: {
        _attr: {
          name: 'non_trade_payable',
          string: 'Non Trade Payable',
          invisible: '1',
          domain: "[('account_id.account_type', '=', 'liability_payable'), ('account_id.non_trade', '=', True)]"
        }
      },
      _filter_non_trade_receivable: {
        _attr: {
          name: 'non_trade_receivable',
          string: 'Non Trade Receivable',
          invisible: '1',
          domain: "[('account_id.account_type', '=', 'asset_receivable'), ('account_id.non_trade', '=', True)]"
        }
      },
      _filter_pl_accounts: {
        _attr: {
          name: 'pl_accounts',
          string: 'P&L Accounts',
          domain: "[('account_id.internal_group', 'in', ('income', 'expense'))]"
        }
      },
      _separator_227: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Date'
        }
      },
      _separator_998: {},
      _filter_date_between: {
        _attr: {
          name: 'date_between',
          string: 'Report Dates',
          invisible: '1',
          domain: {
            todo_ctx: "[('date', '>=', context.get('date_from')), ('date', '<=', context.get('date_to'))]"
          }
        }
      },
      _filter_date_before: {
        _attr: {
          name: 'date_before',
          string: 'Report Dates',
          invisible: '1',
          domain: {
            todo_ctx: "[('date', '<=', context.get('date_to'))]"
          }
        }
      },
      _separator_997: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_group_by_move: {
          _attr: {
            name: 'group_by_move',
            string: 'Journal Entry',
            domain: [],
            context: {
              group_by: 'move_name'
            }
          }
        },
        _filter_group_by_account: {
          _attr: {
            name: 'group_by_account',
            string: 'Account',
            domain: [],
            context: {
              group_by: 'account_id'
            }
          }
        },
        _filter_group_by_partner: {
          _attr: {
            name: 'group_by_partner',
            string: 'Partner',
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
        _filter_groupby_date: {
          _attr: {
            name: 'groupby_date',
            string: 'Date',
            domain: [],
            context: {
              group_by: 'date'
            }
          }
        },
        _filter_group_by_taxes: {
          _attr: {
            name: 'group_by_taxes',
            string: 'Taxes',
            domain: [],
            context: {
              group_by: 'tax_ids'
            }
          }
        },
        _filter_group_by_tax_tags: {
          _attr: {
            name: 'group_by_tax_tags',
            string: 'Tax Grid',
            domain: [],
            context: {
              group_by: 'tax_tag_ids'
            }
          }
        },
        _filter_group_by_matching: {
          _attr: {
            name: 'group_by_matching',
            string: 'Matching #',
            domain: [],
            context: {
              group_by: 'full_reconcile_id'
            }
          }
        }
      },
      _searchpanel: {
        _attr: {
          class: 'account_root'
        },
        account_root_id: {}
      }
    }
  },

  action_move_line_select: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    context: {
      todo_ctx: "{'search_default_account_id': [active_id], 'search_default_posted': 1}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_account_moves_all_a: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    search_view_id: 'view_account_move_line_filter',
    res_model: 'account.move.line',
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
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
    domain: "[('display_type', 'not in', ('line_section', 'line_note'))]",
    context: {
      todo_ctx: "{'search_default_partner_id': [active_id], 'default_partner_id': active_id, 'search_default_posted':1}"
    },
    views: {
      tree: 'view_move_line_tree',
      form: '=======todo=========='
    }
  },

  action_account_moves_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Items',
    res_model: 'account.move.line',
    domain: "[('display_type', 'not in', ('line_section', 'line_note')), ('parent_state', '!=', 'cancel')]",
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
