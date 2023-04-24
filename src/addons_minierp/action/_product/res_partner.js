export default {
  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: '_base.view_partner_form',
    type: 'form',
    arch: {
      sheet: {
        _notebook: {
          _page_sales_purchases: {
            _group_container_row_2: {
              _group_sales_purchases: {
                _group_sale: {
                  user_id: {},
                  property_product_pricelist: {
                    //   groups: 'product.group_product_pricelist',
                    invisible: ({ record }) => {
                      // 'invisible': [('is_company','=',False),
                      // ('parent_id','!=',False)]
                      const { is_company, parent_id } = record
                      return !is_company && parent_id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
