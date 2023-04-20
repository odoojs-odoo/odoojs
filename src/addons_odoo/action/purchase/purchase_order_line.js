export default {
  purchase_order_line_form2: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order.line',
    type: 'form',
    arch: {
      sheet: {
        _label_order_id: { for: 'order_id' },
        _h1: {
          order_id: {},
          _label_date_order: {
            for: 'date_order',
            string: ','
            // invisible: [['date_order', '=', false]]
          },
          date_order: {}
        },
        _label_partner_id: { for: 'partner_id' },
        _h2: { partner_id: {} },
        _group: {
          _group: {
            product_id: { readonly: '1' },
            _label_product_qty: { for: 'product_qty' },
            _div: {
              product_qty: { readonly: '1' },
              product_uom: {
                groups: 'uom.group_uom',
                readonly: '1'
              }
            },
            price_unit: {}
          },
          _group_574: {
            taxes_id: {
              widget: 'many2many_tags',
              domain: [['type_tax_use', '=', 'purchase']]
            },
            date_planned: { widget: 'date', readonly: '1' },
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
          _attr: {
            string: 'Manual Invoices'
          }
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
      fields: {
        order_id: {},
        product_id: {},
        partner_id: { string: 'Vendor' }
      },

      filters: {
        group_me_hide_cancelled: {
          hide_cancelled: {
            name: 'hide_cancelled',
            string: 'Hide cancelled lines',
            domain: [['state', '!=', 'cancel']]
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
    name: 'Purchase Lines',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order.line',
    search_view_id: 'purchase_order_line_search',

    context: {},
    views: {
      tree: 'purchase.purchase_history_tree',
      form: 'purchase_order_line_form2'
    }
  }
}
