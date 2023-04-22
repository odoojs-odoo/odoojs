const ModelFields = {
  account_move_id: {},
  accounting_date: {
    //   accounting_date_$_form: {
    //     groups: 'account.group_account_invoice,account.group_account_readonly'
    //   },
    //   accounting_date_$_tree: { groups: 'account.group_account_manager' },
    readonly({ record }) {
      // readonly: [['state', 'in', ['post', 'done']]]
      const { state } = record
      return ['post', 'done'].includes(state)
    }
  },

  activity_ids: { readonly: '1' },
  address_id: {
    domain({ record }) {
      // check_company=True
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

  amount_residual: {},
  bank_journal_id: {
    domain({ record }) {
      // check_company=True
      // ['|', ('company_id', '=', False), ('company_id', '=', company_id)]
      // domain="[('type', 'in', ['cash', 'bank']), ('company_id', '=', company_id)]",
      const { company_id } = record
      return [
        ['type', 'in', ['cash', 'bank']],
        ['company_id', '=', company_id]
      ]
    },
    groups: 'account.group_account_invoice,account.group_account_readonly',
    context({ record }) {
      // context: "{'default_company_id': company_id}"
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  can_approve: {},
  can_reset: {},
  company_id: { groups: 'base.group_multi_company' },
  create_date: {},
  currency_id: {},
  department_id: {
    context({ record }) {
      // context: "{'default_company_id': company_id}"
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  employee_id: {
    // check_company=True, domain= lambda self: self.env['hr.expense']._get_employee_id_domain())
    // todo domain
    // domain :[],
    context({ record }) {
      // context: "{'default_company_id': company_id}"
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  expense_line_ids: {
    domain({ record }) {
      // "[('state', '=', 'draft'), ('employee_id', '=', employee_id), ('company_id', '=', company_id)]"
      const { employee_id, company_id } = record
      return [
        ['state', '=', 'draft'],
        ['employee_id', '=', employee_id],
        ['company_id', '=', company_id]
      ]
    },

    readonly({ record }) {
      // readonly: [['is_editable', '=', false]],
      const { is_editable } = record
      return !is_editable
    },
    context({ record }) {
      const { employee_id, company_id } = record
      return {
        form_view_ref: 'hr_expense.hr_expense_view_form_without_header',
        default_company_id: company_id,
        default_employee_id: employee_id
      }
    }
  },

  expense_number: { string: 'Expenses' },
  is_editable: {},
  journal_id: {
    //
    domain({ record }) {
      // check_company=True, domain="[('type', '=', 'purchase'), ('company_id', '=', company_id)]",
      const { company_id } = record
      return [
        ['type', 'in', ['purchase']],
        ['company_id', '=', company_id]
      ]
    },

    groups: 'account.group_account_invoice,account.group_account_readonly',
    context({ record }) {
      const { company_id } = record
      return { default_company_id: company_id }
    }
  },

  name: {
    readonly({ record }) {
      // readonly: [['is_editable', '=', false]],
      const { is_editable } = record
      return !is_editable
    },
    placeholder: 'e.g. Trip to NY',
    string: 'Expense Report'
  },

  payment_mode: {},
  payment_state: {},
  product_ids: {},
  state: {
    selection: [
      ['draft', 'Draft'],
      ['submit', 'Submitted'],
      ['approve', 'Approved'],
      ['post', 'Posted'],
      ['done', 'Done'],
      ['cancel', 'Refused']
    ]
  },

  total_amount: {},
  total_amount_taxes: {},
  untaxed_amount: {},
  user_id: {}
}

const AddonsFields = {
  'hr.expense.sheet': ModelFields
}

export default AddonsFields
