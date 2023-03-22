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
      account_type: {},
      group_id: {},
      internal_group: { invisible: 1 },
      // reconcile: {},
      // non_trade: {},
      // tax_ids: {},
      // tag_ids: {},
      allowed_journal_ids: {},
      currency_id: {},
      company_id: {}
    }
  },

  view_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_button_box: {
          related_taxes_amount: {},
          current_balance: {}
        },

        _group_name: {
          code: {},
          name: {}
        },

        _group_type: {
          account_type: { widget: 'account_type_selection' },
          company_id: { invisible: 1 },
          tax_ids: { widget: 'many2many_tags' },
          tag_ids: { widget: 'many2many_tags' },
          allowed_journal_ids: { widget: 'many2many_tags' }
        },
        _group_type2: {
          internal_group: { invisible: 1 },
          currency_id: {},
          deprecated: {},
          group_id: {},
          company_id: {}
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
