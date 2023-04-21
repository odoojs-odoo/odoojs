export default {
  account_invoice_groupby_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_account_invoice_filter',
    arch: {
      sheet: {
        invoice_user_id: {
          position: 'after',
          __todo__after: {
            team_id: {}
          }
        },
        _xpath: {
          _attr: {
            expr: "//group/filter[@name='status']",
            position: 'after'
          },
          _filter_sales_channel: {
            _attr: {
              name: 'sales_channel',
              string: 'Sales Team',
              domain: [],
              context: { group_by: 'team_id' }
            }
          }
        }
      }
    }
  },

  account_invoice_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        invoice_user_id: {
          position: 'after',
          __todo__after: {
            team_id: {
              invisible: "context.get['default_move_type'] not in ['out_invoice', 'out_refund','out_receipt']",
              optional: 'hide'
            }
          }
        }
      }
    }
  },

  account_invoice_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_move_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='sale_info_group']/field[@name='invoice_user_id']",
            position: 'after'
          },
          team_id: {}
        },
        _xpath_568: {
          _attr: {
            expr: "//group[@id='other_tab_group']",
            position: 'inside'
          },
          _group_utm_link: {
            _attr: {
              name: 'utm_link',
              string: 'Marketing',
              groups: 'base.group_no_one',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund')]]
            },
            campaign_id: {
              create_name_field: 'title',
              always_reload: true
            },
            medium_id: {},
            source_id: {}
          }
        },
        _xpath_206: {
          _attr: {
            expr: "//div[@name='button_box']",
            position: 'inside'
          },
          _button_action_view_source_sale_orders: {
            _attr: {
              name: 'action_view_source_sale_orders',
              type: 'object',
              icon: 'fa-pencil-square-o',
              invisible: ['|', ['sale_order_count', '=', 0], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
              class: 'oe_stat_button'
            },
            sale_order_count: {
              string: 'Sale Orders',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  },

  action_invoice_salesteams: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Invoices',
    res_model: 'account.move',
    search_view_id: 'account.view_account_invoice_filter',
    domain: "[\n            ['state', '=', 'posted'],\n            ['move_type', 'in', ['out_invoice', 'out_refund']]]",
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n                'default_move_type':'out_invoice',\n                'move_type':'out_invoice',\n                'journal_type': 'sale',\n            }\n        " },
    views: {
      tree: 'account.view_move_tree',
      form: '=======todo=========='
    }
  },

  action_invoice_salesteams_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    act_window_id: 'sale.action_invoice_salesteams'
  },

  action_invoice_salesteams_view_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'account.view_move_form',
    act_window_id: 'sale.action_invoice_salesteams'
  }
}
