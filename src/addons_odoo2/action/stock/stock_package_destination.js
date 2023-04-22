export default {
  stock_package_destination_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package.destination',
    type: 'form',
    arch: {
      sheet: {
        _div: 'You are trying to put products going to different locations into the same package',
        _div_535: {
          move_line_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    product_id: {},
                    location_dest_id: {},
                    qty_done: {},
                    lot_id: { groups: 'stock.group_production_lot' }
                  }
                }
              },
              kanban: {
                arch: {
                  sheet: {
                    product_id: {},
                    qty_done: {},
                    location_dest_id: {},
                    _templates: {
                      _t: {
                        _div: {
                          _attr: { class: 'container o_kanban_card_content' },
                          _div: {
                            _attr: { class: 'row' },
                            _div: {
                              _attr: { class: 'col-6 o_kanban_primary_left' },
                              product_id: {}
                            },
                            _div_842: {
                              _attr: { class: 'col-6 o_kanban_primary_right' },
                              qty_done: {}
                            }
                          },
                          _div_561: {
                            _attr: { class: 'row' },
                            _div: {
                              _attr: { class: 'col-12' },
                              location_dest_id: {}
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        _div_161: { _strong: 'Where do you want to send the products ?' },
        _div_248: {
          filtered_location: { invisible: '1' },
          location_dest_id: {
            domain: { todo_ctx: "[('id', 'in', filtered_location)]" },
            no_create: true,
            no_open: true
          }
        },
        _footer: {
          _button_action_done: {
            _attr: {
              name: 'action_done',
              type: 'object',
              string: 'Confirm',
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
