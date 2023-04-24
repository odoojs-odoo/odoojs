export default {
  view_account_journal_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'tree',
    arch: {
      sheet: {
        // company_id: { invisible: '1' },
        sequence: { widget: 'handle' },
        name: {},
        excluded_journal_ids: { widget: 'many2many_tags' },
        company_id: {}
      }
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
          name: {},
          excluded_journal_ids: { widget: 'many2many_tags' },
          sequence: {},
          company_id: {}
        }
      }
    }
  },

  action_account_journal_group_list: {
    _odoo_model: 'ir.actions.act_window',
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
