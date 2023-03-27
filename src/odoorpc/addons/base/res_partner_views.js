export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    fields: {
      display_name: {},
      type: {},
      phone: {},
      email: {},
      user_id: {},
      city: {},
      // state_id:{},
      country_id: {},
      // vat:{},
      // category_id:{},
      company_id: {}
      // is_company: {},
      // parent_id: {},
      // active: {}
    }
  },

  view_partner_form: {
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
          is_company: { invisible: 1 },
          commercial_partner_id: { invisible: 1 },
          active: { invisible: 1 },
          company_id: { invisible: 1 },
          country_code: { invisible: 1 },

          display_name: {}
        },

        _group_name: {
          company_type: { widget: 'radio' },

          name: {
            required: ({ record }) => {
              // [('type', '=', 'contact')]
              return record.type === 'contact'
            }
          },

          parent_id: {
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
            method: 'create_company',
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
            readonly({ record }) {
              // 'readonly':
              // [('type', '=', 'contact'),
              // ('parent_id', '!=', False)]
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
              console.log(record)
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
            widget: 'x2many_tree',
            views: {
              // kanban: {
              //   fields: {
              //     name: {}
              //   },
              //   templates: {
              //     // title
              //   }
              // },

              tree: {
                fields: {
                  name: {},
                  type: {},
                  function: {},
                  email: {},
                  // zip: {},
                  city: {}
                  // state_id: {},
                  // country_id: {},
                  // phone: {},
                  // mobile: {}
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_type: {
                      _span: 2,
                      type: {},
                      parent_id: { invisible: 1 }
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
                        invisible({ record }) {
                          // 'invisible': [('type','=', 'contact'
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      street2: {
                        invisible({ record }) {
                          const { type } = record
                          return type === 'contact'
                        }
                      },

                      city: {
                        invisible({ record }) {
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      state_id: {
                        invisible({ record }) {
                          const { type } = record
                          return type === 'contact'
                        }
                      },

                      zip: {
                        invisible({ record }) {
                          const { type } = record
                          return type === 'contact'
                        }
                      },
                      country_id: {
                        invisible({ record }) {
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
                    }
                  }
                },

                fields: { name: {} }
              }
            }
          }
        },

        _group_sale: {
          user_id: {},
          company_registry: {
            invisible: ({ record }) => {
              // 'invisible': [('parent_id','!=',False)]
              const { parent_id } = record
              return parent_id
            }
          },
          ref: {},
          company_id: {
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

        _group_comment: {
          _span: 2,
          comment: { string: 'Internal Notes' }
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
