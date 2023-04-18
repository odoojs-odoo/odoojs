export default {
  purchase_order_view_form_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    inherit_id: 'purchase.purchase_order_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//header/button[@name='action_rfq_send']",
            position: 'after'
          },
          _button_action_view_picking: {
            _attr: {
              name: 'action_view_picking',
              string: 'Receive Products',
              groups: 'stock.group_stock_user',
              invisible: ['|', '|', ['is_shipped', '=', true], ['state', 'not in', ('purchase', 'done')], ['incoming_picking_count', '=', 0]],
              class: 'oe_highlight',
              type: 'object'
            }
          }
        },
        _xpath_259: {
          _attr: {
            expr: "//header/button[@name='confirm_reminder_mail']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': ['|', '|', '|', ('state', 'not in', ('purchase', 'done')), ('mail_reminder_confirmed', '=', True), ('date_planned', '=', False), ('effective_date', '!=', False)]}"
            }
          }
        },
        _xpath_126: {
          _attr: {
            expr: "//div[hasclass('oe_button_box')]",
            position: 'inside'
          },
          _button_action_view_picking: {
            _attr: {
              name: 'action_view_picking',
              groups: 'stock.group_stock_user',
              invisible: [['incoming_picking_count', '=', 0]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-truck'
            },
            incoming_picking_count: {
              string: 'Receipt',
              widget: 'statinfo'
            }
          }
        },
        _xpath_619: {
          _attr: {
            expr: "//field[@name='currency_id']",
            position: 'after'
          },
          is_shipped: {
            invisible: '1'
          }
        },
        _xpath_563: {
          _attr: {
            expr: "//field[@name='order_line']/tree//field[@name='date_planned']",
            position: 'after'
          },
          move_dest_ids: {
            invisible: '1'
          }
        },
        _xpath_912: {
          _attr: {
            expr: "//page/field[@name='order_line']/tree/field[@name='product_qty']",
            position: 'after'
          },
          forecasted_issue: {
            invisible: '1'
          },
          _button_action_product_forecast_report: {
            _attr: {
              name: 'action_product_forecast_report',
              invisible: ['|', '|', ['id', '=', false], ['forecasted_issue', '=', false], ['product_type', '!=', 'product']],
              class: 'text-danger',
              title: 'Forecast Report',
              type: 'object',
              icon: 'fa-area-chart'
            }
          },
          _button_action_product_forecast_report_536: {
            _attr: {
              name: 'action_product_forecast_report',
              invisible: ['|', '|', ['id', '=', false], ['forecasted_issue', '=', true], ['product_type', '!=', 'product']],
              title: 'Forecast Report',
              type: 'object',
              icon: 'fa-area-chart'
            }
          }
        },
        _xpath_731: {
          _attr: {
            expr: "//div[@name='date_planned_div']",
            position: 'inside'
          },
          _button_action_purchase_vendor_delay_report: {
            _attr: {
              name: 'action_purchase_vendor_delay_report',
              invisible: ['|', ['state', 'in', ['purchase', 'done']], ['partner_id', '=', false]],
              context: {
                todo_ctx: "{'search_default_partner_id': partner_id}"
              },
              class: 'oe_link',
              type: 'action'
            },
            _span: {
              _attr: {
                invisible: [['on_time_rate', '<', 0]]
              },
              on_time_rate: {
                widget: 'integer',
                class: 'oe_inline'
              }
            },
            _span_863: {
              _attr: {
                invisible: [['on_time_rate', '>=', 0]],
                text: 'No On-time Delivery Data'
              }
            }
          }
        },
        _xpath_966: {
          _attr: {
            expr: "//label[@for='receipt_reminder_email']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('effective_date', '!=', False)]}"
            }
          }
        },
        _xpath_694: {
          _attr: {
            expr: "//div[@name='reminder']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('effective_date', '!=', False)]}"
            }
          }
        },
        _xpath_504: {
          _attr: {
            expr: "//div[@name='reminder']",
            position: 'after'
          },
          effective_date: {
            invisible: [['effective_date', '=', false]]
          }
        },
        _xpath_751: {
          _attr: {
            expr: "//field[@name='order_line']/form//field[@name='invoice_lines']",
            position: 'after'
          },
          move_ids: {}
        },
        invoice_status: {
          __todo__before: {
            receipt_status: {
              invisible: [['state', 'not in', ('purchase', 'done')]]
            }
          }
        },
        _xpath_667: {
          _attr: {
            expr: "//field[@name='order_line']/form//field[@name='analytic_distribution']",
            position: 'before'
          },
          propagate_cancel: {
            groups: 'base.group_no_one'
          }
        },
        _xpath_363: {
          _attr: {
            expr: "//field[@name='order_line']/tree//field[@name='qty_received']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'column_invisible': [('parent.state', 'not in', ('purchase', 'done'))], 'readonly': [('product_type', 'in', ('consu', 'product'))]}"
            }
          }
        },
        _xpath_717: {
          _attr: {
            expr: "//page[@name='purchase_delivery_invoice']/group/group",
            position: 'inside'
          },
          default_location_dest_id_usage: {
            invisible: '1'
          },
          incoterm_id: {},
          incoterm_location: {}
        },
        _xpath_287: {
          _attr: {
            expr: "//div[@name='reminder']",
            position: 'after'
          },
          picking_type_id: {
            groups: 'stock.group_stock_multi_locations',
            domain: {
              todo_ctx: "[('code','=','incoming'), '|', ('warehouse_id', '=', False), ('warehouse_id.company_id', '=', company_id)]"
            },
            no_create: true
          },
          dest_address_id: {
            groups: 'stock.group_stock_multi_locations',
            invisible: [['default_location_dest_id_usage', '!=', 'customer']],
            required: [['default_location_dest_id_usage', '=', 'customer']]
          }
        }
      }
    }
  },

  purchase_order_view_tree_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    inherit_id: 'purchase.purchase_order_view_tree',
    arch: {
      sheet: {
        invoice_status: {
          __todo__before: {
            effective_date: {
              invisible: '1'
            },
            receipt_status: {
              widget: 'badge'
            }
          }
        }
      }
    }
  }
}
