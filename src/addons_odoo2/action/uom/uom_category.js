export default {
  product_uom_categ_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          reference_uom_id: { invisible: '1' }
        },
        _notebook: {
          _page_uom_lines: {
            _attr: {
              name: 'uom_lines',
              string: 'Units of Measure'
            },
            uom_ids: {
              context: {
                default_uom_type: 'smaller',
                default_category_id: 'todo===id'
              },
              force_save: '1',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      name: {},
                      uom_type: {},
                      factor: { invisible: '1' },
                      factor_inv: { invisible: '1' },
                      ratio: {
                        string: 'Ratio',
                        readonly: [['uom_type', '=', 'reference']],
                        digits: '[42,5]'
                      },
                      active: {},
                      rounding: { digits: '[42, 5]' }
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
    arch: {
      sheet: {
        name: {},
        uom_ids: {
          widget: 'many2many_tags',
          color_field: 'color'
        }
      }
    }
  },

  uom_categ_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'uom.category',
    type: 'search',
    arch: {
      name: {},
      uom_ids: {}
    }
  },

  product_uom_categ_form_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Units of Measure Categories',
    type: 'ir.actions.act_window',
    res_model: 'uom.category',
    search_view_id: 'tooooooodoooooo',
    context: { allow_to_change_reference: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
