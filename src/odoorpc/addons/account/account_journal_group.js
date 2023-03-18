export default {
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
    arch: {
      sheet: {
        _title: {
          display_name: {}
        },
        _group_name: {
          name: {},
          excluded_journal_ids: {
            widget: 'many2many_tags'
          },
          sequence: {},
          company_id: {}
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
