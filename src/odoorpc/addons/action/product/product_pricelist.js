export default {
  product_pricelist_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'tree',
    fields: {
      sequence: { widget: 'handle' },
      name: {},
      discount_policy: { groups: 'product.group_discount_per_so_line' },
      currency_id: { groups: 'base.group_multi_currency' },
      company_id: { groups: 'base.group_multi_company' }
    }
  },

  product_pricelist_view: {
    _odoo_model: 'ir.ui.view',
    model: 'product.pricelist',
    type: 'form',
    arch: {
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              //  attrs="{'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _div_title: {
          name: { placeholder: 'e.g. USD Retailers' }
        },

        _group_pricelist_settings: {
          currency_id: { groups: 'base.group_multi_currency' },
          active: { invisible: 1 },
          company_id: { groups: 'base.group_multi_company' }
        },

        _notebook: {
          _page_pricelist_rules: {
            _attr: { name: 'pricelist_rules', string: 'Price Rules' },
            item_ids: {
              nolabel: '1',
              widget: 'x2many_tree',
              context: { default_base: 'list_price' },
              views: {
                tree: {
                  fields: {
                    display_name: {}
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      display_name: {}
                    }
                  }
                }
              }
            }
          },

          _page_pricelist_config: {
            _attr: { name: 'pricelist_config', string: 'Configuration' },
            _group: {
              _group_pricelist_availability: {
                _attr: {
                  name: 'pricelist_availability',
                  string: 'Availability'
                },
                country_group_ids: { widget: 'many2many_tags' }
              },

              _group_pricelist_discounts: {
                _attr: {
                  name: 'pricelist_discounts',
                  string: 'Discounts',
                  groups: 'product.group_discount_per_so_line'
                },
                discount_policy: { widget: 'radio' }
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
        currency_id: { groups: 'base.group_multi_currency' }
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
