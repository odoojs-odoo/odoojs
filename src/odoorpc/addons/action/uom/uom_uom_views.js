// ok
export default {
  product_uom_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          name: {},
          category_id: {},
          uom_type: { readonly2: 1 },
          factor: {
            readonly: ({ record }) => {
              // 'readonly':[('uom_type','=','bigger')]
              const { uom_type } = record
              return uom_type === 'bigger'
            },
            invisible: ({ record }) => {
              // 'invisible':[('uom_type','!=','smaller')]
              const { uom_type } = record
              return uom_type !== 'smaller'
            }
          },
          factor_inv: {
            // 'readonly':[('uom_type','!=','bigger')]
            readonly: ({ record }) => {
              const { uom_type } = record
              return uom_type !== 'bigger'
            },
            invisible: ({ record }) => {
              // 'invisible':[('uom_type','!=','bigger')]
              const { uom_type } = record
              return uom_type !== 'bigger'
            }
          }
        },

        _group_active: {
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
    fields: {
      name: {},
      category_id: {},
      uom_type: {}
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
