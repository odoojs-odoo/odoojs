export default {
  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _page_sales: {
          _attr: {
            name: 'sales'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0'
            }
          }
        },
        product_variant_count: {
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
          __todo__after: {
            invoice_policy: {},
            expense_policy: {
              widget: 'radio',
              attrs: {
                invisible: "[('visible_expense_policy', '=', False)]"
              }
            }
          }
        },
        product_tooltip: {
          __todo__after: {
            _label_product_tooltip: {
              for: 'product_tooltip',
              attrs: {
                invisible: "['|', ('type', 'not in', ('product', 'consu')), ('invoice_policy', '!=', 'order')]"
              }
            },
            _div: {
              _attr: {
                attrs: {
                  invisible: "['|', ('type', 'not in', ('product', 'consu')), ('invoice_policy', '!=', 'order')]"
                },
                class: 'fst-italic text-muted',
                text: 'You can invoice them before they are delivered.'
              }
            },
            _label_product_tooltip_211: {
              for: 'product_tooltip',
              attrs: {
                invisible: "['|', ('type', 'not in', ('product', 'consu')), ('invoice_policy', '!=', 'delivery')]"
              }
            },
            _div_459: {
              _attr: {
                attrs: {
                  invisible: "['|', ('type', 'not in', ('product', 'consu')), ('invoice_policy', '!=', 'delivery')]"
                },
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
            name: 'button_box'
          },
          _button_action_view_sales: {
            _attr: {
              name: 'action_view_sales',
              groups: 'sales_team.group_sale_salesman',
              attrs: {
                invisible: "[('sale_ok', '=', False)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-signal'
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
              _span_967: {
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
            name: 'description'
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
                attrs: {
                  required: "[('sale_line_warn', '!=', 'no-message')]",
                  readonly: "[('sale_line_warn', '=', 'no-message')]",
                  invisible: "[('sale_line_warn', '=', 'no-message')]"
                },
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
    search_view_id: 'product.product_template_search_view',
    res_model: 'product.template',
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