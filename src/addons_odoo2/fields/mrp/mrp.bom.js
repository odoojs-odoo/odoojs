const ModelFields = {
  active: {},
  allow_operation_dependencies: { groups: 'mrp.group_mrp_workorder_dependencies' },
  bom_line_ids: {
    context: { todo_ctx: "{'default_parent_product_tmpl_id': product_tmpl_id, 'default_product_id': False, 'default_bom_id': id}" }
  },

  byproduct_ids: {
    context: {
      form_view_ref: 'mrp.mrp_bom_byproduct_form_view',
      default_bom_id: 'todo===id'
    }
  },

  code: {},
  company_id: { groups: 'base.group_multi_company' },
  consumption: {},
  operation_ids: {
    groups: 'mrp.group_mrp_routings',
    context: {
      bom_id_invisible: true,
      default_bom_id: 'todo===id',
      tree_view_ref: 'mrp.mrp_routing_workcenter_bom_tree_view'
    }
  },

  picking_type_id: {
    string: 'Operation',
    groups: 'stock.group_adv_location'
  },

  product_id: {
    groups: 'product.group_product_variant',
    context: { default_detailed_type: 'product' }
  },

  product_qty: {},
  product_tmpl_id: {
    context: { default_detailed_type: 'product' }
  },

  product_uom_category_id: {},
  product_uom_id: {
    groups: 'uom.group_uom',
    string: 'Unit of Measure'
  },

  ready_to_produce: {
    string: 'Manufacturing Readiness',
    groups: 'mrp.group_mrp_routings'
  },

  sequence: {},
  type: {}
}

const AddonsFields = {
  'mrp.bom': ModelFields
}

export default AddonsFields

