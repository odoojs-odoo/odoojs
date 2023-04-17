export default {
  package_level_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package_level',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          state: {
            widget: 'statusbar'
          }
        },
        _group: {
          company_id: {
            invisible: '1'
          },
          picking_id: {
            invisible: '1'
          },
          show_lots_m2o: {
            invisible: '1'
          },
          show_lots_text: {
            invisible: '1'
          },
          picking_type_code: {
            invisible: '1'
          },
          _group: {
            package_id: {},
            location_id: {
              groups: 'stock.group_stock_multi_locations',
              attrs: {
                invisible: "[('picking_type_code', '=', 'incoming')]"
              },
              no_create: true
            },
            location_dest_id: {
              groups: 'stock.group_stock_multi_locations',
              attrs: {
                invisible: "[('picking_type_code', '=', 'outgoing')]"
              },
              no_create: true
            },
            is_done: {},
            company_id: {
              groups: 'base.main_company'
            }
          },
          move_ids: {
            attrs: {
              invisible: "[('state', 'in', ('new', 'draft', 'assigned', 'done'))]"
            },
            views: {
              tree: {
                arch: {
                  sheet: {
                    product_id: {},
                    product_uom_qty: {},
                    quantity_done: {},
                    product_uom: {
                      groups: 'uom.group_uom'
                    },
                    state: {
                      invisible: '1'
                    }
                  }
                }
              }
            }
          },
          move_line_ids: {
            attrs: {
              invisible: "[('state', 'in', ('confirmed', 'cancel'))]"
            },
            views: {
              tree: {
                arch: {
                  sheet: {
                    product_id: {},
                    lot_id: {
                      groups: 'stock.group_production_lot',
                      attrs: {
                        column_invisible: "[('parent.show_lots_m2o', '=', False)]"
                      }
                    },
                    lot_name: {
                      groups: 'stock.group_production_lot',
                      attrs: {
                        column_invisible: "[('parent.show_lots_text', '=', False)]"
                      }
                    },
                    owner_id: {
                      groups: 'stock.group_tracking_owner'
                    },
                    reserved_uom_qty: {},
                    qty_done: {},
                    product_uom_id: {
                      string: 'Unit of Measure',
                      groups: 'uom.group_uom',
                      attrs: {
                        readonly: "[('reserved_uom_qty', '!=', 0.0)]"
                      },
                      no_open: true,
                      no_create: true
                    },
                    state: {
                      invisible: '1'
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

  package_level_form_edit_view: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package_level',
    inherit_id: 'stock.package_level_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//form',
            position: 'inside'
          },
          _footer: {
            _attr: {
              class: 'oe_edit_only'
            },
            _button: {
              _attr: {
                string: 'Confirm',
                class: 'oe_highlight'
              }
            },
            _button_639: {
              _attr: {
                string: 'Discard'
              }
            }
          }
        }
      }
    }
  },

  package_level_tree_view_picking: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.package_level',
    type: 'tree',
    arch: {
      sheet: {
        is_fresh_package: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        package_id: {
          attrs: {
            readonly: "[('state', 'in', ('confirmed', 'assigned', 'done', 'cancel'))]"
          },
          no_create: true
        },
        location_id: {
          groups: 'stock.group_stock_multi_locations',
          attrs: {
            column_invisible: "[('parent.picking_type_code', '=', 'incoming')]"
          },
          no_create: true
        },
        location_dest_id: {
          groups: 'stock.group_stock_multi_locations',
          attrs: {
            column_invisible: "[('parent.picking_type_code', '=', 'outgoing')]"
          },
          no_create: true
        },
        state: {},
        is_done: {
          attrs: {
            readonly: "['|', ('parent.state', 'in', ('draft', 'new', 'done')), ('is_fresh_package', '=', True)]"
          }
        },
        _button_action_show_package_details: {
          _attr: {
            name: 'action_show_package_details',
            title: 'Display package content',
            type: 'object',
            icon: 'fa-list'
          }
        }
      }
    }
  }
}
