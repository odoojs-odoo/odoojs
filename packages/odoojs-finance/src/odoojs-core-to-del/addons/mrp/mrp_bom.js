export default {
  models: {
    'mrp.bom': {
      fields: [
        'code',
        'active',
        'type',
        'product_tmpl_id',
        'product_id',
        'bom_line_ids',
        'product_qty',
        'product_uom_id',
        'sequence',
        'routing_id',
        'ready_to_produce',
        'picking_type_id',
        'company_id',
      ],
    },

    'mrp.bom.line': {
      fields: [
        'product_id',
        'product_tmpl_id',
        'product_qty',
        'product_uom_id',
        'sequence',
        'routing_id',
        'bom_id',
        'parent_product_tmpl_id',
        'attribute_value_ids',
        'operation_id',
        'child_bom_id',
        'child_line_ids',
        'has_attachments',
      ],
    },
  },
};
