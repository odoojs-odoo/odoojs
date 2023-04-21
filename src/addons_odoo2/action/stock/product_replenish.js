export default {
  view_product_replenish: {
    _odoo_model: 'ir.ui.view',
    model: 'product.replenish',
    type: 'form',
    arch: {
      sheet: {
        _p: 'Use this assistant to replenish your stock.\n                Depending on your product configuration, launching a replenishment may trigger a request for quotation,\n                a manufacturing order or a transfer.',
        _group: {
          product_tmpl_id: { invisible: '1' },
          product_has_variants: { invisible: '1' },
          product_id: {
            domain: { todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]" },
            readonly: [['product_has_variants', '=', false]],
            no_create_edit: 1
          },
          product_uom_category_id: { invisible: '1' },
          _label_quantity: { for: 'quantity' },
          _div: {
            _attr: { class: 'o_row' },
            quantity: {},
            product_uom_id: {
              groups: 'uom.group_uom',
              domain: { todo_ctx: "[('category_id', '=', product_uom_category_id)]" }
            }
          },
          date_planned: {},
          warehouse_id: { groups: 'stock.group_stock_multi_warehouses' },
          route_ids: { widget: 'many2many_tags' },
          company_id: { invisible: '1' }
        },
        _footer: {
          _button_launch_replenishment: {
            _attr: {
              name: 'launch_replenishment',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_product_replenish: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Replenish',
    type: 'ir.actions.act_window',
    res_model: 'product.replenish',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'view_product_replenish',
      form: '=======todo=========='
    }
  }
}
