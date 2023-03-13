export default {
  view_partner_person_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    fields: {
      display_name: {},
      type: {},
      email: {},
      company_id: {},
      parent_id: {}
    }
  },

  view_partner_person_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          name: { required: 1 },
          //   company_type: { widget: 'radio' },
          parent_id: {},
          company_name: {},

          vat: {
            readonly({ record }) {
              const { parent_id } = record
              return !parent_id
            }
          }
        },

        _group_logo: {
          image_1920: { widget: 'image' }
        },

        _group_address: {
          street: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          street2: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          city: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          state_id: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          zip: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          country_id: {
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          }
        },

        _group_comunication: {
          function: {},
          phone: {},
          mobile: {},
          email: {
            required({ record }) {
              console.log(record)
              return (record.user_ids || []).length > 0
            }
          },
          website: {},
          title: {},
          category_id: {
            widget: 'many2many_tags'
          }
        },

        _group_childs: {
          _span: 2,
          child_ids: {
            widget: 'x2many_tree',
            views: {
              kanban: {
                fields: {
                  name: {}
                },
                templates: {
                  // title
                }
              }
            }
          }
        },
        _group_sale: {
          user_id: {},
          ref: {},
          company_id: {}
        },

        _group_comment: {
          _span: 2,
          comment: {}
        }
      }
    },

    fields: {
      is_company: { invisible: 1 },
      type: { invisible: 1 },
      user_ids: { invisible: 1 },
      active_lang_count: { invisible: 1 },
      lang: {
        invisible({ record }) {
          return record.active_lang_count >= 1
        }
      },
      industry_id: { invisible: 1 }
    }
  },

  view_res_partner_person_filter: {
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

  action_partner_of_contact_person: {
    _odoo_model: 'ir.actions',
    name: '联系人(个人)',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'view_res_partner_person_filter',
    domain: [
      ['type', '=', 'contact'],
      ['is_company', '=', false]
    ],
    context: { default_is_company: false },

    views: {
      tree: 'view_partner_person_tree',
      form: 'view_partner_person_form'
    }
  }
}
