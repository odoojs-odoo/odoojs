export default {
  view_account_journal_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      sequence: { widget: 'handle' },
      name: {},
      type: {},
      journal_group_ids: {
        widget: 'many2many_tags',
        readonly: '1',
        optional: 'show'
      },
      currency_id: { groups: 'base.group_multi_currency', optional: 'hide' },
      code: { optional: 'show' },
      default_account_id: { optional: 'show' },
      active: { optional: 'hide' },
      company_id: {
        groups: 'base.group_multi_company',
        active: { optional: 'hide' }
      }
    }
  },

  view_account_journal_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        company_id: { invisible: '1' },
        bank_statements_source: { invisible: '1' },

        _din_button_box: {
          _button_action_account_moves_all_a: {
            _attr: {
              string: 'Journal Entries',
              type: 'action',
              name: 'action_account_moves_all_a',
              icon: 'fa-book',
              context({ active_id }) {
                // context="{'search_default_journal_id':active_id}",
                return { search_default_journal_id: active_id }
              }
            }
          }
        },

        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _div_title: {
          _h1: { name: { placeholder: 'e.g. Customer Invoices' } }
        },

        _group: {
          _group_type: {
            active: { invisible: '1' },
            type: {}
          },
          _group_country: {
            company_id: { groups: 'base.group_multi_company' },
            country_code: { invisible: '1' }
          }
        },

        _notebook: {
          _page_bank_account: {
            _attr: { name: 'bank_account', string: 'Journal Entries' },
            _group: {
              _group_Accounting_Information: {
                _attr: { string: 'Accounting Information' },
                default_account_id: {
                  groups: 'account.group_account_readonly',
                  string({ record }) {
                    const { type } = record

                    const general_account = {
                      en_US: 'Default Account',
                      zh_CN: '默认科目',
                      zh_HK: '默认科目'
                    }

                    const type_map = {
                      bank: {
                        en_US: 'Bank Account',
                        zh_CN: '银行科目',
                        zh_HK: '银行科目'
                      },
                      cash: {
                        en_US: 'Cash Account',
                        zh_CN: '现金科目',
                        zh_HK: '现金科目'
                      },
                      sale: {
                        en_US: 'Default Income Account',
                        zh_CN: '默认收入科目',
                        zh_HK: '默认收入科目'
                      },
                      purchase: {
                        en_US: 'Default Expense Account',
                        zh_CN: '默认支出科目',
                        zh_HK: '默认支出科目'
                      },
                      general: general_account
                    }

                    return type_map[type] || general_account
                  },
                  required({ record }) {
                    // 'required': [
                    // '|',
                    // '&amp;',
                    // ('id', '!=', False),
                    // ('type', 'in', ('bank', 'cash')),
                    // ('type', 'in', ('sale', 'purchase'))]
                    const { type, id: res_id } = record
                    console.log(
                      record,
                      (res_id && ['bank', 'cash'].includes(type)) ||
                        ['sale', 'purchase'].includes(type)
                    )
                    return (
                      (res_id && ['bank', 'cash'].includes(type)) ||
                      ['sale', 'purchase'].includes(type)
                    )
                  },

                  invisible({ record }) {
                    const { type } = record
                    return !type
                  }
                },
                suspense_account_id: {
                  groups: 'account.group_account_readonly',
                  required({ record }) {
                    // [('type', 'in', ('bank', 'cash'))]
                    const { type } = record
                    return ['bank', 'cash'].includes(type)
                  },
                  invisible({ record }) {
                    // [('type', 'not in', ('bank', 'cash'))]
                    const { type } = record
                    return !['bank', 'cash'].includes(type)
                  }
                },
                profit_account_id: {
                  invisible({ record }) {
                    // ['!', ('type', 'in', ('cash', 'bank'))]
                    const { type } = record
                    return !['bank', 'cash'].includes(type)
                  }
                },
                loss_account_id: {
                  invisible({ record }) {
                    // ['!', ('type', 'in', ('cash', 'bank'))]
                    const { type } = record
                    return !['bank', 'cash'].includes(type)
                  }
                },

                refund_sequence: {
                  invisible({ record }) {
                    //  [('type', 'not in', ['sale', 'purchase']
                    const { type } = record
                    return !['sale', 'purchase'].includes(type)
                  }
                },
                payment_sequence: {
                  invisible({ record }) {
                    // [('type', 'not in', ('bank', 'cash'))]
                    const { type } = record
                    return !['bank', 'cash'].includes(type)
                  }
                },
                code: { placeholder: 'e.g. INV' },
                currency_id: { groups: 'base.group_multi_currency' }
              },
              _group_bank_account_number: {
                _attr: {
                  name: 'bank_account_number',
                  string: 'Bank Account Number',
                  invisible({ record }) {
                    // 'invisible': [('type', '!=', 'bank')]
                    const { type } = record
                    return type !== 'bank'
                  }
                },
                company_partner_id: { invisible: 1 },
                bank_account_id: {
                  string: 'Account Number',
                  // [('partner_id','=', company_partner_id),
                  // '|', ('company_id', '=', False),
                  // ('company_id', '=', company_id)]
                  context({ record }) {
                    // context="{'default_partner_id': company_partner_id}"
                    const { company_partner_id } = record
                    return {
                      default_partner_id: company_partner_id
                    }
                  }
                },
                bank_id: {
                  invisible({ record }) {
                    // 'invisible': [('bank_account_id', '=', False)]
                    const { bank_account_id } = record
                    return !bank_account_id
                  }
                },
                bank_statements_source: {
                  widget: 'radio',
                  groups: 'account.group_account_readonly',
                  required({ record }) {
                    // 'required': [('type', '=', 'bank')]
                    const { type } = record
                    return type === 'bank'
                  }
                }
              }
            }
          },
          _page_inbound_payment_settings: {
            _attr: {
              id: 'inbound_payment_settings',
              string: 'Incoming Payments',
              invisible({ record }) {
                //'invisible':  [('type', 'not in', ['cash', 'bank']
                const { type } = record
                return !['bank', 'cash'].includes(type)
              }
            },
            available_payment_method_ids: { invisible: 1 },
            inbound_payment_method_line_ids: {
              widget: 'x2many_tree',

              constext: { default_payment_type: 'inbound' },
              views: {
                tree: {
                  fields: {
                    available_payment_method_ids: { invisible: 1 },
                    payment_type: { invisible: 1 },
                    company_id: { invisible: 1 },
                    sequence: { widget: 'handle' },
                    payment_method_id: {},
                    name: {},
                    payment_account_id: {
                      groups: 'account.group_account_readonly',
                      optional: 'hide',
                      string: 'Outstanding Receipts accounts',
                      placeholder:
                        'Leave empty to use the default outstanding account'
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      available_payment_method_ids: { invisible: 1 },
                      payment_type: { invisible: 1 },
                      company_id: { invisible: 1 },
                      sequence: { widget: 'handle' },
                      payment_method_id: {
                        domain({ record }) {
                          // [('payment_type', '=?', payment_type),
                          // ('id', 'in', available_payment_method_ids)]
                          const { payment_type, available_payment_method_ids } =
                            record
                          return [
                            ['payment_type', '=?', payment_type],
                            ['id', 'in', available_payment_method_ids]
                          ]
                        }
                      },
                      name: {},
                      payment_account_id: {
                        groups: 'account.group_account_readonly',
                        string: 'Outstanding Receipts accounts',
                        placeholder:
                          'Leave empty to use the default outstanding account',
                        domain({ record }) {
                          // [('deprecated', '=', False),
                          // ('company_id', '=', company_id),
                          // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
                          // '|', ('account_type', 'in', ('asset_current', 'liability_current')),
                          // ('id', '=', parent.default_account_id)]
                          const { company_id, parent: prt } = record
                          return [
                            ['deprecated', '=', false],
                            ['company_id', '=', company_id],
                            [
                              'account_type',
                              'not in',
                              ['asset_receivable', 'liability_payable']
                            ],
                            '|',
                            [
                              'account_type',
                              'in',
                              ['asset_current', 'liability_current']
                            ],
                            ['id', '=', prt.default_account_id]
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          },

          _page_outbound_payment_settings: {
            _attr: {
              id: 'outbound_payment_settings',
              string: 'Outgoing Payments',
              invisible({ record }) {
                // 'invisible': [('type', 'not in', ['cash', 'bank'])]
                const { type } = record
                return !['cash', 'bank'].includes(type)
              }
            },
            outbound_payment_method_line_ids: {
              widget: 'x2many_tree',

              constext: { default_payment_type: 'outbound' },
              views: {
                tree: {
                  fields: {
                    available_payment_method_ids: { invisible: 1 },
                    payment_type: { invisible: 1 },
                    company_id: { invisible: 1 },
                    sequence: { widget: 'handle' },
                    payment_method_id: {},
                    name: {},
                    payment_account_id: {
                      groups: 'account.group_account_readonly',
                      optional: 'hide',
                      string: 'Outstanding Receipts accounts',
                      placeholder:
                        'Leave empty to use the default outstanding account'
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      available_payment_method_ids: { invisible: 1 },
                      payment_type: { invisible: 1 },
                      company_id: { invisible: 1 },
                      sequence: { widget: 'handle' },
                      payment_method_id: {
                        domain({ record }) {
                          // [('payment_type', '=?', payment_type),
                          // ('id', 'in', available_payment_method_ids)]
                          const { payment_type, available_payment_method_ids } =
                            record
                          return [
                            ['payment_type', '=?', payment_type],
                            ['id', 'in', available_payment_method_ids]
                          ]
                        }
                      },
                      name: {},
                      payment_account_id: {
                        groups: 'account.group_account_readonly',
                        string: 'Outstanding Receipts accounts',
                        placeholder:
                          'Leave empty to use the default outstanding account',
                        domain({ record }) {
                          // [('deprecated', '=', False), ('company_id', '=', company_id),
                          // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
                          // '|', ('account_type', 'in', ('asset_current', 'liability_current')),
                          // ('id', '=', parent.default_account_id)]
                          const { company_id, parent: prt } = record
                          return [
                            ['deprecated', '=', false],
                            ['company_id', '=', company_id],
                            [
                              'account_type',
                              'not in',
                              ['asset_receivable', 'liability_payable']
                            ],
                            '|',
                            [
                              'account_type',
                              'in',
                              ['asset_current', 'liability_current']
                            ],
                            ['id', '=', prt.default_account_id]
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },

            selected_payment_method_codes: { invisible: 1 },
            _group_outgoing_payment: {}
          },
          _page_advanced_settings: {
            _attr: { name: 'advanced_settings', string: 'Advanced Settings' },
            _group: {
              _group_Control_Access: {
                _attr: {
                  string: 'Control-Access',
                  groups: 'account.group_account_manager'
                },

                _div: { _attr: { text: 'Keep empty for no control' } },
                account_control_ids: { widget: 'many2many_tags' },
                restrict_mode_hash_table: {
                  groups: 'account.group_account_readonly',
                  invisible({ record }) {
                    // 'invisible': [('type', 'in', ['bank', 'cash'])]
                    const { type } = record
                    return ['bank', 'cash'].includes(type)
                  }
                }
              },
              _group_group_alias_ro: {
                _attr: {
                  name: 'group_alias_ro',
                  string: 'Create Invoices upon Emails',
                  invisible({ record }) {
                    // attrs="{'invisible':
                    // ['|', ('type', 'not in',  ('sale' ,'purchase')),
                    // ('alias_domain', '=', False)]
                    const { type, alias_domain } = record
                    return ['sale', 'purchase'].includes(type) || !alias_domain
                  }
                },
                alias_id: {}
              },
              _group_group_alias_no_domain: {
                _attr: {
                  name: 'group_alias_no_domain',
                  string: 'Create Invoices upon Emails',

                  invisible({ record }) {
                    // 'invisible': ['|', ('type', 'not in',  ('sale' ,'purchase')),
                    //  ('alias_domain', '!=', False)]
                    const { type, alias_domain } = record
                    return ['sale', 'purchase'].includes(type) || !alias_domain
                  }
                },
                _button: {
                  _attr: {
                    type: 'action',
                    name: 'action_open_settings',
                    string: 'Configure Email Servers'
                  }
                }
              },
              _group_group_alias_edit: {
                _attr: {
                  name: 'group_alias_edit',
                  string: 'Create Invoices upon Emails',
                  invisible({ record }) {
                    // 'invisible': ['|', ('type', 'not in',  ('sale' ,'purchase')),
                    //  ('alias_domain', '!=', False)]
                    const { type, alias_domain } = record
                    return ['sale', 'purchase'].includes(type) || !alias_domain
                  }
                },
                _div: {
                  alias_name: {},
                  _span: { _attr: { text: '@' } },
                  alias_domain: { readonly: '1' }
                }
              },
              _group_Payment_Communications: {
                _attr: {
                  string: 'Payment Communications',
                  invisible({ record }) {
                    // 'invisible': [('type', '!=', 'sale')]
                    const { type } = record
                    return type !== 'sale'
                  }
                },
                invoice_reference_type: {},
                invoice_reference_model: {
                  invisible({ record }) {
                    //'invisible': [('invoice_reference_type', '=', 'none')]
                    const { invoice_reference_type } = record
                    return !invoice_reference_type
                  }
                }
              },
              _group_Follow_Customer_Payments: {
                _attr: {
                  string: 'Follow Customer Payments',
                  invisible({ record }) {
                    // 'invisible': [('type', '!=', 'sale')]
                    const { type } = record
                    return type !== 'sale'
                  }
                },
                sale_activity_type_id: {},
                sale_activity_user_id: {
                  invisible({ record }) {
                    //'invisible': [('sale_activity_type_id', '=', False)]
                    const { sale_activity_type_id } = record
                    return !sale_activity_type_id
                  }
                },
                sale_activity_note: {
                  placeholder:
                    'e.g. Give a phone call, check with others , ...',
                  invisible({ record }) {
                    //'invisible': [('sale_activity_type_id', '=', False)]
                    const { sale_activity_type_id } = record
                    return !sale_activity_type_id
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  view_account_journal_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return ['|', ['name', 'ilike', self], ['code', '=like', self]]
          }
        }
      },

      filters: {
        group_dashboard: {
          dashboard: {
            string: { en_US: 'Favorites', zh_CN: '已归档', zh_HK: '已归档' },
            domain: [['show_on_dashboard', '=', true]]
          }
        },

        group_type: {
          sales: { string: '销售', domain: [['type', '=', 'sale']] },
          purchases: { string: '采购', domain: [['type', '=', 'purchase']] },
          liquidity: {
            string: '流动',
            domain: ['|', ['type', '=', 'cash'], ['type', '=', 'bank']]
          },
          miscellaneous: {
            string: '杂项',
            domain: [['type', 'not in', ['sale', 'purchase', 'cash', 'bank']]]
          }
        },

        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_account_journal_form: {
    _odoo_model: 'ir.actions',
    name: 'Journals',
    type: 'ir.actions.act_window',
    res_model: 'account.journal',
    search_view_id: 'view_account_journal_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_journal_tree',
      form: 'view_account_journal_form'
    }
  }
}
