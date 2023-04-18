export default {
  view_change_product_quantity: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.change.product.qty',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          product_tmpl_id: {
            invisible: '1'
          },
          product_variant_count: {
            invisible: '1'
          },
          product_id: {
            invisible: [['product_variant_count', '=', 1]],
            domain: {
              todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
            },
            no_open: true,
            no_create: true
          },
          new_quantity: {}
        },
        _footer: {
          _button_change_product_qty: {
            _attr: {
              name: 'change_product_qty',
              string: 'Apply',
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_change_product_quantity: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Change Product Quantity',
    res_model: 'stock.change.product.qty',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
