const ModelFields = {
  sequence: {},

  partner_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  product_id: {
    domain() {
      // todo
      //
      //   domain = "product_tmpl_id and [('product_tmpl_id', '=', product_tmpl_id)] or []"
      //   if self.env.context.get('base_model_name') == 'product.template':
      //       domain = "[('product_tmpl_id', '=', parent.id)]"
      //   elif self.env.context.get('base_model_name') == 'product.product':
      //       domain = "[('product_tmpl_id', '=', parent.product_tmpl_id)]"
      //   return domain

      return []
    }
  },

  product_tmpl_id: {
    domain({ record }) {
      //   [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    }
  },

  product_name: {},
  product_code: {},

  date_start: {},
  date_end: {},
  company_id: {},
  min_qty: {},
  product_uom: {},
  price: {},
  currency_id: {},
  delay: {}
}

const AddonsFields = {
  'product.supplierinfo': ModelFields
}

export default AddonsFields
