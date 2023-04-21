const ModelFields = {
  fiscalyear_last_day: {},
  fiscalyear_last_month: {},
  opening_date: { readonly: [['opening_move_posted', '=', true]] },
  opening_move_posted: {}
}

const AddonsFields = {
  'account.financial.year.op': ModelFields
}

export default AddonsFields

