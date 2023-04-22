export default {
  stock_scrap_view_form2_mrp_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    inherit_id: 'stock.stock_scrap_form_view2',
    arch: {
      sheet: {
        owner_id: {
          position: 'after',
          __todo__after: {
            workorder_id: { invisible: '1' },
            production_id: { invisible: '1' }
          }
        }
      }
    }
  },

  stock_scrap_view_form_mrp_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    inherit_id: 'stock.stock_scrap_form_view',
    arch: {
      sheet: {
        owner_id: {
          position: 'after',
          __todo__after: {
            workorder_id: {
              domain: { todo_ctx: "[('production_id', '=', product_id)]" },
              invisible: [['workorder_id', '=', false]]
            },
            production_id: {
              domain: { todo_ctx: "[('company_id', '=', company_id)]" },
              invisible: [['production_id', '=', false]]
            }
          }
        }
      }
    }
  },

  stock_scrap_search_view_inherit_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.scrap',
    inherit_id: 'stock.stock_scrap_search_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//filter[@name='transfer']",
            position: 'after'
          },
          _filter_production_id: {
            _attr: {
              name: 'production_id',
              string: 'Manufacturing Order',
              domain: [],
              context: { group_by: 'production_id' }
            }
          }
        }
      }
    }
  }
}
