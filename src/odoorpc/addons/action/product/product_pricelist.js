export default {
  product_pricelist_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'tree',
    fields: {
      display_name: {},
      name: {},
      discount_policy: {},
      currency_id: {},
      company_id: {}
    }
  },

  product_pricelist_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'form',
    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_name: {
          name: {},
          currency_id: {},
          company_id: {}
        },

        _group_config: {
          discount_policy: { widget: 'radio' },
          country_group_ids: {
            widget: 'many2many_tags'
          }
        },

        _group_pricelist_rules: {
          _span: 2,
          item_ids: {
            widget: 'x2many_tree',
            context: { default_base: 'list_price' },
            views: {
              kanban: {
                fields: { display_name: {} },
                templates: {
                  // title
                }
              },

              tree: {
                fields: { display_name: {} }
              },
              form: {
                fields: { display_name: {} }
              }
            }
          }
        }
      }
    }
  },

  product_pricelist_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'search',
    arch: {
      fields: {
        name: {},
        currency_id: {}
      },

      filters: {
        group_active: {
          active: {
            string: '启用',
            domain: () => {
              return [['active', '=', true]]
            }
          },

          archived: {
            string: '已归档',
            domain: () => {
              return [['active', '=', false]]
            }
          }
        }
      }
    }
  },

  product_pricelist_action2: {
    _odoo_model: 'ir.actions',
    name: 'Pricelists',
    type: 'ir.actions.act_window',
    res_model: 'product.pricelist',
    search_view_id: 'product_pricelist_view_search',
    domain: [],
    context: {},

    views: {
      tree: 'product_pricelist_view_tree',
      form: 'product_pricelist_view'
    }
  }
}
