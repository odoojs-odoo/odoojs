const ModelFields = {
  new_quantity: {},
  product_id: {
    domain: {
      todo_ctx: "[('product_tmpl_id', '=', product_tmpl_id)]"
    },
    readonly: "context.get['default_product_id']"
  },

  product_tmpl_id: {},
  product_variant_count: {}
}

const AddonsFields = {
  'stock.change.product.qty': ModelFields
}

export default AddonsFields

