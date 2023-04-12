export default {
  res_partner_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              ['display_name', 'ilike', self],
              ['ref', 'ilike', self],
              ['email', 'ilike', self]
            ]
          }
        },
        parent_id: {
          domain: [['is_company', '=', true]],
          operator: 'child_of'
        },

        email: {
          filter_domain: self => {
            return [['email', 'ilike', self]]
          }
        },
        phone: {
          filter_domain: self => {
            return ['|', ['phone', 'ilike', self], ['mobile', 'ilike', self]]
          }
        },
        category_id: {
          filter_domain: self => {
            return [['category_id', 'child_of', self]]
          }
        },
        user_id: {}
      },

      filters: {
        group_type: {
          type_person: { string: '个人', domain: [['is_company', '=', false]] },
          type_company: { string: '组织', domain: [['is_company', '=', true]] }
        },

        group_sell_purchase: {
          customer: { string: '客户', domain: [['customer_rank', '>', 0]] },
          supplier: { string: '供应商', domain: [['supplier_rank', '>', 0]] }
        },

        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    buttons: { create: false, edit: true, delete: false },
    arch: {
      sheet: {
        display_name: {},
        type: {},
        phone: {},
        email: {},
        user_id: {},
        team_id: {}
        // city: {},
        // // state_id:{},
        // country_id: {},
        // // vat:{},
        // // category_id:{},
        // company_id: {}
        // // is_company: {},
        // // parent_id: {},
        // // active: {}
      }
    }
  },

  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    inherit_id: 'base.view_partner_form',
    buttons: { create: false, edit: true, delete: false },

    arch: {
      sheet: {
        _div_parent: {
          parent_id: {
            // context
            //  {'default_is_company': True, 'show_vat': True, 'default_user_id': user_id, 'default_team_id': team_id}
            context({ record }) {
              const { user_id, team_id } = record
              return {
                default_is_company: true,
                show_vat: true,
                default_user_id: user_id,
                default_team_id: team_id
              }
            }
          }
        },
        _notebook: {
          _page_sales_purchases: {
            _group_sales_purchases: {
              _group_sale: {
                user_id: {},
                team_id: { groups: 'base.group_no_one' }
              }
            }
          }
        }
      }
    }
  },

  res_partner_action_customer: {
    _odoo_model: 'ir.actions',
    name: 'Customers',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_customer: 1,
      res_partner_search_mode: 'customer',
      default_is_company: true,
      default_customer_rank: 1
    },
    views: {
      tree: 'view_partner_tree',
      form: 'view_partner_property_form'
    }
  }
}
