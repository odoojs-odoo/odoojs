const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
    // domain({ env }) {
    //   // [('company_id', 'in', (self.env.company.id, False))]
    //   console.log(env)
    //   return []
    // }
  },
  user_id: {
    domain: [['share', '=', false]]
  },

  state: {
    selection: [
      ['draft', 'RFQ'],
      ['sent', 'RFQ Sent'],
      ['to approve', 'To Approve'],
      ['purchase', 'Purchase Order'],
      ['done', 'Locked'],
      ['cancel', 'Cancelled']
    ]
  },

  partner_id: {
    domain: ({ record }) => {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]"
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    },
    context: { res_partner_search_mode: 'supplier', show_vat: true },
    placeholder: 'Name, TIN, Email, or Reference'
  },
  partner_ref: {},
  currency_id: {},
  notes: { placeholder: 'Define your terms and conditions ...' },

  payment_term_id: {
    domain: ({ record }) => {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]"
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    },
    readonly: ({ record }) => {
      // 'readonly': ['|', ('invoice_status','=', 'invoiced'),
      // ('state', '=', 'done')]}"
      const { invoice_status, state } = record
      return invoice_status === 'invoiced' || state === 'done'
    }
  },
  fiscal_position_id: {
    domain: ({ record }) => {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]"
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    },
    readonly: ({ record }) => {
      // 'readonly': ['|', ('invoice_status','=', 'invoiced'),
      // ('state', '=', 'done')]}"
      const { invoice_status, state } = record
      return invoice_status === 'invoiced' || state === 'done'
    }
  },
  order_line: {
    context: { default_state: 'draft' },
    readonly: ({ record }) => {
      console.log('qwewqeqe', record)
      const { state } = record
      return ['done', 'cancel'].includes(state)
    }
  }
}

const AddonsFields = {
  'purchase.order': ModelFields
}

export default AddonsFields
