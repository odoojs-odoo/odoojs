const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  is_subscribed: {},
  kpi_mail_message_total: {},
  kpi_res_users_connected: {},
  name: {
    placeholder: 'e.g. Your Weekly Digest',
    string: 'Title'
  },

  next_run_date: { groups: '===todo==' },
  next_run_date_$_form: { groups: 'base.group_system' },
  next_run_date_$_tree: { groups: 'base.group_no_one' },
  periodicity: {},
  state: { groups: 'base.group_no_one' },
  user_ids: {}
}

const AddonsFields = {
  'digest.digest': ModelFields
}

export default AddonsFields

