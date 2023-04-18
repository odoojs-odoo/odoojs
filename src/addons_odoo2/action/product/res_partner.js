export default {
  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _group_sale: {
          _attr: {
            name: 'sale'
          },
          property_product_pricelist: {
            groups: 'product.group_product_pricelist',
            invisible: [['is_company', '=', false], ['parent_id', '!=', false]]
          },
          _div_parent_pricelists: {
            _attr: {
              name: 'parent_pricelists',
              groups: 'product.group_product_pricelist',
              invisible: ['|', ['is_company', '=', true], ['parent_id', '=', false]]
            },
            _p: {
              _attr: {
                text: 'Pricelists are managed on'
              },
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
