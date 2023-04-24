export default {
  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },
    arch: {
      sheet: {
        _notebook: {
          _page_sales_purchases: {
            _group_container_row_2: {
              _group_sales_purchases: {
                _group_sale: {
                  user_id: {},
                  property_product_pricelist: {
                    groups: 'product.group_product_pricelist',
                    invisible: ({ record }) => {
                      // 'invisible': [('is_company','=',False),
                      // ('parent_id','!=',False)]
                      const { is_company, parent_id } = record
                      return !is_company && parent_id
                    }
                  },
                  _div_parent_pricelists: {
                    _attr: {
                      name: 'parent_pricelists',
                      groups: 'product.group_product_pricelist',
                      invisible: ({ record }) => {
                        // invisible: [
                        //   '|',
                        //   ['is_company', '=', true],
                        //   ['parent_id', '=', false]
                        // ]
                        const { is_company, parent_id } = record
                        return is_company || !parent_id
                      }
                    },
                    _p: {
                      _attr: { text: 'Pricelists are managed on' },
                      _button_open_commercial_entity: {
                        _attr: {
                          name: 'open_commercial_entity',
                          type: 'object',
                          string: 'the parent company',
                          class: 'oe_link'
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
  }
}
