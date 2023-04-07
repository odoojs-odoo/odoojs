export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'tree',
    fields: {
      display_name: { string: 'Name' },
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
      company_id: { readonly: '1' },
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
        _div_same_vat_partner_id: {
          _attr: {
            invisible({ record, editable }) {
              // oe_edit_only
              // 'invisible': [('same_vat_partner_id', '=', False)]
              const { same_vat_partner_id } = record
              return !editable || !same_vat_partner_id
            },
            text({ record }) {
              const { same_vat_partner_id } = record
              return `A partner with the same Tax ID already exists (${same_vat_partner_id}), are you sure to create a new one?`
            }
          }
        },

        _div_same_company_registry_partner_id: {
          _attr: {
            invisible({ record, editable }) {
              // oe_edit_only
              //'invisible': [('same_company_registry_partner_id', '=', False)]
              const { same_company_registry_partner_id } = record
              return !editable || !same_company_registry_partner_id
            },
            text({ record }) {
              const { same_company_registry_partner_id } = record
              return `A partner with the same Company Registry already exists (${same_company_registry_partner_id}), are you sure to create a new one?`
            }
          }
        },

        _div_button_box: {},
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: ({ record }) => {
              // 'invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },
        avatar_128: { invisible: 1 },
        image_1920: { widget: 'image', preview_image: 'avatar_128' },

        _div_title: {
          user_ids: { invisible: 1 },

          is_company: { invisible: 1 },
          commercial_partner_id: { invisible: 1 },
          active: { invisible: 1 },
          company_id: { invisible: 1 },
          country_code: { invisible: 1 },
          company_type: { nolabel: 0, widget: 'radio' },
          _h1: {
            _field_name_company: {
              _attr: {
                invisible({ record }) {
                  // 'invisible': [('is_company','=', False)]
                  const { is_company } = record
                  return !is_company
                }
              },
              name: { placeholder: 'e.g. Lumber Inc' }
            },

            _field_name_individual: {
              _attr: {
                invisible({ record }) {
                  // 'invisible': [('is_company','=', True)]
                  const { is_company } = record
                  return is_company
                }
              },
              name: { placeholder: 'e.g. Brandom Freeman' }
            }
          }
        },

        _div_parent: {
          parent_id: {
            widget: 'res_partner_many2one',
            placeholder: 'Company Name...',
            // context="{'default_is_company': True, 'show_vat': True, 'default_user_id': user_id}"
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

          _button: {
            _attr: {
              name: 'create_company',
              string: 'Create company',
              icon: 'fa-plus-square',
              type: 'object',
              invisible: ({ record }) => {
                // 'invisible': ['|', '|',
                // ('is_company','=', True),
                // ('company_name', '=', ''),
                // ('company_name', '=', False)]
                const { is_company, company_name } = record
                return !company_name || is_company
              }
            }
          }
        },

        _group: {
          _group_address: {
            type: {
              widget: 'radio',
              invisible: ({ record }) => {
                // [('is_company','=', True)],
                return record.is_company
              }
            },

            // _label_address: {
            //   _attr: {
            //     string({ record }) {
            //       const { type, is_company } = record
            //       return !is_company && type ? type : 'Address'
            //     }
            //   }
            // },

            street: {},
            street2: {},
            city: {},
            state_id: {},
            zip: {},
            country_id: {},
            vat: {}
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
            email: {},
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
            category_id: {
              widget: 'many2many_tags',
              placeholder: 'e.g. "B2B", "VIP", "Consulting", ...'
            }
          }
        },

        _notebook: {
          _page_contact_addresses: {
            _attr: { string: 'Contacts & Addresses' },
            child_ids: {
              nolabel: 1,
              widget: 'x2many_tree',
              context({ record, active_id }) {
                // context="{
                // 'default_parent_id': active_id,
                // 'default_street': street, 'default_street2': street2,
                // 'default_city': city, 'default_state_id': state_id,
                // 'default_zip': zip, 'default_country_id': country_id,
                // 'default_lang': lang, 'default_user_id': user_id,
                // 'default_type': 'other'}">
                //
                const { street, street2, city, state_id, zip } = record
                const { country_id, lang, user_id } = record
                return {
                  default_parent_id: active_id,
                  default_street: street,
                  default_street2: street2,
                  default_city: city,
                  default_state_id: state_id,
                  default_zip: zip,
                  default_country_id: country_id,
                  default_lang: lang,
                  default_user_id: user_id,
                  default_type: 'other'
                }
              },
              views: {
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
                      type: { required: '1', widget: 'radio' },
                      parent_id: { invisible: 1 },
                      _div_help: {
                        _attr: {
                          invisible: ({ editable }) => {
                            // oe_edit_only
                            return !editable
                          }
                        },
                        _p_contact: {
                          _attr: {
                            invisible({ record }) {
                              // 'invisible': [('type', '!=', 'contact')]
                              const { type } = record
                              return type !== 'contact'
                            }
                          },
                          _span: {
                            _attr: {
                              text: 'Use this to organize the contact details of employees of a given company (e.g. CEO, CFO, ...).'
                            }
                          }
                        },
                        _p_invoice: {
                          _attr: {
                            invisible({ record }) {
                              // 'invisible': [('type', '!=', 'invoice')]
                              const { type } = record
                              return type !== 'invoice'
                            }
                          },
                          _span: {
                            _attr: {
                              text: 'Preferred address for all invoices. Selected by default when you invoice an order that belongs to this company.'
                            }
                          }
                        },
                        _p_delivery: {
                          _attr: {
                            invisible({ record }) {
                              // 'invisible': [('type', '!=', 'delivery')]
                              const { type } = record
                              return type !== 'delivery'
                            }
                          },
                          _span: {
                            _attr: {
                              text: 'Preferred address for all deliveries. Selected by default when you deliver an order that belongs to this company.'
                            }
                          }
                        },
                        _p_private: {
                          _attr: {
                            invisible({ record }) {
                              // 'invisible': [('type', '!=', 'private')]
                              const { type } = record
                              return type !== 'private'
                            }
                          },
                          _span: {
                            _attr: {
                              text: 'Private addresses are only visible by authorized users and contain sensitive data (employee home addresses, ...).'
                            }
                          }
                        },
                        _p_other: {
                          _attr: {
                            invisible({ record }) {
                              // 'invisible': [('type', '!=', 'other')]
                              const { type } = record
                              return type !== 'other'
                            }
                          },
                          _span: {
                            _attr: {
                              text: 'Other address for the company (e.g. subsidiary, ...)'
                            }
                          }
                        }
                      },
                      _hr: {},
                      _group: {
                        _group_name: {
                          name: { string: 'Contact Name' },
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

                          _b_addres: {
                            _attr: {
                              text: 'Address',
                              invisible({ record }) {
                                // 'invisible': [('type','=', 'contact'
                                const { type } = record
                                return type === 'contact'
                              }
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
                              // 'invisible': [('type','=', 'contact'
                              const { type } = record
                              return type === 'contact'
                            }
                          },
                          city: {
                            invisible({ record }) {
                              // 'invisible': [('type','=', 'contact'
                              const { type } = record
                              return type === 'contact'
                            }
                          },
                          state_id: {
                            invisible({ record }) {
                              // 'invisible': [('type','=', 'contact'
                              const { type } = record
                              return type === 'contact'
                            }
                          },
                          zip: {
                            invisible({ record }) {
                              // 'invisible': [('type','=', 'contact'
                              const { type } = record
                              return type === 'contact'
                            }
                          },
                          country_id: {
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
                        }
                      },
                      _group_comment: {
                        comment: {}
                      },
                      lang: { invisible: 1 },
                      user_id: { invisible: 1 }
                    }
                  }
                }
              }
            }
          },
          _page_sales_purchases: {
            _attr: { name: 'sales_purchases', string: 'Sales & Purchase' },
            _group_sales_purchases: {
              _group_sale: {
                _attr: { name: 'sale', string: 'Sales' },
                user_id: { widget: 'many2one_avatar_user' }
              },
              _group_purchase: {
                _attr: { name: 'purchase', string: 'Purchase' }
              },
              _group_misc: {
                _attr: { name: 'misc', string: 'Misc' },
                company_registry: {
                  invisible: ({ record }) => {
                    // 'invisible': [('parent_id','!=',False)]
                    const { parent_id } = record
                    return parent_id
                  }
                },
                ref: { string: 'Reference' },
                company_id: {},
                industry_id: {
                  invisible: ({ record }) => {
                    // 'invisible': [('is_company', '=', False)]
                    const { is_company } = record
                    return !is_company
                  }
                }
              }
            }
          },
          _page_internal_notes: {
            _attr: { string: 'Internal Notes' },
            comment: {
              placeholder: 'Internal notes...'
            }
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
