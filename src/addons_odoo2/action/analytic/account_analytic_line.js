export default {
  view_account_analytic_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        product_uom_category_id: {
          invisible: '1'
        },
        date: {},
        name: {},
        account_id: {},
        plan_id: {},
        currency_id: {
          invisible: '1'
        },
        unit_amount: {},
        product_uom_id: {},
        partner_id: {},
        _field_company_id_864: {
          company_id: {
            groups: 'base.group_multi_company'
          }
        },
        amount: {}
      }
    }
  },

  view_account_analytic_line_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'search',
    arch: {
      name: {},
      date: {},
      account_id: {},
      plan_id: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Date'
        }
      },
      _filter_group_by_analytic_account: {
        _attr: {
          name: 'group_by_analytic_account',
          string: 'Analytic Account',
          context: {
            group_by: 'account_id'
          }
        }
      },
      _filter_group_by_analytic_plan: {
        _attr: {
          name: 'group_by_analytic_plan',
          string: 'Analytic Plan',
          context: {
            group_by: 'plan_id'
          }
        }
      },
      _group_groupby: {
        _attr: {
          name: 'groupby',
          string: 'Group By...'
        },
        _filter_group_date: {
          _attr: {
            name: 'group_date',
            string: 'Date',
            context: {
              group_by: 'date'
            }
          }
        }
      }
    }
  },

  account_analytic_line_action: {
    _odoo_model: 'ir.actions',
    name: 'Gross Margin',
    search_view_id: 'view_account_analytic_line_filter',
    res_model: 'account.analytic.line',
    domain: "[('account_id','=', active_id)]",
    context: {
      todo: "{'search_default_group_date': 1, 'default_account_id': active_id}"
    },
    views: {
      tree: 'view_account_analytic_line_tree',
      form: '=======todo=========='
    }
  },

  view_account_analytic_line_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        _group: {
          _group_analytic_item: {
            _attr: {
              name: 'analytic_item',
              string: 'Analytic Item'
            },
            name: {},
            account_id: {},
            date: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          },
          _group_amount: {
            _attr: {
              name: 'amount',
              string: 'Amount'
            },
            amount: {},
            unit_amount: {},
            product_uom_category_id: {
              invisible: '1'
            },
            product_uom_id: {
              class: 'oe_inline'
            },
            currency_id: {
              invisible: '1'
            }
          }
        }
      }
    }
  },

  view_account_analytic_line_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'otherview',
    arch: {}
  },

  view_account_analytic_line_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'otherview',
    arch: {}
  },

  view_account_analytic_line_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.line',
    type: 'otherview',
    arch: {}
  },

  account_analytic_line_action_entries: {
    _odoo_model: 'ir.actions',
    name: 'Analytic Items',
    search_view_id: 'analytic.view_account_analytic_line_filter',
    res_model: 'account.analytic.line',
    views: {
      tree: 'view_account_analytic_line_tree',
      form: '=======todo=========='
    }
  }
}
