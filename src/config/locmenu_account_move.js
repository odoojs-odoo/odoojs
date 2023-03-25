export default {
  id: 'odoo.account_move',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Account Move', zh_CN: '财务', zh_HK: '财务' },
  children: [
    {
      action: 'account.action_account_moves_all',
      id: 'odoo_account.action_account_moves_all',
      icon: 'shopping',
      name: { en_US: 'Journal Items', zh_CN: '会计分录', zh_HK: '会计分录' }
    },
    {
      action: 'account.action_move_journal_line',
      id: 'odoo_account.action_move_journal_line',
      icon: 'shopping',
      name: { en_US: 'Journal Entries', zh_CN: '会计凭证', zh_HK: '会计凭证' }
    },

    {
      action: 'account.action_move_out_invoice_type',
      id: 'odoo_account.action_move_out_invoice_type',
      icon: 'shopping',
      name: { en_US: 'Invoices', zh_CN: '销售结单', zh_HK: '销售结单' }
    },

    {
      action: 'account.action_move_in_invoice_type',
      id: 'odoo_account.action_move_in_invoice_type',
      icon: 'shopping',
      name: { en_US: 'Bills', zh_CN: '采购账单', zh_HK: '采购账单' }
    }
  ]
}
