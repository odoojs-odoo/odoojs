export default {
  view_mrp_production_split_multi_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.production.split.multi',
    type: 'form',
    arch: {
      sheet: {
        production_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  production_id: {},
                  product_id: {},
                  product_qty: {},
                  production_capacity: {},
                  product_uom_id: { groups: 'uom.group_uom' },
                  _button_action_prepare_split: {
                    _attr: {
                      name: 'action_prepare_split',
                      type: 'object',
                      title: 'Split Production',
                      icon: 'fa-scissors'
                    }
                  }
                }
              }
            }
          }
        },
        _footer: {
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

  action_mrp_production_split_multi: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Split productions',
    type: 'ir.actions.act_window',
    res_model: 'mrp.production.split.multi',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
