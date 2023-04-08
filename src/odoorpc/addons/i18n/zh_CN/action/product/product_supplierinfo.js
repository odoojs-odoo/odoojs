export default {
  product_supplierinfo_search_view: {
    arch: {
      fields: {
        partner_id: {},
        product_tmpl_id: {}
      },

      filters: {
        group_product: {
          active_products: { string: 'Active Products' }
        },

        group_active: {
          active: { string: '激活的' },
          archived: { string: '已归档' }
        }
      }
    }
  }
}
