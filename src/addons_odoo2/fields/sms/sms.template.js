const ModelFields = {
  body: {},
  lang: {
    groups: 'base.group_no_one',
    placeholder: 'e.g. en_US or {{ object.partner_id.lang }}'
  },

  model: {},
  model_id: {
    required: '1',
    placeholder: 'e.g. Contact'
  },

  name: {
    required: '1',
    placeholder: 'e.g. Calendar Reminder'
  },

  sidebar_action_id: {}
}

const AddonsFields = {
  'sms.template': ModelFields
}

export default AddonsFields

