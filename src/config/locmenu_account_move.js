export default {
  id: 'odoo.account_move',
  icon: 'shopping',
  theme: 'twoTone',
  name: { en_US: 'Account Move', zh_CN: '财务', zh_HK: '财务' },
  children: [
    {
      action: 'account.action_move_journal_line',
      id: 'odoo_account.action_move_journal_line',
      icon: 'shopping',
      name: {
        en_US: 'Journal Entries',
        zh_CN: '会计分录',
        zh_HK: '会计分录'
      }
    }
  ]
}
