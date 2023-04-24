export default {
  product_normal_action_puchased: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Products',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_purchase: 1,
      purchase_product_template: 1
    },
    views: {
      tree: 'product.product_template_tree_view',
      form: 'product.product_template_form_view'
    }
  },

  product_template_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template',
    inherit_id: 'product.product_template_form_view',

    type: 'form',
    arch: {
      sheet: {
        _notebook: {
          _page_purchase: {
            _attr: { invisible: 0 },

            seller_ids: {
              // invisible: [['product_variant_count', '>', 1]],
              readonly: [['product_variant_count', '>', 1]]
              // context: {
              //   todo_ctx:
              //     "{'default_product_tmpl_id':context.get('product_tmpl_id',active_id), 'product_template_invisible_variant': True, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}"
              // }
            },
            variant_seller_ids: {
              // invisible: [['product_variant_count', '<=', 1]],
              readonly: [['product_variant_count', '<=', 1]]
              // context: {
              //   todo_ctx:
              //     "{'model': active_model, 'active_id': active_id, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}"
              // }
            },
            _group_purchase: {
              _group_bill: {
                _attr: { groups: 'purchase.group_purchase_manager' },
                purchase_method: { widget: 'radio' }
              },
              _group: {
                _group: {
                  _attr: { string: 'Purchase Description' },
                  description_purchase: {
                    placeholder: 'This note is added to purchase orders.'
                  }
                },
                _group_383: {
                  _attr: {
                    string: 'Warning when Purchasing this Product',
                    groups: 'purchase.group_warning_purchase'
                  },
                  purchase_line_warn: {},
                  purchase_line_warn_msg: {
                    // required: [['purchase_line_warn', '!=', 'no-message']],
                    // readonly: [['purchase_line_warn', '=', 'no-message']],
                    invisible: [['purchase_line_warn', '=', 'no-message']],
                    placeholder: 'Type a message...'
                  }
                }
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
        _notebook: {
          _page_purchase: {
            _group_bill: {
              supplier_taxes_id: {
                widget: 'many2many_tags',
                // readonly: [['purchase_ok', '=', 0]],
                context: {
                  default_type_tax_use: 'purchase'
                }
              }
            }
          },
          _page_invoicing: {
            _group_properties: {
              _group_payables: {
                property_account_expense_id: {
                  //   readonly: [['purchase_ok', '=', 0]]
                }
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
          _button_action_view_po: {
            _attr: {
              name: 'action_view_po',
              type: 'object',
              icon: 'fa-credit-card',
              groups: 'purchase.group_purchase_user',
              // invisible: [['purchase_ok', '=', false]],
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
                purchased_product_qty: {
                  widget: 'statinfo',
                  class: 'mr4'
                },
                uom_name: {}
              },
              _span_526: {
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
