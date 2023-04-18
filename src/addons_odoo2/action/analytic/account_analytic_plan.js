export default {
  account_analytic_plan_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
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
          _button_action_view_children_plans: {
            _attr: {
              name: 'action_view_children_plans',
              type: 'object',
              icon: 'fa-bars',
              class: 'oe_stat_button'
            },
            children_count: {
              string: 'Subplans',
              widget: 'statinfo'
            }
          },
          _button_action_view_analytical_accounts: {
            _attr: {
              name: 'action_view_analytical_accounts',
              type: 'object',
              icon: 'fa-bars',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_value'
                },
                all_account_count: {}
              },
              _span_439: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Analytic Accounts'
                }
              }
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {}
          }
        },
        _group: {
          _group: {
            parent_id: {},
            default_applicability: {
              invisible: [['parent_id', '!=', false]]
            },
            color: {
              widget: 'color_picker'
            }
          },
          _group_919: {
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        },
        _notebook: {
          _page_applicability: {
            _attr: {
              name: 'applicability',
              string: 'Applicability',
              invisible: [['parent_id', '!=', false]]
            },
            applicability_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      business_domain: {},
                      applicability: {}
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

  account_analytic_plan_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.plan',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        default_applicability: {},
        color: {
          widget: 'color_picker'
        },
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  account_analytic_plan_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Analytic Plans',
    res_model: 'account.analytic.plan',
    domain: "[['parent_id', '=', False]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
