export default {
  view_stock_move_operations_raw: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    inherit_id: 'stock.view_stock_move_operations',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//label[@for='product_uom_qty']",
            position: 'attributes'
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Total To Consume',
              string: 'Total To Consume'
            }
          }
        },
        _xpath_833: {
          _attr: {
            expr: "//label[@for='quantity_done']",
            position: 'attributes'
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Consumed',
              string: 'Consumed'
            }
          }
        }
      }
    }
  },

  view_stock_move_operations_finished: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    inherit_id: 'stock.view_stock_move_operations',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//label[@for='product_uom_qty']",
            position: 'attributes'
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'To Produce',
              string: 'To Produce'
            }
          }
        },
        _xpath_703: {
          _attr: {
            expr: "//label[@for='quantity_done']",
            position: 'attributes'
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Produced',
              string: 'Produced'
            }
          }
        }
      }
    }
  }
}
