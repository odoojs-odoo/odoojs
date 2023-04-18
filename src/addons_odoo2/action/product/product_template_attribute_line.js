export default {
  product_template_attribute_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template.attribute.line',
    type: 'form',
    arch: {
      sheet: {
        _group_main_field: {
          _attr: {
            name: 'main_field'
          },
          _label_attribute_id: {
            for: 'attribute_id',
            string: 'Attribute Name'
          },
          attribute_id: {},
          value_ids: {
            widget: 'one2many',
            views: {
              tree: {
                arch: {
                  sheet: {
                    _attr: {
                      string: 'Values'
                    },
                    name: {},
                    html_color: {}
                  }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _attr: {
                      string: 'Values'
                    },
                    name: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
