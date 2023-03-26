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
    },

    {
      action: 'account.action_account_payments',
      id: 'odoo_account.action_account_payments',
      icon: 'shopping',
      name: { en_US: 'Payments In', zh_CN: '收款/退款', zh_HK: '收款/退款' }
    },
    {
      action: 'account.action_account_payments_payable',
      id: 'odoo_account.action_account_payments_payable',
      icon: 'shopping',
      name: { en_US: 'Payments Out', zh_CN: '支付/退款', zh_HK: '支付/退款' }
    },
    {
      action: 'account.action_account_payments_transfer',
      id: 'odoo_account.action_account_payments_transfer',
      icon: 'shopping',
      name: {
        en_US: 'Internal Transfers',
        zh_CN: '内部转账',
        zh_HK: '内部转账'
      }
    }
  ]
}
