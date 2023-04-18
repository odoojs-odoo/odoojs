const ModelFields = {
  dst_partner_id: {
    domain: {
      todo_ctx: "[('id', 'in', partner_ids or False)]"
    },
    required: [['state', '=', 'selection']],
    context: {
      partner_show_db_id: true
    }
  },

  exclude_contact: {},
  exclude_journal_item: {},
  group_by_email: {},
  group_by_is_company: {},
  group_by_name: {},
  group_by_parent_id: {},
  group_by_vat: {},
  maximum_group: {
    readonly: [['state', 'in', 'finished']]
  },

  number_group: {},
  partner_ids: {},
  state: {}
}

const AddonsFields = {
  'base.partner.merge.automatic.wizard': ModelFields
}

export default AddonsFields

