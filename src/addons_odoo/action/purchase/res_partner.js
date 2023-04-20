export default {
  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _notebook: {
          _page_sales_purchases: {
            _group_sales_purchases: {
              _group_purchase: {
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
                      invisible: [['receipt_reminder_email', '=', false]]
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
          _button_purchase__act_res_partner_2_purchase_order: {
            _attr: {
              name: 'purchase.act_res_partner_2_purchase_order',
              type: 'action',
              icon: 'fa-credit-card',
              groups: 'purchase.group_purchase_user',
              class: 'oe_stat_button'
            },
            purchase_order_count: {
              string: 'Purchases',
              widget: 'statinfo'
            }
          }
        },

        _notebook: {
          _page_internal_notes: {
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
                purchase_warn: {
                  required: '1'
                },
                purchase_warn_msg: {
                  required: [
                    ['purchase_warn', '!=', false],
                    ['purchase_warn', '!=', 'no-message']
                  ],
                  invisible: [['purchase_warn', 'in', (false, 'no-message')]],
                  placeholder: 'Type a message...'
                }
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
          _button_purchase__act_res_partner_2_supplier_invoices: {
            _attr: {
              name: 'purchase.act_res_partner_2_supplier_invoices',
              type: 'action',
              icon: 'fa-pencil-square-o',
              groups: 'account.group_account_invoice',
              class: 'oe_stat_button'
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
