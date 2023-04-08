export default {
  view_account_journal_search: {
    arch: {
      filters: {
        group_dashboard: {
          dashboard: { string: '已归档' }
        },

        group_type: {
          sales: { string: '销售' },
          purchases: { string: '采购' },
          liquidity: { string: '流动' },
          miscellaneous: { string: '杂项' }
        },

        group_active: { inactive: { string: '已归档' } }
      }
    }
  }
}
