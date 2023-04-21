const ModelFields = {
  description_purchase: { placeholder: 'This note is added to purchase orders.' },
  property_account_expense_id: { readonly: [['purchase_ok', '=', 0]] },
  purchase_line_warn: {},
  purchase_line_warn_msg: {
    required: [['purchase_line_warn', '!=', 'no-message']],
    readonly: [['purchase_line_warn', '=', 'no-message']],
    placeholder: 'Type a message...'
  },

  purchase_method: {},
  purchased_product_qty: {},
  seller_ids: {
    readonly: [['product_variant_count', '>', 1]],
    context: { todo_ctx: "{'default_product_tmpl_id':context.get('product_tmpl_id',active_id), 'product_template_invisible_variant': True, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}" }
  },

  supplier_taxes_id: {},
  uom_name: {},
  variant_seller_ids: {
    readonly: [['product_variant_count', '<=', 1]],
    context: { todo_ctx: "{'model': active_model, 'active_id': active_id, 'tree_view_ref':'purchase.product_supplierinfo_tree_view2'}" }
  }
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

