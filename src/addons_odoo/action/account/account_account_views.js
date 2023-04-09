export default {
  view_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      // company_id: { invisible: 1 },
      code: {},
      name: {},
      account_type: { widget: 'account_type_selection' },
      group_id: { optional: 'hide' },
      internal_group: { invisible: 1 },
      reconcile: {
        widget: 'boolean_toggle',

        invisible({ record }) {
          // 'invisible':
          // ['|', ('account_type', 'in',
          // ('asset_cash', 'liability_credit_card')),
          // ('internal_group', '=', 'off_balance')]
          const { account_type, internal_group } = record
          return (
            ['asset_cash', 'liability_credit_card'].includes(account_type) ||
            internal_group === 'off_balance'
          )
        }
      },
      non_trade: {
        widget: 'boolean_toggle',
        optional: 'hide',
        invisible({ record }) {
          // 'invisible':
          // [('account_type', 'not in',
          // ('liability_payable', 'asset_receivable'))]
          const { account_type } = record
          return ['liability_payable', 'asset_receivable'].includes(
            account_type
          )
        }
      },
      tax_ids: { optional: 'hide', widget: 'many2many_tags' },
      tag_ids: { optional: 'hide', widget: 'many2many_tags' },
      allowed_journal_ids: { optional: 'hide', widget: 'many2many_tags' },
      currency_id: { groups: 'base.group_multi_currency' },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  view_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        _div_button_box: {
          _button_action_open_related_taxes: {
            _attr: {
              name: 'action_open_related_taxes',
              type: 'object',
              icon: 'fa-bars',
              invisible({ record }) {
                // {'invisible':
                // [('related_taxes_amount', '=', 0)]
                const { related_taxes_amount } = record
                return !related_taxes_amount
              }
            },

            related_taxes_amount: { string: 'Taxes' }
          },

          _button_account_action_move_line_select: {
            _attr: {
              name: 'account.action_move_line_select',
              type: 'action',
              icon: 'fa-bars'
            },

            current_balance: { string: 'Balance' }
          }
        },
        company_id: { invisible: 1 },

        _div: {
          _h1: {
            code: { string: 'Code', placeholder: 'e.g. 101000' },
            name: { string: 'Account Name', placeholder: 'e.g. Current Assets' }
          }
        },

        _notebook: {
          _page: {
            _attr: { name: 'accounting', string: 'Accounting' },
            _group: {
              _group_type: {
                account_type: { widget: 'account_type_selection' },

                tax_ids: {
                  widget: 'many2many_tags',
                  invisible({ record }) {
                    // 'invisible':
                    // [('internal_group', '=', 'off_balance')]
                    const { internal_group } = record
                    return internal_group === 'off_balance'
                  }
                },
                tag_ids: {
                  widget: 'many2many_tags'
                },
                allowed_journal_ids: { widget: 'many2many_tags' }
              },
              _group_type2: {
                internal_group: { invisible: 1, readonly: '1' },
                currency_id: { groups: 'base.group_multi_currency' },
                deprecated: {},
                group_id: {},
                company_id: { groups: 'base.group_multi_company' }
              }
            }
          }
        }
      }
    }
  },

  view_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            // ['|', ('name','ilike',self), ('code','ilike',self)]
            return ['|', ['name', 'ilike', self], ['code', '=like', `${self}%`]]
          }
        }
      },

      filters: {
        group_type: {
          receivableacc: {
            string: '应收科目',
            domain: [['account_type', '=', 'asset_receivable']]
          },

          payableacc: {
            string: '应付科目',
            domain: [['account_type', '=', 'liability_payable']]
          },

          equityacc: {
            string: '权益',
            domain: [['internal_group', '=', 'equity']]
          },

          assetsacc: {
            string: '资产',
            domain: [['internal_group', '=', 'asset']]
          },
          liabilityacc: {
            string: '负债',
            domain: [['internal_group', '=', 'liability']]
          },
          incomeacc: {
            string: '收入',
            domain: [['internal_group', '=', 'income']]
          },
          expensesacc: {
            string: '费用',
            domain: [['internal_group', '=', 'expense']]
          }
        },

        group_active: {
          used: {
            string: '有分录的会计科目',
            domain: [['used', '=', true]]
          },
          activeacc: {
            string: '可用的会计科目',
            domain: [['deprecated', '=', false]]
          }
        }
      }
    }
  },

  action_account_form: {
    _odoo_model: 'ir.actions',
    name: 'Chart of Accounts',
    type: 'ir.actions.act_window',
    res_model: 'account.account',
    search_view_id: 'view_account_search',
    domain: [],
    context: { search_default_activeacc: true },
    views: {
      tree: 'view_account_list',
      form: 'view_account_form'
    }
  }
}
