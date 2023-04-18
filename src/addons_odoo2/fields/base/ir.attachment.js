const ModelFields = {
  company_id: {
    groups: 'base.group_multi_company'
  },

  create_date: {},
  create_uid: {},
  datas: {},
  description: {},
  file_size: {},
  index_content: {},
  mimetype: {
    groups: 'base.group_no_one'
  },

  name: {},
  public: {},
  res_field: {},
  res_id: {},
  res_model: {},
  res_name: {},
  type: {},
  url: {}
}

const AddonsFields = {
  'ir.attachment': ModelFields
}

export default AddonsFields

