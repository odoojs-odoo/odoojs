export default {
  mrp_bom_byproduct_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom.byproduct',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          allowed_operation_ids: { invisible: '1' },
          company_id: {},
          product_id: {},
          product_uom_category_id: { invisible: '1' },
          _label_product_qty: { for: 'product_qty' },
          _div: {
            _attr: { class: 'o_row' },
            product_qty: {},
            product_uom_id: { groups: 'uom.group_uom' }
          },
          operation_id: {
            groups: 'mrp.group_mrp_routings',
            no_quick_create: true,
            no_create_edit: true
          },
          possible_bom_product_template_attribute_value_ids: { invisible: '1' },
          bom_product_template_attribute_value_ids: {
            widget: 'many2many_tags',
            groups: 'product.group_product_variant',
            no_create: true
          }
        }
      }
    }
  }
}
