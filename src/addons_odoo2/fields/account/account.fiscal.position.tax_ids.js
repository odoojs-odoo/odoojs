const ModelFields = {
  tax_dest_id: {
    domain: '===todo==',
    context: {
      append_type_to_tax_name: true
    }
  },

  tax_dest_id_$_todoview___form_tax_map_form: {
    domain: [['type_tax_use', '!=', 'none']]
  },

  tax_dest_id_$_todoview___tree_tax_map_tree: {
    domain: {
      todo_ctx: "[                                             ('type_tax_use', '!=', 'none'),                                             ('country_id', '=', parent.country_id if parent.foreign_vat else parent.company_country_id),                                             '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
    }
  },

  tax_src_id: {
    domain: '===todo==',
    context: {
      append_type_to_tax_name: true
    }
  },

  tax_src_id_$_todoview___form_tax_map_form: {
    domain: [['type_tax_use', '!=', 'none']]
  },

  tax_src_id_$_todoview___tree_tax_map_tree: {
    domain: {
      todo_ctx: "[                                             ('type_tax_use', '!=', 'none'),                                             ('country_id', '=', parent.company_country_id),                                             '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)                                         ]"
    }
  }
}

const AddonsFields = {
  'account.fiscal.position.tax_ids': ModelFields
}

export default AddonsFields

