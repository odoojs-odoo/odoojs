export default {
  view_account_analytic_account_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_%(account_analytic_line_action)d: {
            _attr: {
              name: '%(account_analytic_line_action)d',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: {
                class: 'o_form_field o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Gross Margin'
                }
              },
              _span_643: {
                _attr: {
                  class: 'o_stat_value'
                },
                balance: {
                  widget: 'monetary'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: "[('active', '=', True)]",
            title: 'Archived',
            bg_color: 'bg-danger'
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              class: 'oe_inline',
              placeholder: 'e.g. Project XYZ'
            }
          }
        },
        _div_project: {
          _attr: {
            name: 'project'
          }
        },
        _group_main: {
          _attr: {
            name: 'main'
          },
          _group: {
            active: {
              invisible: '1'
            },
            partner_id: {},
            code: {}
          },
          _group_786: {
            plan_id: {
              no_quick_create: True
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: True
            },
            currency_id: {
              groups: 'base.group_multi_currency',
              no_create: True
            }
          }
        }
      }
    }
  },

  view_account_analytic_account_list: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        name: {
          string: 'Name'
        },
        code: {},
        partner_id: {},
        plan_id: {},
        active: {
          invisible: '1'
        },
        _field_company_id_850: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        },
        debit: {},
        credit: {},
        balance: {}
      }
    }
  },

  view_account_analytic_account_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'otherview',
    arch: {}
  },

  view_account_analytic_account_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    type: 'search',
    arch: {
      name: {
        string: 'Analytic Account'
      },
      partner_id: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      },
      _group: {
        _attr: {
          string: 'Group By...'
        },
        _filter_associatedpartner: {
          _attr: {
            name: 'associatedpartner',
            string: 'Associated Partner',
            domain: "[]",
            context: {
              group_by: 'partner_id'
            }
          }
        }
      }
    }
  },

  action_analytic_account_form: {
    _odoo_model: 'ir.actions',
    name: 'Chart of Analytic Accounts',
    search_view_id: 'view_account_analytic_account_search',
    res_model: 'account.analytic.account',
    context: {
      search_default_active: 1
    },
    views: {
      tree: 'view_account_analytic_account_list',
      form: '=======todo=========='
    }
  },

  action_account_analytic_account_form: {
    _odoo_model: 'ir.actions',
    name: 'Analytic Accounts',
    type: 'ir.actions.act_window',
    search_view_id: 'view_account_analytic_account_search',
    res_model: 'account.analytic.account',
    context: {
      search_default_active: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
