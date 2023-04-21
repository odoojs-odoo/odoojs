const ModelFields = {
  name: {},
  stage_id: {},
  tag_ids: {},
  title: {
    string: 'Campaign Name',
    placeholder: 'e.g. Black Friday',
    readonly: '1'
  },

  user_id: { domain: [['share', '=', false]] }
}

const AddonsFields = {
  'utm.campaign': ModelFields
}

export default AddonsFields

