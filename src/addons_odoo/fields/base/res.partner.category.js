const ModelFields = {
  display_name: {
    disable_field_onchange: 1
    // string: 'Name'
  },
  name: { string: 'Name' },
  parent_id: { string: 'Parent' },
  active: { string: 'Active' }
}

const AddonsFields = {
  'res.partner.category': ModelFields
}

export default AddonsFields
