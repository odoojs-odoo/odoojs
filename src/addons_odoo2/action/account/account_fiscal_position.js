export default {
  view_account_position_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            groups: 'account.group_account_manager',
            invisible: [['foreign_vat_header_mode', '=', false]],
            class: 'alert alert-info mb-0'
          },
          _div: {
            _attr: {
              invisible: [['foreign_vat_header_mode', '!=', 'templates_found']],
              text: ['Click', 'to create the taxes for this country.']
            },
            _button_action_create_foreign_taxes: {
              _attr: {
                name: 'action_create_foreign_taxes',
                type: 'object',
                string: 'here',
                class: 'oe_link'
              }
            }
          },
          _span: {
            _attr: {
              invisible: [['foreign_vat_header_mode', '!=', 'no_template']],
              text: 'No tax template found for this country. Please install the corresponding localization module.'
            },
            _button_count__open_account_charts_modul: {
              _attr: {
                name: 'count.open_account_charts_modul',
                type: 'action',
                string: 'Install new module',
                groups: 'base.group_system',
                class: 'oe_link'
              }
            }
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group: {
            active: { invisible: '1' },
            company_id: { invisible: '1' },
            states_count: { invisible: '1' },
            company_country_id: { invisible: '1' },
            foreign_vat_header_mode: { invisible: '1' },
            name: {},
            _field_company_id_112: {
              company_id: {
                groups: 'base.group_multi_company',
                no_create: true
              }
            }
          },
          _group_207: {
            auto_apply: {},
            vat_required: { invisible: [['auto_apply', '!=', true]] },
            foreign_vat: {},
            country_group_id: { invisible: [['auto_apply', '!=', true]] },
            country_id: {
              required: [['foreign_vat', '!=', false]],
              no_open: true,
              no_create: true
            },
            state_ids: {
              widget: 'many2many_tags',
              domain: { todo_ctx: "[('country_id', '=', country_id)]" },
              invisible: ['|', '|', '&', ['auto_apply', '!=', true], ['foreign_vat', '=', false], ['country_id', '=', false], ['states_count', '=', 0]]
            },
            _label_zip_from: {
              for: 'zip_from',
              string: 'Zip Range',
              invisible: ['|', ['auto_apply', '!=', true], ['country_id', '=', false]]
            },
            _div: {
              _attr: { invisible: ['|', ['auto_apply', '!=', true], ['country_id', '=', false]] },
              _span: 'From',
              zip_from: { class: 'oe_inline' },
              _div: {
                _attr: { class: 'oe_edit_only' }
              },
              _span_577: 'To',
              zip_to: { class: 'oe_inline' }
            }
          }
        },
        _notebook: {
          _page_tax_mapping: {
            _attr: {
              name: 'tax_mapping',
              string: 'Tax Mapping'
            },
            tax_ids: {
              widget: 'one2many',
              context: { append_type_to_tax_name: true },
              views: {
                todoview___tree_tax_map_tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        name: 'tax_map_tree',
                        string: 'Tax Mapping'
                      },
                      tax_src_id: {
                        domain: { todo_ctx: "[                                             ('type_tax_use', '!=', 'none'),                                             ('country_id', '=', parent.company_country_id),                                             '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)                                         ]" },
                        context: { append_type_to_tax_name: true }
                      },
                      tax_dest_id: {
                        domain: { todo_ctx: "[                                             ('type_tax_use', '!=', 'none'),                                             ('country_id', '=', parent.country_id if parent.foreign_vat else parent.company_country_id),                                             '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
                        context: { append_type_to_tax_name: true }
                      }
                    }
                  }
                },
                todoview___form_tax_map_form: {
                  arch: {
                    sheet: {
                      _attr: {
                        name: 'tax_map_form',
                        string: 'Tax Mapping'
                      },
                      _group: {
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
                }
              }
            }
          },
          _page_account_mapping: {
            _attr: {
              name: 'account_mapping',
              string: 'Account Mapping',
              groups: 'account.group_account_readonly'
            },
            account_ids: {
              widget: 'one2many',
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Account Mapping' },
                      account_src_id: {
                        domain: { todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" }
                      },
                      account_dest_id: {
                        domain: { todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" }
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Account Mapping' },
                      account_src_id: {
                        domain: { todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" }
                      },
                      account_dest_id: {
                        domain: { todo_ctx: "['|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        note: {
          class: 'oe-bordered-editor',
          placeholder: 'Legal Notes...'
        }
      }
    }
  },

  view_account_position_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.fiscal.position',
    type: 'search',
    arch: {
      name: { string: 'Fiscal Position' },
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Archived',
          domain: [['active', '=', false]]
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
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        }
      }
    }
  },

  action_account_fiscal_position_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Fiscal Positions',
    res_model: 'account.fiscal.position',
    search_view_id: 'view_account_position_filter',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
