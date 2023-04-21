const ModelFields = {
  active: { groups: 'base.group_no_one' },
  amount: {},
  amount_type: {},
  analytic: { groups: 'analytic.group_analytic_accounting' },
  cash_basis_transition_account_id: { required: [['tax_exigibility', '=', 'on_payment']] },
  children_tax_ids: {
    domain: { todo_ctx: "[('type_tax_use','in',('none',type_tax_use)), ('amount_type','!=','group')]" }
  },

  description: {},
  include_base_amount: {},
  is_base_affected: {},
  name: {},
  price_include: {},
  tax_exigibility: {},
  type_tax_use: {}
}

const AddonsFields = {
  'account.tax.template': ModelFields
}

export default AddonsFields

