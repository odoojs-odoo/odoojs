const ModelFields = {
  supplierinfo_id: {},
  supplierinfo_ids: {
    context: { tree_view_ref: 'purchase_stock.product_supplierinfo_replenishment_tree_view' },
    readonly: '1'
  }
}

const AddonsFields = {
  'stock.replenishment.info': ModelFields
}

export default AddonsFields

