const ModelFields = {
  narration_regex: { required: [['payment_ref_regex', '=', false]] },
  partner_id: {},
  payment_ref_regex: { required: [['narration_regex', '=', false]] }
}

const AddonsFields = {
  'account.reconcile.model.partner_mapping_line_ids': ModelFields
}

export default AddonsFields

