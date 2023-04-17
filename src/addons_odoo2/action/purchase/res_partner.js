export default {
  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _group_purchase: {
          _attr: {
            name: 'purchase'
          },
          _div_receipt_reminder: {
            _attr: {
              name: 'receipt_reminder',
              groups: 'purchase.group_send_reminder',
              class: 'o_checkbox_optional_field'
            },
            _label_receipt_reminder_email: {
              for: 'receipt_reminder_email'
            },
            receipt_reminder_email: {},
            _div: {
              _attr: {
                attrs: {
                  invisible: "[('receipt_reminder_email', '=', False)]"
                }
              },
              reminder_date_before_receipt: {
                class: 'oe_inline'
              },
              _span: 'day(s) before'
            }
          },
          property_purchase_currency_id: {
            groups: 'base.group_multi_currency',
            no_create: true,
            no_open: true
          }
        }
      }
    }
  },

  purchase_partner_kanban_view: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.res_partner_kanban_view',
    arch: {
      sheet: {
        mobile: {
          __todo__after: {
            purchase_order_count: {
              groups: 'purchase.group_purchase_user'
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_kanban_bottom_left')]",
            position: 'inside'
          },
          _a: {
            _attr: {
              groups: 'purchase.group_purchase_user',
              class: 'oe_kanban_action oe_kanban_action_a me-1'
            },
            _span: {
              _attr: {
                class: 'badge rounded-pill'
              },
              _i: {
                _attr: {
                  class: 'fa fa-fw fa-credit-card',
                  title: 'Purchases'
                }
              },
              _t: {}
            }
          }
        }
      }
    }
  },

  res_partner_view_purchase_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_purchase__act_res_partner_2_purchase_order: {
            _attr: {
              name: 'purchase.act_res_partner_2_purchase_order',
              groups: 'purchase.group_purchase_user',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-credit-card'
            },
            purchase_order_count: {
              string: 'Purchases',
              widget: 'statinfo'
            }
          }
        },
        _page_internal_notes: {
          _attr: {
            name: 'internal_notes'
          },
          _group: {
            _attr: {
              groups: 'purchase.group_purchase_user'
            },
            _group: {
              _attr: {
                groups: 'purchase.group_warning_purchase'
              },
              _separator: {
                _attr: {
                  string: 'Warning on the Purchase Order'
                }
              },
              purchase_warn: {},
              purchase_warn_msg: {
                attrs: {
                  required: "[('purchase_warn', '!=', False), ('purchase_warn', '!=', 'no-message')]",
                  invisible: "[('purchase_warn', 'in', (False, 'no-message'))]"
                },
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  },

  res_partner_view_purchase_account_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box'
          },
          _button_purchase__act_res_partner_2_supplier_invoices: {
            _attr: {
              name: 'purchase.act_res_partner_2_supplier_invoices',
              groups: 'account.group_account_invoice',
              class: 'oe_stat_button',
              type: 'action',
              icon: 'fa-pencil-square-o'
            },
            supplier_invoice_count: {
              string: 'Vendor Bills',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}
