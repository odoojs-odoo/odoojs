export default {
  view_account_journal_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'tree',
    fields: {
      // company_id: { invisible: '1' },
      sequence: { widget: 'handle' },
      name: {},
      excluded_journal_ids: { widget: 'many2many_tags' },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  view_account_journal_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          // company_id: { invisible: '1' },
          name: { placeholder: 'e.g. GAAP, IFRS, ...' },
          excluded_journal_ids: { widget: 'many2many_tags' },
          sequence: { groups: 'base.group_no_one' },
          company_id: { groups: 'base.group_multi_company' }
        }
      }
    }
  },

  action_account_journal_group_list: {
    _odoo_model: 'ir.actions',
    name: 'Journal Groups',
    type: 'ir.actions.act_window',
    res_model: 'account.journal.group',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_journal_group_tree',
      form: 'view_account_journal_group_form'
    }
  }
}
