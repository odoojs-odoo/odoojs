const ModelFields = {
  account_id: {
    groups: 'account.group_account_readonly',
    domain({ record }) {
      // domain: {
      // "[('account_type', 'not in',
      // ('asset_receivable','liability_payable','asset_cash','liability_credit_card')),
      // ('company_id', '=', company_id)]"
      // },
      const account_types = [
        'asset_receivable',
        'liability_payable',
        'asset_cash',
        'liability_credit_card'
      ]

      const { account_type, company_id } = record
      return !account_types.includes(account_type) && company_id == company_id
    },

    readonly({ record }) {
      // readonly: [
      //   '|',
      //   ['is_editable', '=', false],
      //   ['sheet_is_editable', '=', false]
      // ],
      const { is_editable, sheet_is_editable } = record
      return !is_editable || !sheet_is_editable
    },

    context({ record }) {
      // context: "{'default_company_id': company_id}"
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  accounting_date: {
    // groups: 'account.group_account_invoice,account.group_account_readonly',
    // readonly: '0'
  },

  activity_ids: {},
  amount_tax: {},
  amount_tax_company: {
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },
  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting',
    readonly({ record }) {
      //  readonly: [['is_editable', '=', false]],
      const { is_editable } = record
      return !is_editable
    },
    product_field: 'product_id',
    account_field: 'account_id',
    business_domain: 'expense'
  },

  attachment_number: {},
  company_currency_id: {},
  company_id: { groups: 'base.group_multi_company', readonly: '1' },

  currency_id: { groups: 'base.group_multi_currency' },
  currency_rate: {},
  date: {
    readonly({ record }) {
      //  readonly: [['sheet_is_editable', '=', false]]
      const { sheet_is_editable } = record
      return !sheet_is_editable
    }
  },
  description: { placeholder: 'Notes...' },
  duplicate_expense_ids: {},
  employee_id: {
    groups: 'hr_expense.group_hr_expense_team_approver',
    domain({ record }) {
      // ['|', ('company_id', '=', False), ('company_id', '=', company_id)]
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    },
    context({ record }) {
      // context: "{'default_company_id': company_id}"
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  is_editable: {},
  is_ref_editable: {},
  label_convert_rate: {},
  name: {
    readonly({ record }) {
      //  readonly: [['sheet_is_editable', '=', false]]
      const { sheet_is_editable } = record
      return !sheet_is_editable
    },
    placeholder: 'e.g. Lunch with Customer'
  },

  payment_mode: {},
  product_description: {},
  product_has_cost: {},
  product_has_tax: {},
  product_id: {
    domain({ record }) {
      // domain="[('can_be_expensed', '=', True),
      //   '|', ('company_id', '=', False),
      //   ('company_id', '=', company_id)]",
      const { company_id } = record
      return [
        ['can_be_expensed', '=', true],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', company_id]
      ]
    },

    readonly({ record }) {
      //  readonly: [['sheet_is_editable', '=', false]]
      const { sheet_is_editable } = record
      return !sheet_is_editable
    },
    context: {
      default_can_be_expensed: 1,
      tree_view_ref: 'hr_expense.product_product_expense_tree_view',
      form_view_ref: 'hr_expense.product_product_expense_form_view'
    },
    required: '1'
  },

  product_uom_category_id: {},
  product_uom_id: {
    // domain="[('category_id', '=', product_uom_category_id)]"
    groups: 'uom.group_uom',
    required: '1'
  },

  quantity: {
    readonly({ record }) {
      //  readonly: [['sheet_is_editable', '=', false]]
      const { sheet_is_editable } = record
      return !sheet_is_editable
    }
  },
  reference: {
    groups: 'account.group_account_readonly',
    readonly({ record }) {
      //readonly: [['is_ref_editable', '=', false]]
      const { is_ref_editable } = record
      return !is_ref_editable
    }
  },

  same_currency: {},
  sheet_id: {
    readonly: '1'
    //   domain="[('employee_id', '=', employee_id), ('company_id', '=', company_id)]",
  },
  sheet_is_editable: {},
  state: {
    readonly: '1',
    selection: [
      ['draft', 'To Submit'],
      ['reported', 'Submitted'],
      ['approved', 'Approved'],
      ['done', 'Paid'],
      ['refused', 'Refused']
    ]
  },
  tax_ids: {
    // domain="[('company_id', '=', company_id), ('type_tax_use', '=', 'purchase')]",
    readonly({ record }) {
      // readonly: [
      //   '|',
      //   ['is_editable', '=', false],
      //   ['product_has_cost', '=', true]
      // ],
      const { is_editable, product_has_cost } = record
      return !is_editable || product_has_cost
    },

    context({ record }) {
      const { company_id } = record
      return {
        default_company_id: company_id,
        default_type_tax_use: 'purchase',
        default_price_include: 1
      }
    },
    groups: 'account.group_account_invoice,account.group_account_readonly'
  },

  total_amount: {
    readonly({ record }) {
      //  readonly: [['sheet_is_editable', '=', false]]
      const { sheet_is_editable } = record
      return !sheet_is_editable
    },
    currency_field: 'currency_id'
  },

  total_amount_company: {},
  unit_amount: {
    readonly({ record }) {
      // readonly: [
      //   '|',
      //   ['is_editable', '=', false],
      //   ['product_has_cost', '=', true]
      // ],
      const { is_editable, product_has_cost } = record
      return !is_editable || product_has_cost
    },
    required: '1',
    currency_field: 'currency_id',
    field_digits: true
  },

  unit_amount_display: { string: 'Unit Price' }
}

const AddonsFields = {
  'hr.expense': ModelFields
}

export default AddonsFields
