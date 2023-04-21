export default {
  view_move_form_inherit_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        invoice_vendor_bill_id: {
          position: 'after',
          __todo__after: {
            _t: {
              _attr: { groups: 'purchase.group_purchase_user' },
              purchase_id: { invisible: '1' },
              _label_purchase_vendor_bill_id: {
                for: 'purchase_vendor_bill_id',
                string: 'Auto-Complete',
                invisible: ['|', ['state', '!=', 'draft'], ['move_type', '!=', 'in_invoice']],
                class: 'oe_edit_only'
              },
              purchase_vendor_bill_id: {
                domain: { todo_ctx: "partner_id and [('company_id', '=', company_id), ('partner_id.commercial_partner_id', '=', commercial_partner_id)] or [('company_id', '=', company_id)]" },
                invisible: ['|', ['state', '!=', 'draft'], ['move_type', '!=', 'in_invoice']],
                context: { show_total_amount: true },
                class: 'oe_edit_only',
                placeholder: 'Select a purchase order or an old bill',
                no_create: true,
                no_open: true
              }
            }
          }
        },
        _label_: {},
        _field_invoice_vendor_bill_id_617: {
          invoice_vendor_bill_id: {
            position: 'attributes',
            __todo__groups: '!purchase.group_purchase_user'
          }
        },
        _xpath: {
          _attr: {
            expr: "//field[@name='invoice_line_ids']/tree/field[@name='company_id']",
            position: 'after'
          },
          purchase_line_id: {
            groups: 'purchase.group_purchase_user',
            invisible: '1'
          },
          purchase_order_id: {
            groups: 'purchase.group_purchase_user',
            column_invisible: [['parent.move_type', '!=', 'in_invoice']],
            optional: 'hide'
          }
        },
        _xpath_260: {
          _attr: {
            expr: "//field[@name='line_ids']/tree/field[@name='company_id']",
            position: 'after'
          },
          purchase_line_id: {
            groups: 'purchase.group_purchase_user',
            invisible: '1'
          }
        },
        _xpath_763: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_source_purchase_orders: {
            _attr: {
              name: 'action_view_source_purchase_orders',
              type: 'object',
              icon: 'fa-pencil-square-o',
              groups: 'purchase.group_purchase_user',
              invisible: ['|', ['purchase_order_count', '=', 0], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
              class: 'oe_stat_button'
            },
            purchase_order_count: {
              string: 'Purchases',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  },

  act_res_partner_2_supplier_invoices: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendor Bills',
    res_model: 'account.move',
    search_view_id: 'tooooooodoooooo',
    domain: "[['move_type','in',['in_invoice', 'in_refund']]]",
    context: { todo_ctx: "{'search_default_partner_id': active_id, 'default_move_type': 'in_invoice', 'default_partner_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
