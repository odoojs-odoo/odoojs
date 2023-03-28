export default {
  view_account_position_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'tree',
    fields: {
      // sequence: { widget:"handle"},
      name: {},
      company_id: {}
    }
  },

  view_account_position_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'form',
    arch: {
      sheet: {
        _title: {
          display_name: {},
          active: { invisible: '1' },
          company_id: { invisible: '1' },
          states_count: { invisible: '1' },
          company_country_id: { invisible: '1' },
          foreign_vat_header_mode: { invisible: '1' }
        },
        _group_name: {
          sequence: { invisible: '1' },
          name: {},
          company_id: { invisible: '1' },
          active: { widget: 'web_ribbon' }
        },
        _group_name2: {
          auto_apply: {
            invisible: ({ record }) => {
              // 'invisible': [('auto_apply', '!=', True)]
              const { auto_apply } = record
              return !auto_apply
            }
          },
          vat_required: {},
          foreign_vat: {},
          country_group_id: {
            invisible: ({ record }) => {
              // 'invisible': [('auto_apply', '!=', True)]
              const { auto_apply } = record
              return !auto_apply
            }
          },
          country_id: {
            required: ({ record }) => {
              // 'required': [('foreign_vat', '!=', False)]
              const { foreign_vat } = record
              return foreign_vat
            }
          },
          state_ids: {
            widget: 'many2many_tags',
            invisible: ({ record }) => {
              // 'invisible': ['|', '|', '&amp;',
              // ('auto_apply', '!=', True), ('foreign_vat', '=', False),
              // ('country_id', '=', False), ('states_count', '=', 0)]
              const { auto_apply, foreign_vat, country_id, states_count } =
                record
              return (
                (!auto_apply && !foreign_vat) || !country_id || !states_count
              )
            },
            domain: ({ record }) => {
              // domain="[('country_id', '=', country_id)]
              const { country_id } = record
              return [['country_id', '=', country_id]]
            }
          },

          zip_from: {
            invisible: ({ record }) => {
              // 'invisible': ['|', ('auto_apply', '!=', True),
              // ('country_id', '=', False)]
              const { auto_apply, country_id } = record
              return !auto_apply || !country_id
            }
          },
          zip_to: {
            invisible: ({ record }) => {
              // 'invisible': ['|', ('auto_apply', '!=', True),
              // ('country_id', '=', False)]
              const { auto_apply, country_id } = record
              return !auto_apply || !country_id
            }
          }
        },
        _group_tax_mapping: {
          _span: 2,
          tax_ids: {
            widget: 'x2many_tree',
            context: { append_type_to_tax_name: true },
            views: {
              tree: {
                fields: {
                  tax_src_id: {
                    context: { append_type_to_tax_name: true },
                    domain: ({ record }) => {
                      // domain="[
                      //  ('type_tax_use', '!=', 'none'),
                      //  ('country_id', '=', parent.company_country_id),
                      //  '|',
                      //  ('company_id', '=', False),
                      //  ('company_id', '=', parent.company_id)
                      // ]"
                      const { parent: parent2 } = record
                      return [
                        ['type_tax_use', '!=', 'none'],
                        ['country_id', '=', parent2.company_country_id],
                        '|',
                        ['company_id', '=', false],
                        ['company_id', '=', parent2.company_id]
                      ]
                    }
                  },
                  tax_dest_id: {
                    context: { append_type_to_tax_name: true },
                    domain: ({ record }) => {
                      // domain="[
                      // ('type_tax_use', '!=', 'none'),
                      // ('country_id', '=',
                      //    parent.country_id if parent.foreign_vat
                      //    else parent.company_country_id),
                      // '|',
                      // ('company_id', '=', False),
                      // ('company_id', '=', parent.company_id)]"

                      const { parent: parent2 } = record
                      return [
                        ['type_tax_use', '!=', 'none'],
                        [
                          'country_id',
                          '=',
                          parent2.foreign_vat
                            ? parent2.country_id
                            : parent2.company_country_id
                        ],
                        '|',
                        ['company_id', '=', false],
                        ['company_id', '=', parent2.company_id]
                      ]
                    }
                  }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      tax_src_id: {
                        // domain="[('type_tax_use', '!=', 'none')]"
                        // context="{'append_type_to_tax_name': True}"
                        domain: [['type_tax_use', '!=', 'none']],
                        context: { append_type_to_tax_name: true }
                      },
                      tax_dest_id: {
                        // domain="[('type_tax_use', '!=', 'none')]"
                        // context="{'append_type_to_tax_name': True}"
                        domain: [['type_tax_use', '!=', 'none']],
                        context: { append_type_to_tax_name: true }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        _group_account_mapping: {
          _span: 2,
          account_ids: {
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: {
                  account_src_id: {
                    domain: ({ record }) => {
                      // domain="['|', ('company_id', '=', False),
                      // ('company_id', '=', parent.company_id)]
                      const { parent: parent2 } = record
                      return [
                        '|',
                        ['company_id', '=', false],
                        ['company_id', '=', parent2.company_id]
                      ]
                    }
                  },
                  account_dest_id: {
                    domain: ({ record }) => {
                      // domain="['|', ('company_id', '=', False),
                      // ('company_id', '=', parent.company_id)]"
                      const { parent: parent2 } = record
                      return [
                        '|',
                        ['company_id', '=', false],
                        ['company_id', '=', parent2.company_id]
                      ]
                    }
                  }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      account_src_id: {
                        domain: ({ record }) => {
                          // domain="['|', ('company_id', '=', False),
                          // ('company_id', '=', parent.company_id)]"
                          const { parent: parent2 } = record
                          return [
                            '|',
                            ['company_id', '=', false],
                            ['company_id', '=', parent2.company_id]
                          ]
                        }
                      },

                      account_dest_id: {
                        domain: ({ record }) => {
                          // domain="['|', ('company_id', '=', False),
                          // ('company_id', '=', parent.company_id)]"
                          const { parent: parent2 } = record
                          return [
                            '|',
                            ['company_id', '=', false],
                            ['company_id', '=', parent2.company_id]
                          ]
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

    fields: {}
  },

  view_account_position_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'search',
    arch: {
      fields: { name: {} },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_account_fiscal_position_form: {
    _odoo_model: 'ir.actions',
    name: 'Fiscal Positions',
    type: 'ir.actions.act_window',
    res_model: 'account.fiscal.position',
    search_view_id: 'view_account_position_filter',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_position_tree',
      form: 'view_account_position_form'
    }
  },

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

  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_button_box: {
          _span: 2,
          total_invoiced: { string: 'Invoiced' }
        },

        _group_accounting: {
          _span: 2,
          _invisible: ({ record }) => {
            // 'invisible': [('is_company','=',False),
            // ('parent_id','!=',False)]
            const { is_company, parent_id } = record
            return !is_company && !parent_id
          },
          duplicated_bank_account_partners_count: { invisible: '1' },
          show_credit_limit: { invisible: '1' },
          bank_ids: {
            _sapn: 2,
            widget: 'x2many_tree',
            context: { default_allow_out_payment: true },
            views: {
              tree: {
                fields: {
                  sequence: { invisible: '1', widget: 'handle' },
                  bank_id: {},
                  acc_number: {},
                  allow_out_payment: { widget: 'boolean_toggle' },
                  acc_holder_name: { invisible: '1' }
                }
              },

              form: {
                sequence: { invisible: '1', widget: 'handle' },
                bank_id: {},
                acc_number: {},
                allow_out_payment: { widget: 'boolean_toggle' },
                acc_holder_name: { invisible: '1' }
              }
            }

            // <button type="action" class="btn-link"
            //     name="%(base.action_res_partner_bank_account_form)d"
            //     context="{'search_default_partner_id': active_id, 'default_partner_id': active_id}"
            //     string="View accounts detail"
            //     colspan="2"
            // />
          }
        },

        _group_accounting_entries: {
          currency_id: { invisible: '1' },
          property_account_receivable_id: {},
          property_account_payable_id: {}
        },

        _group_credit_limits: {
          _invisible: ({ record }) => {
            // 'invisible': [('show_credit_limit', '=', False)]
            const { show_credit_limit } = record
            return !show_credit_limit
          },

          credit: {},
          use_partner_credit_limit: {},
          credit_limit: {
            invisible: ({ record }) => {
              // 'invisible': [('use_partner_credit_limit', '=', False)]
              const { use_partner_credit_limit } = record
              return !use_partner_credit_limit
            }
          }
        },

        _group_fiscal_information: {
          property_account_position_id: {},
          property_payment_term_id: {},
          property_supplier_payment_term_id: {}
        },

        _group_internal_notes: {
          invoice_warn: { required: '1' },
          invoice_warn_msg: {
            required: ({ record }) => {
              // 'required':
              // [('invoice_warn','!=', False),
              // ('invoice_warn','!=','no-message')],

              const { invoice_warn } = record
              return invoice_warn && invoice_warn !== 'no-message'
            },

            invisible: ({ record }) => {
              // 'invisible':[('invoice_warn','in',(False,'no-message'))]

              const { invoice_warn } = record
              return !invoice_warn || invoice_warn === 'no-message'
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
  },

  res_partner_action_supplier: {
    _odoo_model: 'ir.actions',
    name: 'Vendors',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_supplier: 1,
      res_partner_search_mode: 'supplier',
      default_is_company: true,
      default_supplier_rank: 1
    },
    views: {
      tree: 'view_partner_tree',
      form: 'view_partner_property_form'
    }
  }
}