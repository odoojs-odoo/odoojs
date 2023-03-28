// ok
export default {
  product_uom_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.uom',
    type: 'form',
    fields: {
      name: {},
      category_id: {},
      uom_type: { readonly2: 1 },
      factor: {
        readonly: ({ record }) => {
          const { uom_type } = record
          return uom_type === 'bigger'
        }
      },
      factor_inv: {
        readonly: ({ record }) => {
          const { uom_type } = record
          return uom_type !== 'bigger'
        }
      },
      active: {},
      rounding: {}
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

      filters: {}
    }
  },

  product_uom_form_action: {
    _odoo_model: 'ir.actions',
    name: '度量单位',
    type: 'ir.actions.act_window',
    res_model: 'uom.uom',
    search_view_id: 'uom_uom_view_search',
    domain: [],
    context: {}
  },

  product_uom_categ_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'form',
    fields: {
      name: {},
      uom_ids: {
        widget: 'x2many_tree',
        context: ({ record }) => {
          return { default_uom_type: 'smaller', default_category_id: record.id }
        },
        views: {
          tree: {
            fields: {
              name: {},
              uom_type: {},
              factor: {},
              factor_inv: {},
              ratio: {},
              active: {},
              rounding: {}
            }
          },

          form: {
            fields: {
              name: {},
              uom_type: {},
              factor: {},
              factor_inv: {},
              ratio: {},
              active: {},
              rounding: {}
            }
          }
        }
      }
    }
  },

  product_uom_categ_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'tree',
    fields: {
      name: {},
      uom_ids: { widget: 'many2many_tags' }
    }
  },

  uom_categ_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'search',
    arch: {
      fields: {
        name: {},
        uom_ids: {}
      },

      filters: {}
    }
  },

  product_uom_categ_form_action: {
    _odoo_model: 'ir.actions',
    name: '度量单位类别',
    type: 'ir.actions.act_window',
    res_model: 'uom.category',
    domain: [],
    context: { allow_to_change_reference: 1 }
  }
}
