export default {
  product_uom_categ_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'form',
    arch: {
      sheet: {
        _group_name: {
          name: {},
          reference_uom_id: { invisible: '1' }
        },

        _notebook: {
          _page_uom_lines: {
            _attr: { string: 'Units of Measure', name: 'uom_lines' },
            uom_ids: {
              widget: 'x2many_tree',
              context: ({ record }) => {
                return {
                  default_uom_type: 'smaller',
                  default_category_id: record.id
                }
              },
              views: {
                tree: {
                  fields: {
                    name: {},
                    uom_type: {},
                    factor: { invisible: '1' },
                    factor_inv: { invisible: '1' },
                    ratio: {},
                    active: {},
                    rounding: {}
                  }
                },

                form: {
                  arch: {
                    sheet: {
                      _group_name: {
                        name: {},
                        uom_type: {},
                        factor: { invisible: '1' },
                        factor_inv: { invisible: '1' },
                        ratio: {},
                        active: {},
                        rounding: {}
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
    name: 'Units of Measure Categories',
    type: 'ir.actions.act_window',
    res_model: 'uom.category',
    search_view_id: 'uom_categ_view_search',
    domain: [],
    context: { allow_to_change_reference: 1 },
    views: {
      tree: 'product_uom_categ_tree_view',
      form: 'product_uom_categ_form_view'
    }
  }
}
