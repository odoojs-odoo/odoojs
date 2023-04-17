export default {
  view_account_journal_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal',
    type: 'tree',
    fields: {
      sequence: {},
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
    fields: {
      sequence: {},
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
        group1: {
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

        group2: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_account_journal_form: {
    _odoo_model: 'ir.actions',
    name: '日记账',
    type: 'ir.actions.act_window',
    res_model: 'account.journal',
    domain: [],
    context: {}
  },

  view_account_journal_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      excluded_journal_ids: { widget: 'many2many_tags' },
      company_id: {}
    }
  },

  view_account_journal_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'form',
    fields: {
      name: {},
      excluded_journal_ids: { widget: 'many2many_tags' },
      sequence: {},
      company_id: {}
    }
  },

  action_account_journal_group_list: {
    _odoo_model: 'ir.actions',
    name: '日记账组',
    type: 'ir.actions.act_window',
    res_model: 'account.journal.group',
    domain: [],
    context: {}
  }
}
