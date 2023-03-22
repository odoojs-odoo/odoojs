export default {
  view_account_journal_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      // sequence: {},
      name: {},
      type: {},
      journal_group_ids: { widget: 'many2many_tags' },
      currency_id: {},
      code: {},
      default_account_id: {},
      company_id: {},
      active: {}
    }
  },

  view_account_journal_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        _title: {
          display_name: {}
        },
        _group_button_box: {
          _span: 2
          // name: {}
        },
        _group_name: {
          _span: 2,
          name: {}
        },
        _group_type: {
          type: {},
          active: { invisible: '1', widget: 'web_ribbon' }
        },
        _group_country: {
          company_id: {},
          country_code: { invisible: '1' }
        },

        _group_accounting_information: {
          // 处理 field invisible
          // 这里的 invisible 可以确保 sheet 占地方. 仅仅是字段 是否显示
          default_account_id: {
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
          code: {},
          currency_id: {}
        },

        _group_bank_account_number: {
          company_partner_id: { invisible: 1 },
          bank_account_id: {
            // [('partner_id','=', company_partner_id), '|', ('company_id', '=', False), ('company_id', '=', company_id)]
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
            required({ record }) {
              // 'required': [('type', '=', 'bank')]
              const { type } = record
              return type === 'bank'
            }
          }
        },

        _group_inbound_payment_settings: {
          _span: 2,

          available_payment_method_ids: { invisible: 1 },

          inbound_payment_method_line_ids: {
            invisible({ record }) {
              // [('type', 'not in', ['cash', 'bank']
              const { type } = record
              return !['bank', 'cash'].includes(type)
            },
            widget: 'x2many_tree',

            constext: { default_payment_type: 'inbound' },
            views: {
              tree: {
                fields: {
                  available_payment_method_ids: { invisible: 1 },
                  payment_type: { invisible: 1 },
                  company_id: { invisible: 1 },
                  sequence: {},
                  payment_method_id: {},
                  name: {},
                  payment_account_id: {}
                }
              },
              form: {
                fields: {
                  available_payment_method_ids: { invisible: 1 },
                  payment_type: { invisible: 1 },
                  company_id: { invisible: 1 },
                  sequence: {},
                  payment_method_id: {
                    // [('payment_type', '=?', payment_type), ('id', 'in', available_payment_method_ids)]
                  },
                  name: {},
                  payment_account_id: {
                    // [('deprecated', '=', False), ('company_id', '=', company_id), ('account_type', 'not in', ('asset_receivable', 'liability_payable')), '|', ('account_type', 'in', ('asset_current', 'liability_current')), ('id', '=', parent.default_account_id)]
                  }
                }
              }
            }
          }
        },

        _group_outbound_payment_settings: {
          _span: 2,

          available_payment_method_ids: { invisible: 1 },

          outbound_payment_method_line_ids: {
            invisible({ record }) {
              // [('type', 'not in', ['cash', 'bank']
              const { type } = record
              return !['bank', 'cash'].includes(type)
            },
            widget: 'x2many_tree',

            constext: { default_payment_type: 'outbound' },
            views: {
              tree: {
                fields: {
                  available_payment_method_ids: { invisible: 1 },
                  payment_type: { invisible: 1 },
                  company_id: { invisible: 1 },
                  sequence: {},
                  payment_method_id: {},
                  name: {},
                  payment_account_id: {}
                }
              },
              form: {
                fields: {
                  available_payment_method_ids: { invisible: 1 },
                  payment_type: { invisible: 1 },
                  company_id: { invisible: 1 },
                  sequence: {},
                  payment_method_id: {
                    // [('payment_type', '=?', payment_type), ('id', 'in', available_payment_method_ids)]
                  },
                  name: {},
                  payment_account_id: {
                    // [('deprecated', '=', False), ('company_id', '=', company_id), ('account_type', 'not in', ('asset_receivable', 'liability_payable')), '|', ('account_type', 'in', ('asset_current', 'liability_current')), ('id', '=', parent.default_account_id)]
                  }
                }
              }
            }
          },

          selected_payment_method_codes: { invisible: 1 }
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
