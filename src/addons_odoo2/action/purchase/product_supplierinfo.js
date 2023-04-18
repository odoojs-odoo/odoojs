export default {
  product_supplierinfo_tree_view2: {
    _odoo_model: 'ir.ui.view',
    model: 'product.supplierinfo',
    inherit_id: 'product.product_supplierinfo_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_editable: {
            _attr: {
              name: 'editable',
              text: 'bottom'
            }
          }
        },
        _xpath_608: {
          _attr: {
            expr: '//tree',
            position: 'inside'
          },
          company_id: {
            invisible: '1'
          }
        },
        _xpath_226: {
          _attr: {
            expr: "//field[@name='company_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0'
            }
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'hide'
            }
          }
        },
        _xpath_297: {
          _attr: {
            expr: "//field[@name='partner_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0'
            }
          }
        },
        _xpath_538: {
          _attr: {
            expr: "//field[@name='product_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0'
            }
          },
          _attribute_options: {
            _attr: {
              name: 'options',
              text: "{'no_create': True, 'no_open': True}"
            }
          }
        },
        _xpath_479: {
          _attr: {
            expr: "//field[@name='delay']",
            position: 'attributes'
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'show'
            }
          }
        }
      }
    }
  }
}
