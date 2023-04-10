const ModelFields = {
  product_id: {
    readonly: ({ record }) => {
      const { state } = record
      return ['purchase', 'to approve', 'done', 'cancel'].includes(state)
    },
    required: ({ record }) => {
      const { display_type } = record
      return !display_type
    },
    domain: ({ record }) => {
      const { parent: parent2 } = record
      return [
        ['purchase_ok', '=', true],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', parent2.company_id]
      ]
    },
    context: ({ record }) => {
      const { parent: parent2, product_qty, product_uom } = record
      return {
        partner_id: parent2.partner_id,
        quantity: product_qty,
        uom: product_uom,
        company_id: parent2.company_id
      }
    }
  },

  date_planned: {
    required: ({ record }) => {
      // 'required': [('display_type', '=', False)]
      const { display_type } = record
      return !display_type
    }
  },
  analytic_distribution: {
    widget: 'analytic_distribution',
    groups: 'analytic.group_analytic_accounting',
    options: {
      product_field: 'product_id',
      business_domain: 'purchase_order'
    }
  },

  qty_received: {
    string: 'Received Quantity',
    readonly: ({ record }) => {
      // 'readonly': [('qty_received_method', '!=', 'manual')]
      //
      const { qty_received_method } = record
      return qty_received_method !== 'manual'
    }
  },
  qty_invoiced: { string: 'Billed Quantity' },
  product_uom: {
    string: 'UoM',
    groups: 'uom.group_uom',

    domain: ({ record }) => {
      // domain="[('category_id', '=', product_uom_category_id)]
      const { product_uom_category_id } = record
      return [['category_id', '=', product_uom_category_id]]
    },

    readonly: ({ record }) => {
      //  'readonly':
      // [('state', 'in', ('purchase', 'done', 'cancel'))],
      const { state } = record
      return ['purchase', 'done', 'cancel'].includes(state)
    },
    required: ({ record }) => {
      // 'required': [('display_type', '=', False)]
      const { display_type } = record
      return !display_type
    }
  },

  product_packaging_qty: { groups: 'product.group_stock_packaging' },
  product_packaging_id: {
    groups: 'product.group_stock_packaging',
    domain: ({ record }) => {
      // domain="[('purchase', '=', True),
      // ('product_id', '=', product_id)]
      const { product_id } = record
      return [
        ['purchase', '=', true],
        ['product_id', '=', product_id]
      ]
    },
    context: ({ record }) => {
      // context="{
      // 'default_product_id': product_id,
      // 'tree_view_ref':'product.product_packaging_tree_view',
      // 'form_view_ref':'product.product_packaging_form_view'}"

      const { product_id } = record
      return {
        default_product_id: product_id,
        tree_view_ref: 'product.product_packaging_tree_view',
        form_view_ref: 'product.product_packaging_form_view'
      }
    }
  },
  price_unit: {
    readonly: ({ record }) => {
      // 'readonly': [('qty_invoiced', '!=', 0)]
      const { qty_invoiced } = record
      return !qty_invoiced
    }
  },
  taxes_id: {
    //  context="{'default_type_tax_use': 'purchase', 'search_view_ref': 'account.account_tax_view_search'}"
    context: {
      default_type_tax_use: 'purchase',
      search_view_ref: 'account.account_tax_view_search'
    },

    domain: ({ record }) => {
      // domain="[('type_tax_use','=','purchase'),
      // ('company_id', '=', parent.company_id),
      // ('country_id', '=', parent.tax_country_id)]"
      const { parent: parent2 } = record
      return [
        ['type_tax_use', '=', true],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', parent2.company_id]
      ]
    }
  }
}

const AddonsFields = {
  'purchase.order.line': ModelFields
}

export default AddonsFields
