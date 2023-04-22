export default {
  product_supplierinfo_replenishment_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    inherit_id: 'product.product_supplierinfo_tree_view',
    arch: {
      sheet: {
        delay: {
          position: 'after',
          __todo__after: {
            show_set_supplier_button: { invisible: '1' },
            last_purchase_date: {},
            _button_action_set_supplier: {
              _attr: {
                name: 'action_set_supplier',
                type: 'object',
                string: 'Set as Supplier',
                invisible: [['show_set_supplier_button', '=', false]],
                context: { todo_ctx: "{'orderpoint_id': parent.orderpoint_id, 'stock_replenishment_info_id': parent.id}" },
                class: 'btn btn-link'
              }
            }
          }
        },
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_decoration$dash$bf: {
            _attr: {
              name: 'decoration-bf',
              text: 'parent.supplierinfo_id == id',
              decoration-bf: 'parent.supplierinfo_id == id'
            }
          }
        },
        min_qty: {
          position: 'attributes',
          __todo__decoration-danger: 'min_qty > parent.qty_to_order'
        },
        company_id: {
          position: 'attributes',
          __todo__optional: 'hide'
        },
        _field_delay_505: {
          delay: {
            position: 'attributes',
            __todo__optional: 'show'
          }
        }
      }
    }
  }
}
