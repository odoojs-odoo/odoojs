export default {
  res_bank_view_search: {
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档' }
        }
      }
    }
  },

  view_partner_bank_search: {
    arch: {
      fields: {
        bank_name: { string: '銀行名稱' },
        company_id: { string: '公司' },
        partner_id: { string: '參與人' }
      },
      filters: {
        group_active: {
          inactive: { string: '已归档' }
        }
      }
    }
  }
}
