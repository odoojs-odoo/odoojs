export default {
  menu_account_setting: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_setting',
    name: 'Account Setting',
    sequence: 16,
    children: {
      menu_action_incoterms_tree: {
        name: 'Incoterms',
        action: 'account.action_incoterms_tree'
      },
      menu_action_account_tax_template_form: {
        name: 'Tax Templates',
        action: 'account.action_account_tax_template_form'
      },
      menu_action_account_journal_group_list: {
        name: 'Journal Groups',
        action: 'account.action_account_journal_group_list'
      },
      menu_action_account_journal_form: {
        name: 'Journals',
        action: 'account.action_account_journal_form'
      },
      menu_action_account_account_tag: {
        name: 'Account Tags',
        action: 'account.action_account_account_tag'
      },
      menu_action_account_group_action: {
        name: 'Account Groups',
        action: 'account.action_account_group_action'
      },
      menu_action_account_form: {
        name: 'Chart of Accounts',
        action: 'account.action_account_form'
      },
      menu_action_account_fiscal_position_template: {
        name: 'Fiscal Position Templates',
        action: 'account.action_account_fiscal_position_template'
      },
      menu_action_account_fiscal_position_form: {
        name: 'Fiscal Positions',
        action: 'account.action_account_fiscal_position_form'
      },
      menu_action_payment_term_form: {
        name: 'Payment Terms',
        action: 'account.action_payment_term_form'
      }
    }
  }
}
