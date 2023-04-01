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

  view_account_position_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'tree',
    fields: {
      name: {}
    }
  },

  view_account_position_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'form',
    arch: {
      sheet: {
        _title: {
          display_name: {}
        },
        _group_name: {
          _span: 2,
          name: {},
          chart_template_id: {}
        },

        _group_tax_mapping: {
          _span: 2,
          tax_ids: {
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: {
                  tax_src_id: {
                    // domain="[('type_tax_use', '!=', None)]"
                    domain: [['type_tax_use', '!=', null]]
                  },
                  tax_dest_id: {
                    // domain="[('type_tax_use', '!=', None)]"
                    domain: [['type_tax_use', '!=', null]]
                  }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      tax_src_id: {
                        // domain="[('type_tax_use', '!=', 'none')]"
                        domain: [['type_tax_use', '!=', 'none']]
                      },
                      tax_dest_id: {
                        // domain="[('type_tax_use', '!=', 'none')]"
                        domain: [['type_tax_use', '!=', 'none']]
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
                  account_src_id: {},
                  account_dest_id: {}
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      account_src_id: {},
                      account_dest_id: {}
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

  view_account_position_template_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position.template',
    type: 'search',
    arch: {
      fields: { name: {} }
    }
  },

  action_account_fiscal_position_template: {
    _odoo_model: 'ir.actions',
    name: 'Fiscal Position Templates',
    type: 'ir.actions.act_window',
    res_model: 'account.fiscal.position.template',
    search_view_id: 'view_account_position_template_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_position_template_tree',
      form: 'view_account_position_template_form'
    }
  }
}