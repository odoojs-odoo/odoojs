// ok
//todo res.partner  form view

export default {
  view_partner_title_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'tree',
    fields: {
      name: {},
      shortcut: {}
    }
  },
  view_partner_title_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.title',
    type: 'form',
    fields: {
      name: {},
      shortcut: {}
    }
  },

  action_partner_title_contact: {
    _odoo_model: 'ir.actions',
    name: '联系人头衔',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.title',
    domain: [],
    context: {}
  },
  //

  view_partner_tree: {
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
  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    fields: {
      // display_name: {},
      image_1920: { widget: 'image' },

      is_company: { invisible: 1 },

      company_type: { widget: 'radio' },
      name: {
        required: ({ record }) => {
          // console.log(record)
          return record.type === 'contact'
        }
      },

      parent_id: {
        invisible: ({ record }) => {
          const { is_company, parent_id, company_name } = record
          return (is_company && !parent_id) || company_name
        }
      },

      company_name: {
        invisible: ({ record }) => {
          const { is_company, company_name } = record
          return is_company || !company_name
        }
      },

      type: {
        widget: 'radio',
        required: ({ record }) => {
          return !record.is_company
        },

        invisible: ({ record }) => {
          return record.is_company
        }
      },

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
      },

      vat: {
        readonly({ record }) {
          const { parent_id } = record
          return !parent_id
        }
      },

      function: {
        invisible({ record }) {
          return record.is_company
        }
      },
      phone: {},
      mobile: {},
      user_ids: { invisible: 1 },
      email: {
        required({ record }) {
          return (record.user_ids || []).length > 0
        }
      },
      website: {},
      title: {
        invisible({ record }) {
          return record.is_company
        }
      },
      active_lang_count: { invisible: 1 },
      lang: {
        invisible({ record }) {
          return record.active_lang_count >= 1
        }
      },

      category_id: {
        widget: 'many2many_tags'
      },

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
      },

      user_id: {},
      ref: {},
      company_id: {},
      industry_id: {
        invisible({ record }) {
          return !record.is_company
        }
      },
      comment: {}
    }
  },

  view_res_partner_filter: {
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

  view_partner_category_list: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'tree',

    fields: {
      display_name: {},
      name: {},
      parent_id: {}
      // color: {}
    }
  },
  view_partner_category_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'form',
    fields: {
      // display_name: {},
      name: {},
      // color: {},
      parent_id: {},
      active: {}
    }
  },

  res_partner_category_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.category',
    type: 'search',
    arch: {
      fields: {
        name: {},
        display_name: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_partner_category_form: {
    _odoo_model: 'ir.actions',
    name: '联系人标签',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.category',
    search_view_id: 'res_partner_category_view_search',
    domain: [],
    context: {}
  },

  //

  res_partner_industry_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'tree',
    fields: {
      name: {},
      full_name: {},
      active: { invisible: 1 }
    }
  },
  res_partner_industry_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'form',
    fields: {
      name: {},
      full_name: {},
      active: {}
    }
  },

  res_partner_industry_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.industry',
    type: 'search',
    arch: {
      fields: {
        name: {},
        full_name: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  res_partner_industry_action: {
    _odoo_model: 'ir.actions',
    name: '行业',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.industry',
    search_view_id: 'res_partner_industry_view_search',
    domain: [],
    context: {}
  }
}
