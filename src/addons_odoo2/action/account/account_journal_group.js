export default {
  view_account_journal_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        sequence: {
          widget: 'handle'
        },
        name: {},
        excluded_journal_ids: {
          widget: 'many2many_tags',
          no_create: true
        },
        _field_company_id_903: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        }
      }
    }
  },

  view_account_journal_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.journal.group',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          company_id: {
            invisible: '1'
          },
          name: {
            placeholder: 'e.g. GAAP, IFRS, ...'
          },
          excluded_journal_ids: {
            widget: 'many2many_tags',
            no_create: true
          },
          sequence: {
            groups: 'base.group_no_one'
          },
          _field_company_id_998: {
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  action_account_journal_group_list: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Groups',
    res_model: 'account.journal.group',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
