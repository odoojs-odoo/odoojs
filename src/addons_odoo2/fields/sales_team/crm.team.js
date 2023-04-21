const ModelFields = {
  active: {},
  company_id: { groups: 'base.group_multi_company' },
  crm_team_member_ids: {
    context: { todo_ctx: "{                                     'kanban_view_ref': 'sales_team.crm_team_member_view_kanban_from_team',                                     'form_view_ref': 'sales_team.crm_team_member_view_form_from_team',                                     'tree_view_ref': 'sales_team.crm_team_member_view_tree_from_team',                                     'default_crm_team_id': active_id,                                 }" }
  },

  currency_id: {},
  is_membership_multi: {},
  member_company_ids: {},
  member_ids: {},
  member_warning: {},
  name: {
    placeholder: 'e.g. North America',
    readonly: '1'
  },

  sequence: {},
  user_id: { domain: [['share', '=', false]] }
}

const AddonsFields = {
  'crm.team': ModelFields
}

export default AddonsFields

