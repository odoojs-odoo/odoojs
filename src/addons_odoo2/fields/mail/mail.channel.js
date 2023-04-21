const ModelFields = {
  active: {},
  avatar_128: {},
  channel_member_ids: {
    readonly: [['channel_type', '=', 'chat']],
    context: { active_test: false }
  },

  channel_type: {},
  description: { placeholder: 'Topics discussed in this group...' },
  group_ids: { string: 'Auto Subscribe Groups' },
  group_public_id: {},
  image_128: {},
  name: {
    readonly: '0',
    placeholder: 'e.g. support'
  }
}

const AddonsFields = {
  'mail.channel': ModelFields
}

export default AddonsFields

