const ModelFields = {
  active: {},
  allow_operation_dependencies: {},
  blocked_by_operation_ids: {
    context: { todo_ctx: "{'default_bom_id':bom_id}" },
    groups: 'mrp.group_mrp_workorder_dependencies'
  },

  bom_id: {
    domain: [],
    readonly: "context.get['default_bom_id', False]"
  },

  bom_product_template_attribute_value_ids: { groups: 'product.group_product_variant' },
  company_id: { groups: 'base.group_multi_company' },
  name: {},
  note: {},
  possible_bom_product_template_attribute_value_ids: {},
  sequence: {},
  time_computed_on: {},
  time_cycle: { string: 'Duration (minutes)' },
  time_cycle_manual: {},
  time_mode: {},
  time_mode_batch: {},
  workcenter_id: {
    context: { todo_ctx: "{'default_company_id': company_id}" }
  },

  workorder_count: {},
  worksheet: { required: [['worksheet_type', '=', 'pdf']] },
  worksheet_google_slide: {
    required: [['worksheet_type', '=', 'google_slide']],
    placeholder: 'Google Slide Link'
  },

  worksheet_type: {}
}

const AddonsFields = {
  'mrp.routing.workcenter': ModelFields
}

export default AddonsFields

