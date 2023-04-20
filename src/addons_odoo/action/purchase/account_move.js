const view_move_form_sheet = {
  _div_button_box: {
    _button_action_view_source_purchase_orders: {
      _attr: {
        name: 'action_view_source_purchase_orders',
        type: 'object',
        icon: 'fa-pencil-square-o',
        groups: 'purchase.group_purchase_user',
        // invisible: [
        //   '|',
        //   ['purchase_order_count', '=', 0],
        //   [
        //     'move_type',
        //     'not in',
        //     ('out_invoice',
        //     'out_refund',
        //     'in_invoice',
        //     'in_refund',
        //     'out_receipt',
        //     'in_receipt')
        //   ]
        // ],
        class: 'oe_stat_button'
      },
      purchase_order_count: {
        string: 'Purchases',
        widget: 'statinfo'
      }
    }
  },
  _group: {
    _group_header_left_group: {
      invoice_vendor_bill_id: {}

      //   _div: {
      //     _attr: {
      //       groups: 'purchase.group_purchase_user'
      //     },
      //     purchase_id: {
      //       invisible: '1'
      //     },
      //     _label_purchase_vendor_bill_id: {
      //       for: 'purchase_vendor_bill_id',
      //       string: 'Auto-Complete',
      //       //   invisible: [
      //       //     '|',
      //       //     ['state', '!=', 'draft'],
      //       //     ['move_type', '!=', 'in_invoice']
      //       //   ],
      //       class: 'oe_edit_only'
      //     },
      //     purchase_vendor_bill_id: {
      //       //   domain: {
      //       //     todo_ctx:
      //       //       "partner_id and [('company_id', '=', company_id), ('partner_id.commercial_partner_id', '=', commercial_partner_id)] or [('company_id', '=', company_id)]"
      //       //   },
      //       //   invisible: [
      //       //     '|',
      //       //     ['state', '!=', 'draft'],
      //       //     ['move_type', '!=', 'in_invoice']
      //       //   ],
      //       //   context: {
      //       //     show_total_amount: true
      //       //   },
      //       class: 'oe_edit_only',
      //       placeholder: 'Select a purchase order or an old bill',
      //       no_create: true,
      //       no_open: true
      //     }
      //   }
    }
  }
}

export default {
  view_move_form_inherit_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        ...view_move_form_sheet
      }
    }
  }
}
