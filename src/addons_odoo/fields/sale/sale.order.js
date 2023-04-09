const ModelFields = {
  name: { string: 'Number' },
  state: {
    selection: [
      ['draft', 'Quotation'],
      ['sent', 'Quotation Sent'],
      ['sale', 'Sales Order'],
      ['done', 'Locked'],
      ['cancel', 'Cancelled']
    ]
  },

  company_id: { groups: 'base.group_multi_company' },
  create_date: { string: 'Creation Date' },
  date_order: { string: 'Order Date' },
  commitment_date: { string: 'Delivery Date' },

  order_line: {
    readonly: ({ record }) => {
      // 'readonly': [('state', 'in', ('done','cancel'))]
      const { state } = record
      return ['done', 'cancel'].includes(state)
    }
  },

  partner_id: {
    domain({ record }) {
      // domain="[('type', '!=', 'private'),
      //   ('company_id', 'in', (False, company_id))]")
      const { company_id } = record
      return [
        ['type', '!=', 'private'],
        ['company_id', 'in', [false, company_id]]
      ]
    },
    //  context="{'res_partner_search_mode': 'customer',
    // 'show_address': 1, 'show_vat': True}"

    context: {
      res_partner_search_mode: 'customer',
      show_address: 1,
      show_vat: true
    }
  },

  partner_invoice_id: {
    groups: 'account.group_delivery_invoice_address',
    context: { default_type: 'invoice' },
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      //   ('company_id', '=', company_id)]")
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  partner_shipping_id: {
    groups: 'account.group_delivery_invoice_address',
    context: { default_type: 'delivery' },
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      //   ('company_id', '=', company_id)]",)
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  fiscal_position_id: {
    domain({ record }) {
      // domain="[('company_id', '=', company_id)]")
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },

  payment_term_id: {
    domain({ record }) {
      //  domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]")
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  pricelist_id: {
    groups: 'product.group_product_pricelist',
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]",
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  user_id: {
    domain_creater2: 2,
    async domain_creater({ env }) {
      const refid = await env.ref('sales_team.group_sale_salesman').id
      return ({ record }) => {
        // domain=lambda self: "
        // [('groups_id', '=', {}), ('share', '=', False),
        // ('company_ids', '=', company_id)]".format(
        //  self.env.ref("sales_team.group_sale_salesman").id
        const { company_id } = record
        return [
          ['groups_id', '=', refid],
          ['share', '=', false],
          ['company_ids', '=', company_id]
        ]
      }
    }
  },

  team_id: {
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]")
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  analytic_account_id: {
    groups: 'analytic.group_analytic_accounting',
    readonly: ({ record }) => {
      // 'readonly': [('invoice_count','!=',0),('state','=','sale')]
      const { invoice_count, state } = record
      return invoice_count && state === 'sale'
    },
    domain({ record }) {
      // domain="['|', ('company_id', '=', False),
      // ('company_id', '=', company_id)]")
      const { company_id } = record
      return ['|', ['company_id', '=', false], ['company_id', '=', company_id]]
    }
  },

  invoice_status: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'sale.order': ModelFields
}

export default AddonsFields
