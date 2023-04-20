const view_move_form_sheet = {
  _div_button_box: {
    _button_action_view_source_sale_orders: {
      _attr: {
        name: 'action_view_source_sale_orders',
        type: 'object',
        icon: 'fa-pencil-square-o',
        // invisible: [
        //   '|',
        //   ['sale_order_count', '=', 0],
        //   [
        //     'move_type',
        //     'not in',
        //     ('out_invoice',
        //     'out_refund',
        //     'in_invoice',
        //     'in_refund',
        //     'out_receipt',
        //     'in_receipt')
        //   ]
        // ],
        class: 'oe_stat_button'
      },
      sale_order_count: { string: 'Sale Orders', widget: 'statinfo' }
    }
  },
  _notebook: {
    _page_other_tab: {
      _group_other_tab_group: {
        _group_sale_info_group: {
          invoice_user_id: {},
          team_id: {}
        },

        _group_accounting_info_group: {},
        _group_utm_link: {
          _attr: {
            name: 'utm_link',
            string: 'Marketing',
            groups: 'base.group_no_one'
            // invisible: [['move_type', 'not in', ('out_invoice', 'out_refund')]]
          },
          campaign_id: {
            create_name_field: 'title',
            always_reload: true
          },
          medium_id: {},
          source_id: {}
        }
      }
    }
  }
}
export default {
  account_invoice_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        invoice_user_id: {},
        team_id: {
          optional: 'hide',
          invisible({ context }) {
            // invisible:
            // "context.get['default_move_type'] not in
            // ['out_invoice', 'out_refund','out_receipt']"
            return !['out_invoice', 'out_refund', 'out_receipt'].includes(
              context.default_move_type
            )
          }
        }
      }
    }
  },

  account_invoice_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    inherit_id: 'account.view_move_form',

    arch: {
      sheet: { ...view_move_form_sheet }
    }
  },

  action_invoice_salesteams: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Invoices',
    res_model: 'account.move',
    search_view_id: 'account.view_account_invoice_filter',
    domain: [
      ['state', '=', 'posted'],
      ['move_type', 'in', ['out_invoice', 'out_refund']]
    ],
    context: {
      // todo_ctx:
      // {
      //  'search_default_team_id': [active_id],
      //  'default_team_id': active_id,
      //  'default_move_type':'out_invoice',
      //  'move_type':'out_invoice',
      //  'journal_type': 'sale',
      // }\n        "
    },
    views: {
      tree: 'account.view_move_tree',
      form: 'account.view_move_form'
    }
  }
}
