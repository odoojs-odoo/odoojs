export default {
  view_mrp_production_split_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production.split',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            production_id: { readonly: '1' }
          },
          _group_339: {
            product_id: {},
            _label_product_qty: { for: 'product_qty' },
            _div: {
              _attr: { class: 'o_row' },
              _span: {
                product_qty: {}
              },
              _span_826: {
                product_uom_id: { groups: 'uom.group_uom' }
              }
            }
          },
          _group_384: {
            counter: {}
          },
          _group_280: {
            _label_production_capacity: { for: 'production_capacity' },
            _div: {
              _attr: { class: 'o_row' },
              _span: {
                production_capacity: {}
              },
              _span_948: {
                product_uom_id: { groups: 'uom.group_uom' }
              }
            }
          }
        },
        production_detailed_vals_ids: {
          invisible: [['counter', '=', 0]],
          views: {
            tree: {
              arch: {
                sheet: {
                  date: {},
                  user_id: {},
                  quantity: {}
                }
              }
            }
          }
        },
        production_split_multi_id: { invisible: '1' },
        valid_details: { invisible: '1' },
        _footer: {
          _button_action_split: {
            _attr: {
              name: 'action_split',
              type: 'object',
              string: 'Split',
              invisible: [['valid_details', '=', false]],
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              invisible: [['production_split_multi_id', '!=', false]],
              class: 'btn-secondary'
            }
          },
          _button_action_return_to_list: {
            _attr: {
              name: 'action_return_to_list',
              type: 'object',
              string: 'Discard',
              invisible: [['production_split_multi_id', '=', false]],
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_mrp_production_split: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Split production',
    type: 'ir.actions.act_window',
    res_model: 'mrp.production.split',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
