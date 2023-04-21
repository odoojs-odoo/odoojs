const ModelFields = {
  partner_email: { readonly: '1' },
  partner_id: {
    readonly: [['id', '!=', false]],
    required: '1'
  }
}

const AddonsFields = {
  'mail.channel.channel_member_ids': ModelFields
}

export default AddonsFields

