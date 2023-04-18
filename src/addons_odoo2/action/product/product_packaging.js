export default {
  product_packaging_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        product_id: {},
        name: {
          string: 'Packaging'
        },
        qty: {},
        product_uom_id: {
          groups: 'uom.group_uom',
          no_open: true,
          no_create: true
        },
        barcode: {
          optional: 'hide'
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'hide'
        }
      }
    }
  },

  product_packaging_tree_view2: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_tree_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='product_id']",
            position: 'replace'
          }
        },
        _xpath_229: {
          _attr: {
            expr: "//tree[@name='packaging']",
            position: 'attributes'
          },
          _attribute_editable: {
            _attr: {
              name: 'editable',
              text: 'bottom'
            }
          }
        }
      }
    }
  },

  product_packaging_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    type: 'form',
    arch: {
      sheet: {
        _label_name: {
          for: 'name',
          string: 'Packaging'
        },
        _h1: {
          name: {}
        },
        _group: {
          id: {
            invisible: '1'
          },
          company_id: {
            invisible: '1'
          },
          _group_group_product: {
            _attr: {
              name: 'group_product'
            },
            product_id: {
              readonly: [['id', '!=', false]],
              required: 'True'
            }
          },
          _group_qty: {
            _attr: {
              name: 'qty'
            },
            _label_qty: {
              for: 'qty',
              string: 'Contained quantity'
            },
            _div: {
              _attr: {
                class: 'o_row'
              },
              qty: {},
              product_uom_id: {
                groups: 'uom.group_uom',
                no_open: true,
                no_create: true
              }
            },
            barcode: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  product_packaging_form_view2: {
    _odoo_model: 'ir.ui.view',
    model: 'product.packaging',
    inherit_id: 'product.product_packaging_form_view',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='group_product']",
            position: 'replace'
          }
        },
        _xpath_120: {
          _attr: {
            expr: "//field[@name='id']",
            position: 'replace'
          }
        }
      }
    }
  },

  action_packaging_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Product Packagings',
    res_model: 'product.packaging',
    domain: "[['product_id', '!=', False]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
