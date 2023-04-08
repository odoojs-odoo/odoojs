export default {
  view_account_analytic_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'search',
    arch: {
      fields: {
        name: { string: '分析科目' },
        partner_id: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档' }
        }
      }
    }
  }
}
