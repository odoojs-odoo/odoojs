const ModelFields = {
  activity_ids: {},
  email: {
    required: [['user_ids', '!=', []]],
    context: {
      gravatar_image: true
    }
  },

  is_blacklisted: {},
  message_follower_ids: {},
  message_ids: {}
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

