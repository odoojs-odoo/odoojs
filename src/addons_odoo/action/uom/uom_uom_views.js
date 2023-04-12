// ok
export default {
  product_uom_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _group_uom_details: {
            name: {},
            category_id: {},
            uom_type: { readonly: 1 },

            _div_factor: {
              _attr: {
                invisible: ({ record }) => {
                  // 'invisible':[('uom_type','!=','smaller')]
                  const { uom_type } = record
                  return uom_type !== 'smaller'
                }
              },
              factor: {},

              _span: {
                _attr: {
                  text: 'e.g: 1*(reference unit)=ratio*(this unit)'
                }
              }
            },

            _div_factor_inv: {
              _attr: {
                invisible: ({ record }) => {
                  // 'invisible':[('uom_type','!=','bigger')]
                  const { uom_type } = record
                  return uom_type !== 'bigger'
                }
              },
              factor_inv: {},
              _span: {
                _attr: {
                  text: 'e.g: 1*(this unit)=ratio*(reference unit)'
                }
              }
            }
          }
        },

        _group_active_rounding: {
          active: { widget: 'boolean_toggle' },
          rounding: {}
        }
      }
    }
  },

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

  uom_uom_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  product_uom_form_action: {
    _odoo_model: 'ir.actions',
    name: 'Units of Measure',
    type: 'ir.actions.act_window',
    res_model: 'uom.uom',
    search_view_id: 'uom_uom_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'product_uom_tree_view',
      form: 'product_uom_form_view'
    }
  }
}
