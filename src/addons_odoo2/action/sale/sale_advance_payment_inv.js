export default {
  view_sale_advance_payment_inv: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.advance.payment.inv',
    type: 'form',
    arch: {
      sheet: {
        _p: {
          _attr: {
            class: 'oe_grey',
            text: 'Invoices will be created in draft so that you can review\n                    them before validation.'
          }
        },
        _group: {
          sale_order_ids: {
            invisible: '1'
          },
          has_down_payments: {
            invisible: '1'
          },
          count: {
            invisible: [['count', '=', 1]]
          },
          advance_payment_method: {
            widget: 'radio',
            invisible: [['count', '>', 1]],
            class: 'oe_inline'
          },
          _label_deduct_down_payments: {
            for: 'deduct_down_payments',
            invisible: ['|', ['has_down_payments', '=', false], ['advance_payment_method', '!=', 'delivered']]
          },
          _div: {
            _attr: {
              invisible: ['|', ['has_down_payments', '=', false], ['advance_payment_method', '!=', 'delivered']]
            },
            deduct_down_payments: {},
            _label_deduct_down_payments: {
              for: 'deduct_down_payments'
            }
          }
        },
        _group_down_payment_specification: {
          _attr: {
            name: 'down_payment_specification',
            invisible: [['advance_payment_method', 'not in', ('fixed', 'percentage')]]
          },
          company_id: {
            invisible: '1'
          },
          product_id: {
            invisible: '1'
          },
          _label_amount: {
            for: 'amount'
          },
          _div: {
            currency_id: {
              invisible: '1'
            },
            fixed_amount: {
              required: [['advance_payment_method', '=', 'fixed']],
              invisible: [['advance_payment_method', '!=', 'fixed']],
              class: 'oe_inline'
            },
            amount: {
              required: [['advance_payment_method', '=', 'percentage']],
              invisible: [['advance_payment_method', '!=', 'percentage']],
              class: 'oe_inline'
            },
            _span: {
              _attr: {
                invisible: [['advance_payment_method', '!=', 'percentage']],
                class: 'oe_inline',
                text: '%'
              }
            }
          },
          deposit_account_id: {
            groups: 'account.group_account_manager',
            invisible: [['product_id', '!=', false]],
            no_create: true
          },
          deposit_taxes_id: {
            widget: 'many2many_tags',
            invisible: [['product_id', '!=', false]]
          }
        },
        _footer: {
          _button_create_invoices: {
            _attr: {
              name: 'create_invoices',
              type: 'object',
              string: 'Create and View Invoice',
              context: {
                open_invoices: true
              },
              class: 'btn-primary'
            }
          },
          _button_create_invoices_505: {
            _attr: {
              name: 'create_invoices',
              type: 'object',
              string: 'Create Invoice'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_view_sale_advance_payment_inv: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create invoices',
    type: 'ir.actions.act_window',
    res_model: 'sale.advance.payment.inv',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
