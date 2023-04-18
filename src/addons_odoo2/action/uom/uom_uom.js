export default {
  product_uom_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        category_id: {},
        uom_type: {}
      }
    }
  },

  product_uom_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_uom_details: {
            _attr: {
              name: 'uom_details'
            },
            name: {},
            category_id: {},
            uom_type: {},
            _label_factor: {
              for: 'factor',
              invisible: [['uom_type', '!=', 'smaller']]
            },
            _div: {
              _attr: {
                invisible: [['uom_type', '!=', 'smaller']]
              },
              factor: {
                readonly: [['uom_type', '=', 'bigger']],
                digits: '[42,5]'
              },
              _span: {
                _attr: {
                  class: 'oe_grey oe_inline',
                  text: 'e.g: 1*(reference unit)=ratio*(this unit)'
                }
              }
            },
            _label_factor_inv: {
              for: 'factor_inv',
              invisible: [['uom_type', '!=', 'bigger']]
            },
            _div_190: {
              _attr: {
                invisible: [['uom_type', '!=', 'bigger']]
              },
              factor_inv: {
                readonly: [['uom_type', '!=', 'bigger']],
                digits: '[42,5]'
              },
              _span: {
                _attr: {
                  class: 'oe_grey oe_inline',
                  text: 'e.g: 1*(this unit)=ratio*(reference unit)'
                }
              }
            }
          },
          _group_active_rounding: {
            _attr: {
              name: 'active_rounding'
            },
            active: {
              widget: 'boolean_toggle'
            },
            rounding: {
              digits: '[42, 5]'
            }
          }
        }
      }
    }
  },

  uom_uom_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'search',
    arch: {
      name: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_group_by_category: {
          _attr: {
            name: 'group_by_category',
            string: 'Category',
            context: {
              group_by: 'category_id'
            }
          }
        }
      }
    }
  },

  product_uom_form_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Units of Measure',
    type: 'ir.actions.act_window',
    search_view_id: 'uom_uom_view_search',
    res_model: 'uom.uom',
    views: {
      tree: 'product_uom_tree_view',
      form: '=======todo=========='
    }
  }
}
