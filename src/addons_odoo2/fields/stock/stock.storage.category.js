const ModelFields = {
  allow_new_product: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  max_weight: {
    string: 'Max Weight (kg)'
  },

  name: {},
  package_capacity_ids: {
    context: {
      todo_ctx: "{'default_storage_category_id': id, 'default_company_id': company_id}"
    }
  },

  product_capacity_ids: {
    context: {
      todo_ctx: "{'default_storage_category_id': id, 'default_company_id': company_id}"
    }
  }
}

const AddonsFields = {
  'stock.storage.category': ModelFields
}

export default AddonsFields

