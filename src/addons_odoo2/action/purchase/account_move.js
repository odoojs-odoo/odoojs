export default {
  act_res_partner_2_supplier_invoices: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Vendor Bills',
    res_model: 'account.move',
    domain: "[('move_type','in',('in_invoice', 'in_refund'))]",
    context: {
      todo_ctx: "{'search_default_partner_id': active_id, 'default_move_type': 'in_invoice', 'default_partner_id': active_id}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
