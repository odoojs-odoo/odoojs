const ModelFields = {
  partner_email: {},
  partner_id: {
    readonly: [['id', '!=', false]]
  }
}

const AddonsFields = {
  'mail.channel.channel_member_ids': ModelFields
}

export default AddonsFields

