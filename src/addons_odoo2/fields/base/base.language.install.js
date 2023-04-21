const ModelFields = {
  first_lang_id: { readonly: 'True' },
  lang_ids: {
    context: { active_test: false }
  },

  overwrite: { groups: 'base.group_no_one' }
}

const AddonsFields = {
  'base.language.install': ModelFields
}

export default AddonsFields

