export default {
  product_template_form_view_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'purchase.view_product_supplier_inherit',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='bill']",
            position: 'before'
          },
          _group: {
            _attr: {
              string: 'Reordering',
              invisible: [['type', '!=', 'service']]
            },
            _div: {
              _attr: {
                class: 'o_td_label d-inline-flex'
              },
              _label_service_to_purchase: {
                for: 'service_to_purchase'
              },
              service_to_purchase: {},
              _span: {
                _attr: {
                  title: 'Service to Purchase',
                  class: 'fa fa-lg fa-building-o fa-fw'
                }
              }
            }
          }
        }
      }
    }
  }
}
