export default {
  view_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_open_related_taxes: {
            _attr: {
              name: 'action_open_related_taxes',
              attrs: {
                invisible: "[('related_taxes_amount', '=', 0)]"
              },
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
                  class: 'o_stat_value'
                },
                related_taxes_amount: {}
              },
              _span_822: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Taxes'
                }
              }
            }
          },
          _button_count__action_move_line_sele: {
            _attr: {
              name: 'count.action_move_line_sele',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-bars'
            },
            _div: {
              _attr: {
                class: 'o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                current_balance: {}
              },
              _span_387: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Balance'
                }
              }
            }
          }
        },
        company_id: {
          invisible: '1'
        },
        _div: {
          _h1: {
            _div: {
              _attr: {
                class: 'row'
              },
              _div: {
                _attr: {
                  class: 'col col-md-auto'
                },
                _label_code: {
                  for: 'code',
                  string: 'Code'
                },
                _div: {
                  code: {
                    class: 'oe_inline',
                    placeholder: 'e.g. 101000'
                  }
                }
              },
              _div_992: {
                _attr: {
                  class: 'col col-md-8'
                },
                _label_name: {
                  for: 'name',
                  string: 'Account Name'
                },
                _div: {
                  name: {
                    class: 'oe_inline',
                    placeholder: 'e.g. Current Assets'
                  }
                }
              }
            },
            company_id: {
              invisible: '1'
            }
          }
        },
        _notebook: {
          _page_accounting: {
            _attr: {
              name: 'accounting',
              string: 'Accounting'
            },
            _group: {
              _group: {
                account_type: {
                  widget: 'account_type_selection'
                },
                tax_ids: {
                  widget: 'many2many_tags',
                  domain: {
                    todo_ctx: "[('company_id','=',company_id)]"
                  },
                  attrs: {
                    invisible: "[('internal_group', '=', 'off_balance')]"
                  },
                  no_quick_create: true
                },
                tag_ids: {
                  widget: 'many2many_tags',
                  domain: "[('applicability', '=', 'accounts')]",
                  context: {
                    default_applicability: 'accounts'
                  },
                  no_create_edit: true
                },
                allowed_journal_ids: {
                  widget: 'many2many_tags',
                  domain: {
                    todo_ctx: "[('company_id','=',company_id)]"
                  },
                  no_create_edit: true
                }
              },
              _group_807: {
                internal_group: {
                  invisible: '1'
                },
                currency_id: {
                  groups: 'base.group_multi_currency',
                  no_create: true
                },
                deprecated: {},
                group_id: {},
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        code: {},
        name: {},
        account_type: {
          widget: 'account_type_selection'
        },
        group_id: {},
        internal_group: {
          invisible: '1'
        },
        reconcile: {
          widget: 'boolean_toggle',
          attrs: {
            invisible: "['|', ('account_type', 'in', ('asset_cash', 'liability_credit_card')), ('internal_group', '=', 'off_balance')]"
          }
        },
        non_trade: {
          widget: 'boolean_toggle',
          attrs: {
            invisible: "[('account_type', 'not in', ('liability_payable', 'asset_receivable'))]"
          }
        },
        tax_ids: {
          widget: 'many2many_tags'
        },
        tag_ids: {
          widget: 'many2many_tags'
        },
        allowed_journal_ids: {
          widget: 'many2many_tags'
        },
        currency_id: {
          groups: 'base.group_multi_currency',
          no_create: true
        },
        _field_company_id_304: {
          company_id: {
            groups: 'base.group_multi_company',
            no_create: true
          }
        },
        _button_action_read_account: {
          _attr: {
            name: 'action_read_account',
            string: 'Setup',
            class: 'float-end btn-secondary',
            type: 'object'
          }
        }
      }
    }
  },

  view_account_account_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'otherview',
    arch: {}
  },

  view_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'search',
    arch: {
      name: {
        string: 'Account'
      },
      _filter_receivableacc: {
        _attr: {
          name: 'receivableacc',
          string: 'Receivable',
          domain: "[('account_type', '=', 'asset_receivable')]"
        }
      },
      _filter_payableacc: {
        _attr: {
          name: 'payableacc',
          string: 'Payable',
          domain: "[('account_type', '=', 'liability_payable')]"
        }
      },
      _filter_equityacc: {
        _attr: {
          name: 'equityacc',
          string: 'Equity',
          domain: "[('internal_group', '=', 'equity')]"
        }
      },
      _filter_assetsacc: {
        _attr: {
          name: 'assetsacc',
          string: 'Assets',
          domain: "[('internal_group', '=', 'asset')]"
        }
      },
      _filter_liabilityacc: {
        _attr: {
          name: 'liabilityacc',
          string: 'Liability',
          domain: "[('internal_group', '=', 'liability')]"
        }
      },
      _filter_incomeacc: {
        _attr: {
          name: 'incomeacc',
          string: 'Income',
          domain: "[('internal_group', '=', 'income')]"
        }
      },
      _filter_expensesacc: {
        _attr: {
          name: 'expensesacc',
          string: 'Expenses',
          domain: "[('internal_group', '=', 'expense')]"
        }
      },
      _separator: {},
      _filter_used: {
        _attr: {
          name: 'used',
          string: 'Account with Entries',
          domain: "[('used', '=', True)]"
        }
      },
      _filter_activeacc: {
        _attr: {
          name: 'activeacc',
          string: 'Active Account',
          domain: "[('deprecated', '=', False)]"
        }
      },
      _separator_603: {},
      account_type: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_accounttype: {
          _attr: {
            name: 'accounttype',
            string: 'Account Type',
            context: {
              group_by: 'account_type'
            }
          }
        }
      },
      _searchpanel: {
        _attr: {
          class: 'account_root'
        },
        root_id: {}
      }
    }
  },

  action_account_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Chart of Accounts',
    search_view_id: 'view_account_search',
    res_model: 'account.account',
    context: {
      search_default_activeacc: true
    },
    views: {
      tree: 'view_account_list',
      form: '=======todo=========='
    }
  }
}