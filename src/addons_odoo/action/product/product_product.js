export default {
  product_search_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.product',
    inherit_id: 'product.product_template_search_view',
    arch: {
      fields: {
        name: {
          name: {
            string: 'Product',
            filter_domain: self => {
              return [
                '|',
                '|',
                ['default_code', 'ilike', self],
                ['name', 'ilike', self],
                ['barcode', 'ilike', self]
              ]
            }
          }
        }
        // attribute_line_ids: {
        //   position: 'replace',
        //   __todo__replace: {
        //     product_template_attribute_value_ids: {
        //       groups: 'product.group_product_variant'
        //     },
        //     product_tmpl_id: { string: 'Product Template' }
        //   }
        // }
      }
    }
  }
}
