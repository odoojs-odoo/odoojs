export default {
  stock_inventory_conflict_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.inventory.conflict',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _strong: 'Due to some stock moves done between your initial update of the quantity and now, the difference of quantity is not consistent anymore.'
        },
        _div_967: {
          _attr: {
            text: 'You can either :'
          },
          _ul: {
            _li: {
              _attr: {
                text: 'Keep the'
              },
              _strong: 'Counted Quantity'
            },
            _li_327: {
              _attr: {
                text: 'Keep the'
              },
              _strong: 'Difference'
            },
            _li_956: 'Discard and manually resolve the conflict'
          }
        },
        _div_713: {
          _br: {},
          quant_ids: {
            invisible: '1'
          },
          quant_to_fix_ids: {
            readonly: '1',
            views: {
              tree: {
                arch: {
                  sheet: {
                    id: {
                      invisible: '1'
                    },
                    tracking: {
                      invisible: '1'
                    },
                    company_id: {
                      invisible: '1'
                    },
                    product_id: {
                      invisible: "context.get['single_product', False]",
                      readonly: "context.get['single_product', False]",
                      force_save: '1',
                      no_create: true
                    },
                    location_id: {
                      invisible: "context.get['hide_location', False]",
                      readonly: [['id', '!=', false]],
                      no_create: true
                    },
                    lot_id: {
                      groups: 'stock.group_production_lot',
                      invisible: "context.get['hide_lot', False]",
                      readonly: ['|', ['id', '!=', false], ['tracking', 'not in', ['serial', 'lot']]],
                      required: [['tracking', '!=', 'none']],
                      context: {
                        todo_ctx: "{'default_product_id': product_id, 'default_company_id': company_id}"
                      }
                    },
                    package_id: {
                      groups: 'stock.group_tracking_lot',
                      readonly: [['id', '!=', false]]
                    },
                    owner_id: {
                      groups: 'stock.group_tracking_owner',
                      readonly: [['id', '!=', false]],
                      no_create: true
                    },
                    quantity: {
                      string: 'Quantity'
                    },
                    inventory_quantity: {
                      string: 'Counted Quantity',
                      readonly: '0'
                    },
                    inventory_diff_quantity: {
                      string: 'Difference'
                    },
                    product_uom_id: {
                      groups: 'uom.group_uom'
                    },
                    _field_company_id_908: {
                      company_id: {
                        groups: 'base.group_multi_company',
                        optional: 'show'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_keep_counted_quantity: {
            _attr: {
              name: 'action_keep_counted_quantity',
              type: 'object',
              string: 'Keep Counted Quantity',
              class: 'btn-primary'
            }
          },
          _button_action_keep_difference: {
            _attr: {
              name: 'action_keep_difference',
              type: 'object',
              string: 'Keep Difference',
              class: 'btn-primary'
            }
          },
          _button_cancel_button: {
            _attr: {
              name: 'cancel_button',
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  }
}
