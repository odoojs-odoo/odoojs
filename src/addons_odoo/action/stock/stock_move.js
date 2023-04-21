export default {
  view_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'tree',
    buttons: { create: false, edit: false, delete: false },
    arch: {
      sheet: {
        date: { groups: 'base.group_no_one' },
        reference: {},
        picking_type_id: { invisible: '1' },
        location_usage: { invisible: '1' },
        location_dest_usage: { invisible: '1' },
        product_id: {},
        location_id: { string: 'From', no_create: true },
        location_dest_id: { string: 'To', no_create: true },
        product_packaging_id: {
          groups: 'product.group_stock_packaging',
          optional: 'hide'
        },
        product_uom_qty: { string: 'Quantity' },
        product_uom: {
          string: 'Unit',
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        company_id: { groups: 'base.group_multi_company' },
        state: { widget: 'badge', optional: 'show' }
      }
    }
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'form',
    buttons: { create: false, edit: false, delete: false },

    arch: {
      header: {
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,confirmed,assigned,done'
        }
      },
      sheet: {
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' }
        },
        _group: {
          _group_main_grp: {
            _attr: { name: 'main_grp' },
            _group_main_grp_col1: {
              _attr: { name: 'main_grp_col1' },
              reference: {},
              location_id: { no_create: true },
              location_dest_id: { no_create: true },
              company_id: { groups: 'base.group_multi_company' }
            },
            _group_main_grp_col2: {
              _attr: { name: 'main_grp_col2' },
              product_id: {},
              product_uom_category_id: { invisible: '1' },
              _label_product_uom_qty: { for: 'product_uom_qty' },
              _div: {
                _attr: { class: 'o_row' },
                product_uom_qty: {},
                product_uom: {
                  groups: 'uom.group_uom',
                  no_open: true,
                  no_create: true
                }
              },
              name: { invisible: '1' },
              _div_663: {
                _attr: { class: 'o_td_label' },
                _label_date: {
                  for: 'date',
                  string: 'Date Scheduled'
                  //   invisible: [['state', '=', 'done']]
                },
                _label_date_622: {
                  for: 'date',
                  string: 'Date Processing'
                  //   invisible: [['state', '!=', 'done']]
                }
              },
              date: { readonly: '1' },
              date_deadline: { force_save: '1' }
            }
          },
          _group_origin_grp: {
            _attr: {
              name: 'origin_grp',
              string: 'Origin',
              groups: 'base.group_no_one'
            },
            origin: {},
            group_id: {},
            procure_method: {
              groups: 'stock.group_adv_location',
              readonly: [['state', '!=', 'draft']]
            }
          },
          _group_linked_group: {
            _attr: {
              name: 'linked_group',
              string: 'Linked Moves',
              groups: 'base.group_no_one'
            },
            move_orig_ids: {
              string: 'Origin Moves',
              readonly: '1',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
                    }
                  }
                }
              }
            },
            move_dest_ids: {
              string: 'Destination Moves',
              readonly: '1',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      location_id: {},
                      location_dest_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      state: {}
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

  view_move_search: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Location',
          groups: 'stock.group_stock_multi_locations',
          filter_domain(self) {
            return [
              '|',
              ['location_id', 'ilike', self],
              ['location_dest_id', 'ilike', self]
            ]
          }
        },
        product_id: {},
        origin: {
          string: 'Reference',
          filter_domain(self) {
            return [
              '|',
              '|',
              ['origin', 'ilike', self],
              ['name', 'ilike', self],
              ['picking_id', 'ilike', self]
            ]
          }
        },
        location_id: {
          string: 'Source Location',
          groups: 'stock.group_stock_multi_locations'
        },
        location_dest_id: {
          string: 'Destination Location',
          groups: 'stock.group_stock_multi_locations'
        },
        partner_id: {
          string: 'Partner',
          filter_domain(self) {
            return [['picking_id.partner_id', 'child_of', self]]
          }
        }
      },

      filters: {
        group_state: {
          ready: {
            name: 'ready',
            string: 'Ready',
            help: 'Stock moves that are Available (Ready to process)',
            domain: [['state', '=', 'assigned']]
          },
          future: {
            name: 'future',
            string: 'To Do',
            help: 'Stock moves that are Confirmed, Available or Waiting',
            domain: [['state', 'in', ('assigned', 'confirmed', 'waiting')]]
          },
          done: {
            name: 'done',
            string: 'Done',
            help: 'Stock moves that have been processed',
            domain: [['state', '=', 'done']]
          }
        }
      },

      group_location: {
        incoming: {
          name: 'incoming',
          string: 'Incoming',
          domain: [
            ['location_id.usage', 'not in', ('internal', 'transit')],
            ['location_dest_id.usage', 'in', ('internal', 'transit')]
          ]
        },
        outgoing: {
          name: 'outgoing',
          string: 'Outgoing',
          domain: [
            ['location_id.usage', 'in', ('internal', 'transit')],
            ['location_dest_id.usage', 'not in', ('internal', 'transit')]
          ]
        },
        inventory: {
          name: 'inventory',
          string: 'Inventory',
          domain: [['is_inventory', '=', true]]
        }
      },

      group_today: {
        today: {
          name: 'today',
          string: 'Date',
          date: 'date',
          help: 'Scheduled or processing date'
        }
      }
    }
  },

  stock_move_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stock Moves',
    type: 'ir.actions.act_window',
    res_model: 'stock.move',
    search_view_id: 'view_move_search',
    context: { search_default_done: 1 },
    views: {
      tree: 'view_move_tree',
      form: 'view_move_form'
    }
  }
}
