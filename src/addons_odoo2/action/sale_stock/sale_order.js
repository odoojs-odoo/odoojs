export default {
  view_order_form_inherit_sale_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_order_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//button[@name='action_view_invoice']",
            position: 'before'
          },
          _button_action_view_delivery: {
            _attr: {
              name: 'action_view_delivery',
              type: 'object',
              icon: 'fa-truck',
              groups: 'stock.group_stock_user',
              invisible: [['delivery_count', '=', 0]],
              class: 'oe_stat_button'
            },
            delivery_count: {
              string: 'Delivery',
              widget: 'statinfo'
            }
          }
        },
        _xpath_468: {
          _attr: {
            expr: "//group[@name='sale_shipping']",
            position: 'attributes'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              groups: ''
            }
          },
          _attribute_string: {
            _attr: {
              name: 'string',
              text: 'Delivery',
              string: 'Delivery'
            }
          }
        },
        _xpath_643: {
          _attr: {
            expr: "//label[@for='commitment_date']",
            position: 'before'
          },
          warehouse_id: { invisible: '1' },
          _field_warehouse_id_239: {
            warehouse_id: {
              groups: 'stock.group_stock_multi_warehouses',
              force_save: '1',
              no_create: true
            }
          },
          incoterm: {
            groups: 'sale_stock.group_display_incoterm',
            no_open: true,
            no_create: true
          },
          incoterm_location: { groups: 'sale_stock.group_display_incoterm' },
          picking_policy: { required: 'True' }
        },
        _xpath_316: {
          _attr: {
            expr: "//span[@name='expected_date_span']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('effective_date', '!=', False), ('commitment_date', '!=', False)]}",
              attrs: "{'invisible': [('effective_date', '!=', False), ('commitment_date', '!=', False)]}"
            }
          }
        },
        _xpath_494: {
          _attr: {
            expr: "//div[@name='commitment_date_div']",
            position: 'replace'
          },
          _div: {
            _attr: { class: 'o_row' },
            commitment_date: {},
            _span: {
              _attr: {
                invisible: [['effective_date', '!=', false], ['commitment_date', '!=', false]],
                class: 'text-muted',
                text: 'Expected:'
              },
              expected_date: {
                widget: 'date',
                class: 'oe_inline'
              }
            }
          },
          effective_date: { invisible: [['effective_date', '=', false]] }
        },
        effective_date: {
          position: 'after',
          __todo__after: {
            delivery_status: { invisible: [['state', 'not in', ['sale', 'done']]] }
          }
        },
        _xpath_324: {
          _attr: {
            expr: "//page[@name='other_information']//field[@name='expected_date']",
            position: 'after'
          },
          show_json_popover: { invisible: '1' },
          json_popover: {
            string: ' ',
            widget: 'stock_rescheduling_popover',
            invisible: [['show_json_popover', '=', false]]
          }
        },
        _xpath_831: {
          _attr: {
            expr: "//field[@name='order_line']/form/group/group/field[@name='analytic_distribution']",
            position: 'before'
          },
          route_id: {
            groups: 'stock.group_adv_location',
            no_create: true
          }
        },
        _xpath_207: {
          _attr: {
            expr: "//field[@name='order_line']/tree/field[@name='analytic_distribution']",
            position: 'after'
          },
          route_id: {
            groups: 'stock.group_adv_location',
            optional: 'hide',
            no_create: true
          }
        }
      }
    }
  },

  view_quotation_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_quotation_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='tag_ids']",
            position: 'after'
          },
          warehouse_id: {
            groups: 'stock.group_stock_multi_warehouses',
            optional: 'hide',
            no_create: true
          }
        }
      }
    }
  },

  view_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_order_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='team_id']",
            position: 'after'
          },
          warehouse_id: {
            groups: 'stock.group_stock_multi_warehouses',
            optional: 'hide',
            no_create: true
          }
        },
        invoice_status: {
          position: 'before',
          __todo__before: {
            effective_date: { invisible: '1' },
            delivery_status: {
              widget: 'badge',
              optional: 'hide'
            }
          }
        }
      }
    }
  },

  view_order_form_inherit_sale_stock_qty: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_order_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page/field[@name='order_line']/form/group/group/div[@name='ordered_qty']/field[@name='product_uom']",
            position: 'after'
          },
          virtual_available_at_date: { invisible: '1' },
          qty_available_today: { invisible: '1' },
          free_qty_today: { invisible: '1' },
          scheduled_date: { invisible: '1' },
          forecast_expected_date: { invisible: '1' },
          warehouse_id: { invisible: '1' },
          move_ids: { invisible: '1' },
          qty_to_deliver: { invisible: '1' },
          is_mto: { invisible: '1' },
          display_qty_widget: { invisible: '1' },
          _widget_qty_at_date_widget: {
            _attr: { name: 'qty_at_date_widget' }
          }
        },
        _xpath_555: {
          _attr: {
            expr: "//page/field[@name='order_line']/tree/field[@name='qty_delivered']",
            position: 'after'
          },
          virtual_available_at_date: { invisible: '1' },
          qty_available_today: { invisible: '1' },
          free_qty_today: { invisible: '1' },
          scheduled_date: { invisible: '1' },
          forecast_expected_date: { invisible: '1' },
          warehouse_id: { invisible: '1' },
          move_ids: { invisible: '1' },
          qty_to_deliver: { invisible: '1' },
          is_mto: { invisible: '1' },
          display_qty_widget: { invisible: '1' },
          _widget_qty_at_date_widget: {
            _attr: { name: 'qty_at_date_widget' }
          }
        }
      }
    }
  }
}
