export default {
  view_product_supplier_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page[@name='purchase']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0'
            }
          }
        },
        _group_purchase: {
          _attr: {
            name: 'purchase'
          },
          seller_ids: {
            attrs: {
              invisible: "[('product_variant_count', '>', 1)]",
              readonly: "[('product_variant_count', '>', 1)]"
            },
            context: {
              todo_ctx: "{'default_product_tmpl_id':context.get('product_tmpl_id',active_id), 'product_template_invisible_variant': True, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}"
            }
          },
          variant_seller_ids: {
            attrs: {
              invisible: "[('product_variant_count', '<=', 1)]",
              readonly: "[('product_variant_count', '<=', 1)]"
            },
            context: {
              todo_ctx: "{'model': active_model, 'active_id': active_id, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}"
            }
          }
        },
        _group_bill: {
          _attr: {
            name: 'bill'
          },
          _attribute_groups: {
            _attr: {
              name: 'groups',
              text: 'purchase.group_purchase_manager'
            }
          }
        },
        _group_bill_354: {
          _attr: {
            name: 'bill'
          },
          purchase_method: {
            widget: 'radio'
          }
        },
        _group_purchase_142: {
          _attr: {
            name: 'purchase'
          },
          _group: {
            _group: {
              _attr: {
                string: 'Purchase Description'
              },
              description_purchase: {
                placeholder: 'This note is added to purchase orders.'
              }
            },
            _group_607: {
              _attr: {
                string: 'Warning when Purchasing this Product',
                groups: 'purchase.group_warning_purchase'
              },
              purchase_line_warn: {},
              purchase_line_warn_msg: {
                attrs: {
                  required: "[('purchase_line_warn', '!=', 'no-message')]",
                  readonly: "[('purchase_line_warn', '=', 'no-message')]",
                  invisible: "[('purchase_line_warn', '=', 'no-message')]"
                },
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  },

  view_product_account_purchase_ok_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'account.product_template_form_view',
    arch: {
      sheet: {
        property_account_expense_id: {
          readonly: "[('purchase_ok', '=', 0)]"
        },
        supplier_taxes_id: {
          __todo__replace: {
            supplier_taxes_id: {
              widget: 'many2many_tags',
              attrs: {
                readonly: "[('purchase_ok', '=', 0)]"
              },
              context: {
                default_type_tax_use: 'purchase'
              }
            }
          }
        }
      }
    }
  },

  view_product_template_purchase_buttons_from: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_only_form_view',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_action_view_po: {
            _attr: {
              name: 'action_view_po',
              groups: 'purchase.group_purchase_user',
              attrs: {
                invisible: "[('purchase_ok', '=', False)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-credit-card'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                purchased_product_qty: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_722: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Purchased'
                }
              }
            }
          }
        }
      }
    }
  }
}