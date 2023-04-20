export default {
  product_supplierinfo_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {},
        partner_id: {},
        product_id: {},
        product_tmpl_id: {},
        product_name: {},
        product_code: {},
        date_start: {},
        date_end: {},
        company_id: {},
        min_qty: {},
        product_uom: {},
        price: {},
        currency_id: {},
        delay: {}
      }
    }
  },
  product_supplierinfo_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_vendor: {
            _attr: { name: 'vendor', string: 'Vendor' },
            partner_id: { context: { res_partner_search_mode: 'supplier' } },
            product_name: {},
            product_code: {},
            delay: {},
            _span: { _attr: { text: 'days' } }
          },
          _group_pricelist: {
            _attr: { string: 'Pricelist' },
            product_tmpl_id: {
              string: 'Product',
              invisible({ context }) {
                // invisible="context.get('visible_product_tmpl_id', True)"
                return context.visible_product_tmpl_id
              }
            },
            product_id: { groups: 'product.group_product_variant' },
            _div: {
              _attr: { class: 'o_row' },
              min_qty: {},
              product_uom: { groups: 'uom.group_uom' }
            },
            _div_price: {
              _attr: { class: 'o_row' },
              price: { string: 'Unit Price' },
              currency_id: { groups: 'base.group_multi_currency' }
            },
            _div_date: {
              _attr: { class: 'o_row' },
              date_start: { string: 'Validity' },
              _span: { _attr: { text: 'to' } },
              date_end: { nolabel: 1 }
            },
            company_id: {}
          }
        }
      }
    }
  },

  product_supplierinfo_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    type: 'search',
    arch: {
      fields: {
        partner_id: { _default: 1 },
        product_tmpl_id: {}
      },

      filters: {
        group_product: {
          active_products: {
            string: 'Active Products',
            domain: [
              '|',
              ('product_tmpl_id.active', '=', true),
              ('product_id.active', '=', true)
            ]
          }
        },

        group_active: {
          active: {
            string: 'Active',
            domain({ env }) {
              const last_date = env.date_tools.increase(new Date(), -1)
              // [
              // '|',
              // ('date_end', '=', False),
              // ('date_end', '&gt;=',
              //         (context_today() - datetime.timedelta(days=1)).strftime('%Y-%m-%d'))
              // ]
              return [
                '|',
                ['date_end', '=', false],
                ['date_end', '>', last_date]
              ]
            }
          },

          archived: {
            string: 'Archived',
            domain({ env }) {
              const last_date = env.date_tools.increase(new Date(), -1)

              // [
              // ('date_end', '&lt;',
              //    (context_today() - datetime.timedelta(days=1)).strftime('%Y-%m-%d'))
              // ]
              return [['date_end', '<', last_date]]
            }
          }
        }
      }
    }
  },

  product_supplierinfo_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendor Pricelists',
    type: 'ir.actions.act_window',
    res_model: 'product.supplierinfo',
    search_view_id: 'product_supplierinfo_search_view',
    domain: [],
    context: { visible_product_tmpl_id: false },
    views: {
      tree: 'product_supplierinfo_tree_view',
      form: 'product_supplierinfo_form_view'
    }
  }
}
