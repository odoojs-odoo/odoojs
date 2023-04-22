const ModelFields = {
  action: {},
  duplicated_lead_ids: {},
  lead_id: {},
  name: {},
  partner_id: {
    required: [['action', '=', 'exist']],
    context: {
      res_partner_search_mode: 'customer',
      show_vat: true
    }
  },

  team_id: {},
  user_id: { domain: [['share', '=', false]] }
}

const AddonsFields = {
  'crm.lead2opportunity.partner': ModelFields
}

export default AddonsFields

