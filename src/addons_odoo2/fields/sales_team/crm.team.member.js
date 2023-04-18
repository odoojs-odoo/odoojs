const ModelFields = {
  active: {},
  company_id: {
    groups: 'base.group_multi_company'
  },

  crm_team_id: {},
  email: {},
  image_1920: {},
  is_membership_multi: {},
  member_warning: {},
  mobile: {},
  phone: {},
  user_company_ids: {},
  user_id: {},
  user_in_teams_ids: {}
}

const AddonsFields = {
  'crm.team.member': ModelFields
}

export default AddonsFields

