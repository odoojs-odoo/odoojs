const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
    // domain({ env }) {
    //   // [('company_id', 'in', (self.env.company.id, False))]
    //   console.log(env)
    //   return []
    // }
  }
}

const AddonsFields = {
  'purchase.order': ModelFields
}

export default AddonsFields
