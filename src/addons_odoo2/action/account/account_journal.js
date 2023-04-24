export default {
  account_journal_dashboard_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'otherview',
    arch: {}
  },

  open_account_journal_dashboard_kanban: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Accounting Dashboard',
    res_model: 'account.journal',
    search_view_id: 'tooooooodoooooo',
    domain: '[]',
    context: { search_default_dashboard: 1 },
    views: {
      tree: 'account_journal_dashboard_kanban_view',
      form: '=======todo=========='
    }
  },

  account_journal_dashboard_kanban_view_js: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    inherit_id: 'account.account_journal_dashboard_kanban_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class',
              text: 'account_setup_bar',
              js_class: 'account_setup_bar'
            }
          }
        }
      }
    }
  },

  view_account_journal_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        type: {},
        journal_group_ids: {
          widget: 'many2many_tags',
          readonly: '1',
          optional: 'show'
        },
        currency_id: {
          groups: 'base.group_multi_currency',
          optional: 'hide'
        },
        code: { optional: 'show' },
        default_account_id: { optional: 'show' },
        active: { optional: 'hide' },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide'
        }
      }
    }
  },

  view_account_journal_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'form',
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        bank_statements_source: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_account_moves_all_a: {
            _attr: {
              name: 'action_account_moves_all_a',
              type: 'action',
              string: 'Journal Entries',
              icon: 'fa-book',
              context: { todo_ctx: "{'search_default_journal_id':active_id}" },
              class: 'oe_stat_button'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. Customer Invoices' }
          }
        },
        _group: {
          _group: {
            active: { invisible: '1' },
            type: {}
          },
          _group_321: {
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            country_code: { invisible: '1' }
          }
        },
        _notebook: {
          _page_bank_account: {
            _attr: {
              name: 'bank_account',
              string: 'Journal Entries'
            },
            _group: {
              _group: {
                _attr: { string: 'Accounting Information' },
                default_account_type: { invisible: '1' },
                _label_default_account_id: {
                  for: 'default_account_id',
                  string: 'Bank Account',
                  groups: 'account.group_account_readonly',
                  invisible: [['type', '!=', 'bank']]
                },
                _label_default_account_id_881: {
                  for: 'default_account_id',
                  string: 'Cash Account',
                  groups: 'account.group_account_readonly',
                  invisible: [['type', '!=', 'cash']]
                },
                _label_default_account_id_288: {
                  for: 'default_account_id',
                  string: 'Default Income Account',
                  groups: 'account.group_account_readonly',
                  invisible: [['type', '!=', 'sale']]
                },
                _label_default_account_id_543: {
                  for: 'default_account_id',
                  string: 'Default Expense Account',
                  groups: 'account.group_account_readonly',
                  invisible: [['type', '!=', 'purchase']]
                },
                _label_default_account_id_703: {
                  for: 'default_account_id',
                  string: 'Default Account',
                  groups: 'account.group_account_readonly',
                  invisible: [['type', '!=', 'general']]
                },
                default_account_id: {
                  groups: 'account.group_account_readonly',
                  required: ['|', '&', ['id', '!=', false], ['type', 'in', ('bank', 'cash')], ['type', 'in', ('sale', 'purchase')]],
                  invisible: [['type', '=', false]],
                  no_quick_create: true
                },
                suspense_account_id: {
                  groups: 'account.group_account_readonly',
                  required: [['type', 'in', ('bank', 'cash')]],
                  invisible: [['type', 'not in', ('bank', 'cash')]],
                  no_quick_create: true
                },
                profit_account_id: { invisible: ['!', ['type', 'in', ('cash', 'bank')]] },
                loss_account_id: { invisible: ['!', ['type', 'in', ('cash', 'bank')]] },
                refund_sequence: { invisible: [['type', 'not in', ['sale', 'purchase']]] },
                payment_sequence: { invisible: [['type', 'not in', ('bank', 'cash')]] },
                code: { placeholder: 'e.g. INV' },
                currency_id: {
                  groups: 'base.group_multi_currency',
                  no_create: true
                }
              },
              _group_bank_account_number: {
                _attr: {
                  name: 'bank_account_number',
                  string: 'Bank Account Number',
                  invisible: [['type', '!=', 'bank']]
                },
                company_partner_id: { invisible: '1' },
                bank_account_id: {
                  string: 'Account Number',
                  context: { todo_ctx: "{'default_partner_id': company_partner_id}" }
                },
                bank_id: { invisible: [['bank_account_id', '=', false]] },
                bank_statements_source: {
                  widget: 'radio',
                  groups: 'account.group_account_readonly',
                  required: [['type', '=', 'bank']]
                }
              }
            }
          },
          _page: {
            _attr: {
              string: 'Incoming Payments',
              id: 'inbound_payment_settings',
              invisible: [['type', 'not in', ['cash', 'bank']]]
            },
            available_payment_method_ids: { invisible: '1' },
            inbound_payment_method_line_ids: {
              context: { default_payment_type: 'inbound' },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Payment Methods' },
                      available_payment_method_ids: { invisible: '1' },
                      payment_type: { invisible: '1' },
                      company_id: { invisible: '1' },
                      sequence: { widget: 'handle' },
                      payment_method_id: {
                        no_create: true,
                        no_open: true
                      },
                      name: {},
                      payment_account_id: {
                        string: 'Outstanding Receipts accounts',
                        groups: 'account.group_account_readonly',
                        placeholder: 'Leave empty to use the default outstanding account',
                        optional: 'hide',
                        no_quick_create: true
                      }
                    }
                  }
                }
              }
            }
          },
          _page_270: {
            _attr: {
              string: 'Outgoing Payments',
              id: 'outbound_payment_settings',
              invisible: [['type', 'not in', ['cash', 'bank']]]
            },
            outbound_payment_method_line_ids: {
              context: { default_payment_type: 'outbound' },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Payment Methods' },
                      available_payment_method_ids: { invisible: '1' },
                      payment_type: { invisible: '1' },
                      company_id: { invisible: '1' },
                      sequence: { widget: 'handle' },
                      payment_method_id: {
                        no_create: true,
                        no_open: true
                      },
                      name: {},
                      payment_account_id: {
                        string: 'Outstanding Payments accounts',
                        groups: 'account.group_account_readonly',
                        placeholder: 'Leave empty to use the default outstanding account',
                        optional: 'hide',
                        no_quick_create: true
                      }
                    }
                  }
                }
              }
            },
            selected_payment_method_codes: { invisible: '1' },
            _group_outgoing_payment: {
              _attr: { name: 'outgoing_payment' }
            }
          },
          _page_advanced_settings: {
            _attr: {
              name: 'advanced_settings',
              string: 'Advanced Settings'
            },
            _group: {
              _group: {
                _attr: {
                  string: 'Control-Access',
                  groups: 'account.group_account_manager'
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Keep empty for no control'
                  }
                },
                account_control_ids: {
                  widget: 'many2many_tags',
                  no_create_edit: true
                },
                restrict_mode_hash_table: {
                  groups: 'account.group_account_readonly',
                  invisible: [['type', 'in', ['bank', 'cash']]]
                }
              },
              _group_group_alias_ro: {
                _attr: {
                  name: 'group_alias_ro',
                  string: 'Create Invoices upon Emails',
                  invisible: ['|', ['type', 'not in', ('sale', 'purchase')], ['alias_domain', '=', false]],
                  class: 'oe_read_only'
                },
                alias_id: {}
              },
              _group_group_alias_no_domain: {
                _attr: {
                  name: 'group_alias_no_domain',
                  string: 'Create Invoices upon Emails',
                  invisible: ['|', ['type', 'not in', ('sale', 'purchase')], ['alias_domain', '!=', false]]
                },
                _div: {
                  _attr: { class: 'content-group' },
                  _a_action_open_settings: {
                    _attr: {
                      name: '%(action_open_settings)d',
                      type: 'action',
                      class: 'btn btn-link',
                      text: 'Configure Email Servers'
                    },
                    _i: {
                      _attr: { class: 'fa fa-fw o_button_icon fa-arrow-right' }
                    }
                  }
                }
              },
              _group_group_alias_edit: {
                _attr: {
                  name: 'group_alias_edit',
                  string: 'Create Invoices upon Emails',
                  invisible: ['|', ['type', 'not in', ('sale', 'purchase')], ['alias_domain', '=', false]],
                  class: 'oe_edit_only'
                },
                _label_alias_name: {
                  for: 'alias_name',
                  string: 'Email Alias'
                },
                _div_edit_alias: {
                  _attr: {
                    name: 'edit_alias',
                    class: 'oe_inline',
                    text: '@'
                  },
                  alias_name: { class: 'oe_inline' },
                  alias_domain: {
                    class: 'oe_inline',
                    readonly: '1'
                  }
                }
              },
              _group_498: {
                _attr: {
                  string: 'Payment Communications',
                  invisible: [['type', '!=', 'sale']]
                },
                invoice_reference_type: {},
                invoice_reference_model: { invisible: [['invoice_reference_type', '=', 'none']] }
              },
              _group_307: {
                _attr: {
                  string: 'Follow Customer Payments',
                  invisible: [['type', '!=', 'sale']]
                },
                sale_activity_type_id: { no_quick_create: true },
                sale_activity_user_id: {
                  invisible: [['sale_activity_type_id', '=', false]],
                  no_quick_create: true
                },
                sale_activity_note: {
                  invisible: [['sale_activity_type_id', '=', false]],
                  placeholder: 'e.g. Give a phone call, check with others , ...'
                }
              }
            }
          }
        }
      }
    }
  },

  account_journal_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'otherview',
    arch: {}
  },

  view_account_journal_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'search',
    arch: {
      name: {
        string: 'Journal',
        filter_domain: { todo_ctx: "['|', ('name', 'ilike', self), ('code', 'ilike', self)]" }
      },
      _filter_dashboard: {
        _attr: {
          name: 'dashboard',
          string: 'Favorites',
          domain: [['show_on_dashboard', '=', true]]
        }
      },
      _separator: {},
      _filter_sales: {
        _attr: {
          name: 'sales',
          string: 'Sales',
          domain: [['type', '=', 'sale']]
        }
      },
      _filter_purchases: {
        _attr: {
          name: 'purchases',
          string: 'Purchases',
          domain: [['type', '=', 'purchase']]
        }
      },
      _filter_liquidity: {
        _attr: {
          name: 'liquidity',
          string: 'Liquidity',
          domain: ['|', ['type', '=', 'cash'], ['type', '=', 'bank']]
        }
      },
      _filter_miscellaneous: {
        _attr: {
          name: 'miscellaneous',
          string: 'Miscellaneous',
          domain: [['type', 'not in', ['sale', 'purchase', 'cash', 'bank']]]
        }
      },
      _separator_330: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_account_journal_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journals',
    res_model: 'account.journal',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
