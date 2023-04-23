export default {
  view_account_position_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'form',
    arch: {
      sheet: {
        _div_alert: {
          _attr: {
            groups: 'account.group_account_manager',
            invisible({ record }) {
              // 'invisible':
              // [('foreign_vat_header_mode', '=', False)]}">
              const { foreign_vat_header_mode } = record
              return !foreign_vat_header_mode
            }
          },

          _div_action_create_foreign_taxes: {
            _attr: {
              invisible({ record }) {
                // 'invisible':
                // [('foreign_vat_header_mode', '!=', 'templates_found')]}"
                const { foreign_vat_header_mode } = record
                return foreign_vat_header_mode !== 'templates_found'
              },
              text: 'Click'
            },
            _button: {
              _attr: {
                string: 'here',
                type: 'object',
                name: 'action_create_foreign_taxes'
              }
            },
            _span: { _attr: { text: 'to create the taxes for this country.' } }
          },

          _span: {
            _attr: {
              invisible({ record }) {
                // 'invisible':
                //  [('foreign_vat_header_mode', '!=', 'no_template')]
                const { foreign_vat_header_mode } = record
                return foreign_vat_header_mode !== 'no_template'
              },
              text: 'No tax template found for this country. Please install the corresponding localization module.'
            },
            _button: {
              _attr: {
                groups: 'base.group_system',
                string: 'Install new module',
                type: 'action',
                name: 'account.open_account_charts_modules'
              }
            }
          }
        },

        _div_button_box: {
          _attr: { name: 'button_box', class: 'oe_button_box' }
        },

        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _group: {
          _group: {
            // active: { invisible: '1' },
            sequence: { invisible: '1' },
            // company_id: { invisible: '1' },
            states_count: { invisible: '1' },
            company_country_id: { invisible: '1' },
            foreign_vat_header_mode: { invisible: '1' },
            name: {},
            company_id: {}
          },
          _group_name2: {
            auto_apply: {},
            vat_required: {
              invisible: ({ record }) => {
                // 'invisible': [('auto_apply', '!=', True)]
                const { auto_apply } = record
                return !auto_apply
              }
            },
            foreign_vat: {},
            country_group_id: {
              invisible: ({ record }) => {
                // 'invisible': [('auto_apply', '!=', True)]
                const { auto_apply } = record
                return !auto_apply
              }
            },
            country_id: {},
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
              }
            },

            _label_zip_from: {
              for: 'zip_from',
              string: 'Zip Range',
              invisible: ({ record }) => {
                // invisible: [
                //   '|',
                //   ['auto_apply', '!=', true],
                //   ['country_id', '=', false]
                // ]
                const { auto_apply, country_id } = record
                return !auto_apply || !country_id
              }
            },

            _div_zip: {
              _attr: {
                invisible: ({ record }) => {
                  // invisible: [
                  //   '|',
                  //   ['auto_apply', '!=', true],
                  //   ['country_id', '=', false]
                  // ]
                  const { auto_apply, country_id } = record
                  return !auto_apply || !country_id
                }
              },

              _span: 'From',
              zip_from: {},
              _div: {
                _attr: { class: 'oe_edit_only' }
              },
              _span_to: 'To ',
              zip_to: {}
            }
          }
        },

        _notebook: {
          _page_tax_mapping: {
            _attr: { name: 'tax_mapping', string: 'Tax Mapping' },
            tax_ids: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      tax_src_id: {},
                      tax_dest_id: {}
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _group_name: {
                        tax_src_id: {},
                        tax_dest_id: {}
                      }
                    }
                  }
                }
              }
            }
          },
          _page_account_mapping: {
            _attr: { name: 'account_mapping', string: 'Account Mapping' },
            account_ids: {
              widget: 'x2many_tree',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      account_src_id: {},
                      account_dest_id: {}
                    }
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
        },

        note: { placeholder: 'Legal Notes...' }
      }
    }
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

  view_account_position_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  action_account_fiscal_position_form: {
    _odoo_model: 'ir.actions.act_window',
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
  }
}
