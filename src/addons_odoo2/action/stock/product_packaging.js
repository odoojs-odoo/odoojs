export default {
  product_packaging_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='name']",
            position: 'after'
          },
          package_type_id: {
            groups: 'stock.group_tracking_lot'
          },
          route_ids: {
            widget: 'many2many_tags',
            groups: 'stock.group_adv_location'
          }
        }
      }
    }
  },

  product_packaging_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//label[@for='qty']",
            position: 'before'
          },
          package_type_id: {
            groups: 'stock.group_tracking_lot'
          }
        },
        _xpath_559: {
          _attr: {
            expr: "//group[@name='qty']",
            position: 'after'
          },
          _group_logistic: {
            _attr: {
              name: 'logistic'
            },
            route_ids: {
              widget: 'many2many_tags',
              groups: 'stock.group_adv_location'
            }
          }
        }
      }
    }
  }
}
