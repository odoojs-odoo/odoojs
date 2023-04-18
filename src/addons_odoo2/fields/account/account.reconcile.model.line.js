const ModelFields = {
  account_id: {
    domain: {
      todo_ctx: "[('company_id', '=', company_id)]"
    },
    required: ['|', ['rule_type', '!=', 'invoice_matching'], '&', '&', ['rule_type', '=', 'invoice_matching'], ['allow_payment_tolerance', '=', true], ['payment_tolerance_param', '!=', 0.0]]
  },

  allow_payment_tolerance: {},
  amount_string: {},
  amount_type: {},
  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting'
  },

  company_id: {},
  force_tax_included: {},
  label: {},
  model_id: {},
  payment_tolerance_param: {},
  rule_type: {},
  show_force_tax_included: {},
  tax_ids: {
    domain: {
      todo_ctx: "[('company_id', '=', company_id)]"
    },
    context: {
      append_type_to_tax_name: true
    }
  }
}

const AddonsFields = {
  'account.reconcile.model.line': ModelFields
}

export default AddonsFields

