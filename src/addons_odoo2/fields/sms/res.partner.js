const ModelFields = {
  mobile: {},
  mobile_blacklisted: {},
  phone: {},
  phone_blacklisted: {},
  phone_sanitized: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'res.partner': ModelFields
}

export default AddonsFields

