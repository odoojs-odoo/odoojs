const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  create_date: { readonly: '1' },
  create_uid: { readonly: '1' },
  datas: {},
  name: {},
  res_name: {},
  type: {},
  url: {}
}

const AddonsFields = {
  'mrp.document': ModelFields
}

export default AddonsFields

