const ModelFields = {
  property_product_pricelist: {
    domain({ env }) {
      // [('company_id', 'in', (self.env.company.id, False))]
      console.log(env)
      return []
    }
  }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields
