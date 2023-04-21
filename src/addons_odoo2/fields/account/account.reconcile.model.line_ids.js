const ModelFields = {
  account_id: {},
  amount_string: {},
  amount_type: {},
  analytic_distribution: { groups: 'analytic.group_analytic_accounting' },
  company_id: {},
  force_tax_included: {},
  journal_id: {},
  label: {},
  sequence: {},
  show_force_tax_included: {},
  tax_ids: {}
}

const AddonsFields = {
  'account.reconcile.model.line_ids': ModelFields
}

export default AddonsFields

