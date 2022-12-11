export default {
  view_account_position_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'tree',
    fields: {
      sequence: {},
      name: {},
      company_id: {}
    }
  },

  view_account_position_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'form',
    fields: {
      sequence: {},
      name: {},
      company_id: {},
      auto_apply: {},
      vat_required: {},
      foreign_vat: {},
      country_id: {},
      state_ids: { widget: 'many2many_tags' },
      zip_from: {},
      zip_to: {},
      note: {},
      tax_ids: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              tax_src_id: {
                domain: ({ record }) => {
                  const { parent: parent2 } = record
                  return [
                    ['type_tax_use', '!=', 'none'],
                    ['country_id', '=', parent2.company_country_id],
                    '|',
                    ['company_id', '=', false],
                    ['company_id', '=', parent2.company_id]
                  ]
                },
                context: { append_type_to_tax_name: true }
              },
              tax_dest_id: {
                domain: ({ record }) => {
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
                },
                context: { append_type_to_tax_name: true }
              }
            }
          },
          form: {
            fields: {
              tax_src_id: {
                domain: [['type_tax_use', '!=', 'none']],
                context: { append_type_to_tax_name: true }
              },
              tax_dest_id: {
                domain: [['type_tax_use', '!=', 'none']],
                context: { append_type_to_tax_name: true }
              }
            }
          }
        }
      },

      account_ids: {
        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              account_src_id: {
                domain: ({ record }) => {
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
            fields: {
              account_src_id: {
                domain: ({ record }) => {
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
  },

  view_account_position_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: { string: '已归档', domain: [['active', '=', false]] }
        }
      }
    }
  },

  action_account_fiscal_position_form: {
    _odoo_model: 'ir.actions',
    name: '财务状况',
    type: 'ir.actions.act_window',
    res_model: 'account.fiscal.position',
    search_view_id: 'view_account_position_filter',
    domain: [],
    context: {}
  },

  res_partner_action_customer: {
    _odoo_model: 'ir.actions',
    name: '客户',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    domain: [],
    context: {
      search_default_customer: 1,
      res_partner_search_mode: 'customer',
      default_is_company: true,
      default_customer_rank: 1
    }
  },

  res_partner_action_supplier: {
    _odoo_model: 'ir.actions',
    name: '供应商',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    domain: [],
    context: {
      search_default_supplier: 1,
      res_partner_search_mode: 'supplier',
      default_is_company: true,
      default_supplier_rank: 1
    }
  }
}
