const ModelFields = {
  general_account_id: { readonly: [['move_line_id', '!=', false]] },
  move_line_id: {},
  partner_id: {},
  product_id: {},
  ref: {}
}

const AddonsFields = {
  'account.analytic.line': ModelFields
}

export default AddonsFields

