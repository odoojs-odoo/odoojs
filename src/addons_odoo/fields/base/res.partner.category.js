const ModelFields = {
  active: {},
  color: {},
  display_name: { disable_field_onchange: 1 },
  name: { placeholder: 'e.g. "Consulting Services"' },
  parent_id: {}
}

const AddonsFields = {
  'res.partner.category': ModelFields
}

export default AddonsFields
