export default {
  product_category_form_view_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'product.category',
    inherit_id: 'product.product_category_form_view',
    arch: {
      sheet: {
        _div_button_box: {
          _button_category_open_putaway: {
            _attr: {
              name: 'category_open_putaway',
              type: 'action',
              string: 'Putaway Rules',
              icon: 'fa-random',
              groups: 'stock.group_stock_multi_locations',
              class: 'oe_stat_button'
            }
          }
        },
        _group_first: {},

        _group: {
          _group_logistics: {
            _attr: { name: 'logistics', string: 'Logistics' },
            route_ids: {
              widget: 'many2many_tags',
              groups: 'stock.group_adv_location'
            },
            total_route_ids: {
              widget: 'many2many_tags',
              groups: 'stock.group_adv_location'
              // invisible: [['parent_id', '=', false]]
            },
            removal_strategy_id: {},
            packaging_reserve_method: {
              widget: 'radio',
              groups: 'product.group_stock_packaging'
            }
          }
        }
      }
    }
  }
}
