const ModelFields = {
  code: {
    string: 'Code',
    placeholder: 'e.g. en_US'
  },

  data: {},
  filename: {},
  name: { placeholder: 'e.g. English' },
  overwrite: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'base.language.import': ModelFields
}

export default AddonsFields

