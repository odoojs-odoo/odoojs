const ModelFields = {
  account_id: {},
  company_id: {},
  factor_percent: {},
  repartition_type: {},
  sequence: {},
  tag_ids: {
    domain: { todo_ctx: "[('applicability', '=', 'taxes'), '|', ('country_id', '=', parent.country_id), ('country_id', '=', False)]" }
  },

  use_in_tax_closing: {}
}

const AddonsFields = {
  'account.tax.repartition.line': ModelFields
}

export default AddonsFields

