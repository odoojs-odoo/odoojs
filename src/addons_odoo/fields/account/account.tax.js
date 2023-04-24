const ModelFields = {
  active: {},
  amount: {},
  amount_type: {},
  analytic: { groups: 'analytic.group_analytic_accounting' },
  cash_basis_transition_account_id: {
    groups: 'account.group_account_readonly',
    required: ({ record }) => {
      //   required: [['tax_exigibility', '=', 'on_payment']]
      const { tax_exigibility } = record
      return tax_exigibility == 'on_payment'
    }
  },

  children_tax_ids: {
    domain({ record }) {
      // domain: [('type_tax_use','in',('none',type_tax_use)),
      //    ('amount_type','!=','group')]
      const { type_tax_use } = record
      return [
        [
          'type_tax_use',
          'in',
          ['none', type_tax_use],
          ['amount_type', '!=', 'group']
        ]
      ]
    }
  },

  company_id: { groups: 'base.group_multi_company' },
  country_code: {},
  country_id: { required: 'True' },
  description: {},
  display_name: { string: 'name' },
  hide_tax_exigibility: {},
  include_base_amount: {},
  invoice_repartition_line_ids: {},
  is_base_affected: { groups: 'base.group_no_one' },
  name: {},
  price_include: {},
  refund_repartition_line_ids: {},
  sequence: {},
  tax_exigibility: { groups: 'account.group_account_readonly' },
  tax_group_id: {
    required: ({ record }) => {
      // required: [['amount_type', '!=', 'group']],
      const { amount_type } = record
      return amount_type == 'group'
    }
  },
  tax_scope: {},
  type_tax_use: {}
}

const AddonsFields = {
  'account.tax': ModelFields
}

export default AddonsFields
