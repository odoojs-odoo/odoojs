export default {
  view_order_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.line',
    type: 'tree',
    arch: {
      sheet: {
        order_id: {},
        order_partner_id: {},
        name: {},
        salesman_id: {},
        product_uom_qty: {
          string: 'Qty'
        },
        qty_delivered: {},
        qty_invoiced: {},
        qty_to_invoice: {},
        product_uom: {
          string: 'Unit of Measure',
          groups: 'uom.group_uom'
        },
        price_subtotal: {
          widget: 'monetary'
        },
        currency_id: {
          invisible: '1'
        }
      }
    }
  },

  sale_order_line_view_form_readonly: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.line',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            display_name: {}
          }
        },
        _group: {
          _group: {
            order_id: {},
            product_id: {},
            name: {},
            product_uom_qty: {},
            qty_delivered: {},
            qty_invoiced: {},
            product_uom: {},
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            order_partner_id: {
              invisible: '1'
            },
            display_type: {
              invisible: '1'
            },
            product_updatable: {
              invisible: '1'
            }
          },
          _group_813: {
            price_unit: {},
            discount: {
              groups: 'product.group_discount_per_so_line'
            },
            price_subtotal: {
              widget: 'monetary'
            },
            tax_id: {
              widget: 'many2many_tags'
            },
            price_tax: {
              widget: 'monetary'
            },
            price_total: {
              widget: 'monetary'
            },
            currency_id: {
              invisible: '1'
            }
          }
        }
      }
    }
  },

  view_sales_order_line_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.line',
    type: 'search',
    arch: {
      _filter_to_invoice: {
        _attr: {
          name: 'to_invoice',
          string: 'To Invoice',
          domain: [['qty_to_invoice', '!=', 0]]
        }
      },
      _separator: {},
      _filter_my_sales_order_lines: {
        _attr: {
          name: 'my_sales_order_lines',
          string: 'My Sales Order Lines',
          domain: {
            todo_ctx: "[('salesman_id','=',uid)]"
          }
        }
      },
      order_id: {},
      order_partner_id: {},
      product_id: {},
      salesman_id: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_product: {
          _attr: {
            name: 'product',
            string: 'Product',
            domain: [],
            context: {
              group_by: 'product_id'
            }
          }
        },
        _filter_order: {
          _attr: {
            name: 'order',
            string: 'Order',
            domain: [],
            context: {
              group_by: 'order_id'
            }
          }
        },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            domain: [],
            context: {
              group_by: 'salesman_id'
            }
          }
        }
      }
    }
  },

  sale_order_line_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order.line',
    type: 'otherview',
    arch: {}
  }
}
