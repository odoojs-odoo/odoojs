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
              text: 'bottom',
              editable: 'bottom'
            }
          }
        },
        _xpath_305: {
          _attr: {
            expr: '//tree',
            position: 'inside'
          },
          company_id: { invisible: '1' }
        },
        _xpath_879: {
          _attr: {
            expr: "//field[@name='company_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0',
              readonly: '0'
            }
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'hide',
              optional: 'hide'
            }
          }
        },
        _xpath_937: {
          _attr: {
            expr: "//field[@name='partner_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0',
              readonly: '0'
            }
          }
        },
        _xpath_110: {
          _attr: {
            expr: "//field[@name='product_id']",
            position: 'attributes'
          },
          _attribute_readonly: {
            _attr: {
              name: 'readonly',
              text: '0',
              readonly: '0'
            }
          },
          _attribute_options: {
            _attr: {
              name: 'options',
              text: "{'no_create': True, 'no_open': True}",
              options: "{'no_create': True, 'no_open': True}"
            }
          }
        },
        _xpath_545: {
          _attr: {
            expr: "//field[@name='delay']",
            position: 'attributes'
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'show',
              optional: 'show'
            }
          }
        }
      }
    }
  }
}
