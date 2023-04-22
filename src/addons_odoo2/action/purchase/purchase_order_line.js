export default {
  purchase_order_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    type: 'tree',
    arch: {
      sheet: {
        order_id: {},
        name: {},
        partner_id: { string: 'Vendor' },
        product_id: {},
        price_unit: {},
        product_qty: {},
        product_uom: { groups: 'uom.group_uom' },
        price_subtotal: { widget: 'monetary' },
        currency_id: { invisible: '1' },
        date_planned: { widget: 'date' }
      }
    }
  },

  purchase_order_line_form2: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    type: 'form',
    arch: {
      sheet: {
        _label_order_id: { for: 'order_id' },
        _h1: {
          order_id: { class: 'oe_inline' },
          _label_date_order: {
            for: 'date_order',
            string: ',',
            invisible: [['date_order', '=', false]]
          },
          date_order: { class: 'oe_inline' }
        },
        _label_partner_id: { for: 'partner_id' },
        _h2: {
          partner_id: {}
        },
        _group: {
          _group: {
            product_id: { readonly: '1' },
            _label_product_qty: { for: 'product_qty' },
            _div: {
              _attr: { class: 'o_row' },
              product_qty: { readonly: '1' },
              product_uom: {
                groups: 'uom.group_uom',
                readonly: '1'
              }
            },
            price_unit: {}
          },
          _group_384: {
            taxes_id: {
              widget: 'many2many_tags',
              domain: [['type_tax_use', '=', 'purchase']]
            },
            date_planned: {
              widget: 'date',
              readonly: '1'
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            analytic_distribution: {
              widget: 'analytic_distribution',
              groups: 'analytic.group_analytic_accounting',
              product_field: 'product_id',
              business_domain: 'purchase_order'
            }
          }
        },
        name: {},
        _separator: {
          _attr: { string: 'Manual Invoices' }
        },
        invoice_lines: {}
      }
    }
  },

  purchase_order_line_search: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    type: 'search',
    arch: {
      order_id: {},
      product_id: {},
      partner_id: { string: 'Vendor' },
      _filter_hide_cancelled: {
        _attr: {
          name: 'hide_cancelled',
          string: 'Hide cancelled lines',
          domain: [['state', '!=', 'cancel']]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_groupby_supplier: {
          _attr: {
            name: 'groupby_supplier',
            string: 'Vendor',
            domain: [],
            context: { group_by: 'partner_id' }
          }
        },
        _filter_groupby_product: {
          _attr: {
            name: 'groupby_product',
            string: 'Product',
            domain: [],
            context: { group_by: 'product_id' }
          }
        },
        _filter_order_reference: {
          _attr: {
            name: 'order_reference',
            string: 'Order Reference',
            domain: [],
            context: { group_by: 'order_id' }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: { group_by: 'state' }
          }
        }
      }
    }
  },

  purchase_history_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    type: 'tree',
    arch: {
      sheet: {
        order_id: { widget: 'many2one' },
        date_approve: { widget: 'date' },
        partner_id: {},
        product_uom_qty: {},
        price_unit: {}
      }
    }
  },

  action_purchase_history: {
    _odoo_model: 'ir.actions.act_window',
    res_model: 'purchase.order.line',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: 'purchase.purchase_history_tree',
      form: '=======todo=========='
    }
  }
}
