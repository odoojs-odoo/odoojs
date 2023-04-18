const ModelFields = {
  action: {},
  active: {},
  auto: {},
  company_id: {
    groups: 'base.group_multi_company',
    required: [['action', '=', 'push']]
  },

  delay: {},
  group_id: {
    required: [['group_propagation_option', '=', 'fixed']]
  },

  group_propagation_option: {},
  location_dest_id: {},
  location_src_id: {
    required: [['action', 'in', ['pull', 'push', 'pull_push']]]
  },

  name: {},
  partner_address_id: {},
  picking_type_code_domain: {},
  picking_type_id: {},
  procure_method: {},
  propagate_cancel: {},
  propagate_warehouse_id: {},
  route_company_id: {},
  route_id: {},
  rule_message: {},
  sequence: {
    string: 'Sequence',
    groups: 'base.group_no_one'
  },

  warehouse_id: {
    groups: 'base.group_no_one'
  }
}

const AddonsFields = {
  'stock.rule': ModelFields
}

export default AddonsFields

