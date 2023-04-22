export default {
  mrp_bom_line_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.bom.line',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group: {
            _attr: { string: 'Component' },
            product_id: {},
            parent_product_tmpl_id: { invisible: '1' },
            _label_product_qty: {
              for: 'product_qty',
              string: 'Quantity'
            },
            _div: {
              _attr: { class: 'o_row' },
              product_qty: {},
              product_uom_category_id: { invisible: '1' },
              product_uom_id: {
                groups: 'uom.group_uom',
                no_open: true,
                no_create: true
              }
            },
            possible_bom_product_template_attribute_value_ids: { invisible: '1' },
            bom_product_template_attribute_value_ids: {
              widget: 'many2many_tags',
              groups: 'product.group_product_variant',
              no_create: true
            }
          },
          _group_622: {
            _attr: { string: 'Operation' },
            company_id: { invisible: '1' },
            sequence: { groups: 'base.group_no_one' },
            allowed_operation_ids: { invisible: '1' },
            operation_id: { groups: 'mrp.group_mrp_routings' }
          }
        }
      }
    }
  }
}
