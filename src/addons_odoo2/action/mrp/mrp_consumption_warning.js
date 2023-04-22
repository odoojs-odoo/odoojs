export default {
  view_mrp_consumption_warning_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.consumption.warning',
    type: 'form',
    arch: {
      sheet: {
        mrp_production_ids: { invisible: '1' },
        consumption: { invisible: '1' },
        mrp_production_count: { invisible: '1' },
        _div: {
          _attr: {
            class: 'm-2',
            text: 'You consumed a different quantity than expected for the following products.'
          },
          _b: {
            _attr: {
              invisible: [['consumption', '=', 'strict']],
              text: 'Please confirm it has been done on purpose.'
            }
          },
          _b_634: {
            _attr: {
              invisible: [['consumption', '!=', 'strict']],
              text: ['Please review your component consumption or ask a manager to validate', '.']
            },
            _span: {
              _attr: {
                invisible: [['mrp_production_count', '!=', 1]],
                text: 'this manufacturing order'
              }
            },
            _span_149: {
              _attr: {
                invisible: [['mrp_production_count', '=', 1]],
                text: 'these manufacturing orders'
              }
            }
          }
        },
        mrp_consumption_warning_line_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  mrp_production_id: {
                    column_invisible: [['parent.mrp_production_count', '=', 1]],
                    force_save: '1'
                  },
                  consumption: {
                    invisible: '1',
                    force_save: '1'
                  },
                  product_id: { force_save: '1' },
                  product_uom_id: {
                    groups: 'uom.group_uom',
                    force_save: '1'
                  },
                  product_expected_qty_uom: { force_save: '1' },
                  product_consumed_qty_uom: { force_save: '1' }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_confirm: {
            _attr: {
              name: 'action_confirm',
              type: 'object',
              string: 'Force',
              groups: 'mrp.group_mrp_manager',
              invisible: [['consumption', '!=', 'strict']],
              class: 'btn-primary'
            }
          },
          _button_action_confirm_430: {
            _attr: {
              name: 'action_confirm',
              type: 'object',
              string: 'Confirm',
              invisible: [['consumption', '=', 'strict']],
              class: 'btn-primary'
            }
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              type: 'object',
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_mrp_consumption_warning: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Consumption Warning',
    type: 'ir.actions.act_window',
    res_model: 'mrp.consumption.warning',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
