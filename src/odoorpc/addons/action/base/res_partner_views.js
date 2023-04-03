export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    fields: {
      display_name: {},
      type: {},
      function: { invisible: '1' },
      phone: { optional: 'show' },
      email: { optional: 'show' },
      user_id: { optional: 'show' },
      city: { optional: 'show' },
      state_id: { optional: 'hide', readonly: '1' },
      country_id: { optional: 'show', readonly: '1' },
      vat: { optional: 'hide', readonly: '1' },
      category_id: { optional: 'show', widget: 'many2many_tags' },
      company_id: { groups: 'base.group_multi_company', readonly: '1' },
      is_company: { invisible: '1' },
      parent_id: { invisible: '1', readonly: '1' },
      active: { invisible: '1' }
    }
  },

  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',

    arch: {
      sheet: {
        _title: { display_name: {} },

        _group_button_box: {
          _span: 2
        },

        _group_name: {
          is_company: { invisible: 1 },
          commercial_partner_id: { invisible: 1 },
          active: { invisible: 1 },
          company_id: { invisible: 1 },
          country_code: { invisible: 1 },
          company_type: { widget: 'radio' },
          name: {
            required: ({ record }) => {
              // [('type', '=', 'contact')]
              return record.type === 'contact'
            }
          },

          parent_id: {
            widget: 'res_partner_many2one',
            invisible: ({ record }) => {
              // ['|',
              // '&amp;',
              // ('is_company','=', True),
              // ('parent_id', '=', False),
              // ('company_name', '!=', False),
              // ('company_name', '!=', '')]

              const { is_company, parent_id, company_name } = record
              return (is_company && !parent_id) || company_name
            }
          },

          company_name: {
            widget: 'button',
            button_click: {
              name: 'create_company',
              string: 'Create company',
              type: 'object'
              // 'invisible': ['|', '|', ('is_company','=', True),
              // ('company_name', '=', ''), ('company_name', '=', False)]
            },

            invisible: ({ record }) => {
              // ['|',
              // '|',
              // ('company_name', '=', False),
              // ('company_name', '=', ''),
              // ('is_company', '=', True)]
              const { is_company, company_name } = record
              return !company_name || is_company
            }
          },

          vat: {
            readonly({ record }) {
              // 'readonly': [('parent_id','!=',False)]
              const { parent_id } = record
              return parent_id
            }
          }
        },

        _group_logo: {
          active: {
            widget: 'web_ribbon',
            invisible: ({ record }) => {
              // 'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          },
          avatar_128: { invisible: 1 },
          image_1920: { widget: 'image' }
        },

        _group_address: {
          type: {
            widget: 'radio',
            required: ({ record }) => {
              // 'required': [('is_company','!=', True)],
              return !record.is_company
            },

            readonly({ record }) {
              // 'readonly': [('user_ids', '!=', [])]
              return record.user_ids.length
            },

            invisible: ({ record }) => {
              // [('is_company','=', True)],
              return record.is_company
            }
          },

          street: {
            label: '地址',
            string: '',
            placeholder: 'Street...',
            readonly({ record }) {
              // 'readonly':
              // [('type', '=', 'contact'),
              // ('parent_id', '!=', False)]
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          street2: {
            string: '',
            placeholder: 'Street 2...',
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },

          city: {
            string: '',
            placeholder: 'City',
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          state_id: {
            string: '',
            placeholder: 'State',
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },

          zip: {
            string: '',
            placeholder: 'ZIP',
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          },
          country_id: {
            string: '',
            placeholder: 'Country',
            readonly({ record }) {
              const { type, parent_id } = record
              return type === 'contact' && parent_id
            }
          }
        },

        _group_comunication: {
          function: {
            invisible: ({ record }) => {
              // [('is_company','=', True)]
              const { is_company } = record
              return is_company
            }
          },
          phone: { widget: 'phone' },
          mobile: { widget: 'phone' },
          user_ids: { invisible: 1 },

          email: {
            required({ record }) {
              return (record.user_ids || []).length > 0
            }
          },
          website: { widget: 'url' },
          title: {
            invisible: ({ record }) => {
              // [('is_company','=', True)]
              const { is_company } = record
              return is_company
            }
          },

          active_lang_count: { invisible: 1 },
          lang: {
            invisible: ({ record }) => {
              // 'invisible': [('active_lang_count', '&lt;=', 1)]
              const { active_lang_count } = record
              return active_lang_count <= 1
            }
          },

          category_id: { widget: 'many2many_tags' }
        },

        _group_childs: {
          _span: 2,
          child_ids: {
            label: '联系人/地址',
            string: '',
            widget: 'x2many_tree',
            views: {
              kanban: {
                fields: { name: {} },
                templates: {
                  /* title */
                }
              },

              tree: {
                fields: {
                  name: {},
                  type: {},
                  function: {},
                  email: {},
                  zip: { invisible: 1 },
                  city: {},
                  state_id: { invisible: 1 },
                  country_id: { invisible: 1 },
                  phone: { invisible: 1 },
                  mobile: { invisible: 1 }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_type: {
                      _span: 2,
                      type: { required: '1', widget: 'radio' },
                      parent_id: { invisible: 1 }
                    },

                    _group_type_hit: {
                      _invisible({ editable }) {
                        return !editable
                      },
                      _span: 2,
                      _html: 1,
                      _children: {
                        a: {
                          invisible({ record }) {
                            // 'invisible': [('type', '!=', 'contact')]
                            const { type } = record
                            return type !== 'contact'
                          },
                          string:
                            'Use this to organize the contact details of employees of a given company (e.g. CEO, CFO, ...).'
                        },
                        b: {
                          invisible({ record }) {
                            // 'invisible': [('type', '!=', 'invoice')]
                            const { type } = record
                            return type !== 'invoice'
                          },
                          string:
                            'Preferred address for all invoices. Selected by default when you invoice an order that belongs to this company.'
                        },

                        c: {
                          invisible({ record }) {
                            // 'invisible': [('type', '!=', 'delivery')]
                            const { type } = record
                            return type !== 'delivery'
                          },
                          string:
                            'Preferred address for all deliveries. Selected by default when you deliver an order that belongs to this company.'
                        },

                        d: {
                          invisible({ record }) {
                            // 'invisible': [('type', '!=', 'private')]
                            const { type } = record
                            return type !== 'private'
                          },
                          string:
                            'Private addresses are only visible by authorized users and contain sensitive data (employee home addresses, ...).'
                        },
                        e: {
                          invisible({ record }) {
                            // 'invisible': [('type', '!=', 'other')]
                            const { type } = record
                            return type !== 'other'
                          },
                          string:
                            'Other address for the company (e.g. subsidiary, ...)'
                        }
                      }
                    },

                    _group_name: {
                      name: {
                        string: 'Contact Name',
                        required({ record }) {
                          // required' : [('type', '=', 'contact')]
                          return record.type === 'contact'
                        }
                      },
                      title: {
                        invisible({ record }) {
                          // 'invisible': [('type','!=', 'contact')]
                          return record.type !== 'contact'
                        }
                      },
                      function: {
                        invisible({ record }) {
                          // 'invisible': [('type','!=', 'contact')]
                          return record.type !== 'contact'
                        }
                      },

                      street: {
                        label: 'Address',
                        string: '',
                        placeholder: 'Street...',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      street2: {
                        string: '',
                        placeholder: 'Street 2...',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },

                      city: {
                        string: '',
                        placeholder: 'City',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      state_id: {
                        string: '',
                        placeholder: 'State',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },

                      zip: {
                        string: '',
                        placeholder: 'ZIP',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      country_id: {
                        string: '',
                        placeholder: 'Country',
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      }
                    },

                    _group_comunication: {
                      email: { widget: 'email' },
                      phone: { widget: 'phone' },
                      mobile: { widget: 'phone' },
                      company_id: { invisible: 1 }
                    },

                    _group_comment: { comment: {} },

                    _group_lang: {
                      lang: { invisible: 1 },
                      user_id: { invisible: 1 }
                    }
                  }
                }
              }
            }
          }
        },

        _group_sales_purchases__sale: {
          user_id: { widget: 'many2one_avatar_user' }
        },

        _group_sales_purchases__purchase: {},

        _group_sales_purchases__misc: {
          company_registry: {
            invisible: ({ record }) => {
              // 'invisible': [('parent_id','!=',False)]
              const { parent_id } = record
              return parent_id
            }
          },
          ref: {},
          company_id: {
            groups: 'base.group_multi_company',
            readonly({ record }) {
              // 'readonly': [('parent_id', '!=', False)]
              const { parent_id } = record
              return parent_id
            }
          },
          industry_id: {
            invisible: ({ record }) => {
              // 'invisible': [('is_company', '=', False)]
              const { is_company } = record
              return !is_company
            }
          }
        },

        _group_internal_notes: {
          _span: 2,
          comment: {
            label: 'Internal Notes',
            string: '',
            placeholder: 'Internal notes...'
          }
        }
      }
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

        // group_sell_purchase: {
        //   customer: { string: '客户', domain: [['customer_rank', '>', 0]] },
        //   supplier: { string: '供应商', domain: [['supplier_rank', '>', 0]] }
        // },

        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  }
}
