export default {
  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _page_sales: {
          _attr: {
            name: 'sales',
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        },
        product_variant_count: {
          position: 'after',
          __todo__after: {
            service_type: {
              widget: 'radio',
              invisible: 'True'
            },
            visible_expense_policy: {
              invisible: '1'
            }
          }
        },
        detailed_type: {
          position: 'after',
          __todo__after: {
            invoice_policy: {
              required: '1'
            },
            expense_policy: {
              widget: 'radio',
              invisible: [['visible_expense_policy', '=', false]]
            }
          }
        },
        product_tooltip: {
          position: 'after',
          __todo__after: {
            _label_product_tooltip: {
              for: 'product_tooltip',
              invisible: ['|', ['type', 'not in', ('product', 'consu')], ['invoice_policy', '!=', 'order']]
            },
            _div: {
              _attr: {
                invisible: ['|', ['type', 'not in', ('product', 'consu')], ['invoice_policy', '!=', 'order']],
                class: 'fst-italic text-muted',
                text: 'You can invoice them before they are delivered.'
              }
            },
            _label_product_tooltip_586: {
              for: 'product_tooltip',
              invisible: ['|', ['type', 'not in', ('product', 'consu')], ['invoice_policy', '!=', 'delivery']]
            },
            _div_671: {
              _attr: {
                invisible: ['|', ['type', 'not in', ('product', 'consu')], ['invoice_policy', '!=', 'delivery']],
                class: 'fst-italic text-muted',
                text: 'Invoice after delivery, based on quantities delivered, not ordered.'
              }
            }
          }
        }
      }
    }
  },

  product_template_form_view_sale_order_button: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_only_form_view',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_view_sales: {
            _attr: {
              name: 'action_view_sales',
              type: 'object',
              icon: 'fa-signal',
              help: 'Sold in the last 365 days',
              groups: 'sales_team.group_sale_salesman',
              invisible: [['sale_ok', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                sales_count: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_386: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Sold'
                }
              }
            }
          }
        },
        _group_description: {
          _attr: {
            name: 'description',
            position: 'after'
          },
          _t: {
            _attr: {
              groups: 'sales_team.group_sale_salesman'
            },
            _group: {
              _attr: {
                string: 'Warning when Selling this Product',
                groups: 'sale.group_warning_sale'
              },
              sale_line_warn: {
                string: 'Warning'
              },
              sale_line_warn_msg: {
                string: 'Message',
                required: [['sale_line_warn', '!=', 'no-message']],
                readonly: [['sale_line_warn', '=', 'no-message']],
                invisible: [['sale_line_warn', '=', 'no-message']],
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  },

  product_template_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    context: {
      search_default_filter_to_sell: 1,
      sale_multi_pricelist_product_template: 1
    },
    views: {
      tree: 'product.product_template_kanban_view',
      form: '=======todo=========='
    }
  }
}
