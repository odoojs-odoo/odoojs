const ModelFields = {
  account_dest_id: {
    domain: {
      todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
    }
  },

  account_src_id: {
    domain: {
      todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
    }
  }
}

const AddonsFields = {
  'account.fiscal.position.account_ids': ModelFields
}

export default AddonsFields

