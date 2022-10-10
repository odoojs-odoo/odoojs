export default {
  view_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      code: {},
      name: {},
      user_type_id: {},
      reconcile: {},
      //   tax_ids: {},
      //   tag_ids: {},
      //   currency_id: {},
      company_id: {}
      //   action_read_account: {}
    }
  },

  view_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.account',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },
    fields: {
      company_id: {},
      code: {},
      name: {},
      user_type_id: {},
      tax_ids: {
        widget: 'many2many_tags',
        domain: record => {
          const { company_id } = record
          return [['company_id', '=', company_id]]
        }
      },
      tag_ids: {
        widget: 'many2many_tags',
        domain: () => {
          return [['applicability', '=', 'accounts']]
        }
      },

      allowed_journal_ids: {
        widget: 'many2many_tags',
        domain: record => {
          const { company_id } = record
          return [['company_id', '=', company_id]]
        }
      },

      reconcile: {},

      currency_id: {},
      deprecated: {},
      group_id: {}
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
            return ['|', ['name', 'ilike', self], ['code', '=like', `${self}%`]]
          }
        },
        user_type_id: {}
      },

      filters: {
        group1: {
          receivableacc: {
            string: '应收科目',
            domain: [['internal_type', '=', 'receivable']]
          },

          payableacc: {
            string: '应付科目',
            domain: [['internal_type', '=', 'payable']]
          },

          equityacc: {
            string: '权益',
            domain: [['internal_type', '=', 'equity']]
          },

          assetsacc: {
            string: '资产',
            domain: [['internal_type', '=', 'asset']]
          },
          liabilityacc: {
            string: '负债',
            domain: [['internal_type', '=', 'liability']]
          },
          incomeacc: {
            string: '收入',
            domain: [['internal_type', '=', 'income']]
          },
          expensesacc: {
            string: '费用',
            domain: [['internal_type', '=', 'expense']]
          }
        },

        group2: {
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
    name: '会计科目',
    type: 'ir.actions.act_window',
    res_model: 'account.account',
    search_view_id: 'view_account_search',
    domain: [],
    context: { search_default_activeacc: true }
  }
}
