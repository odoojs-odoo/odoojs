const ModelFields = {
  action: {},
  deduplicate: {},
  duplicated_lead_ids: { readonly: '1' },
  force_assignment: {},
  lead_tomerge_ids: {},
  name: {},
  partner_id: {
    required: [['action', '=', 'exist']],
    context: { show_vat: true }
  },

  team_id: {},
  user_ids: { domain: [['share', '=', false]] }
}

const AddonsFields = {
  'crm.lead2opportunity.partner.mass': ModelFields
}

export default AddonsFields

