export default {
  view_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    arch: {
      sheet: {
        // _header: {
        //   _button_action_register_payment: {
        //     _attr: {
        //       name: 'action_register_payment',
        //       type: 'object',
        //       string: 'Register Payment',
        //       groups: 'account.group_account_user',
        //       invisible:
        //         "context.get['default_move_type'] not in ['out_invoice', 'out_refund', 'out_receipt', 'in_invoice', 'in_refund','in_receipt']"
        //     }
        //   }
        // },
        made_sequence_hole: { invisible: 1 },
        name: {},
        _col_invoice_partner_display_name__vendor: {
          name: 'invoice_partner_display_name',
          string: 'Vendor',
          groups: 'base.group_user',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'in_invoice', 'in_refund','in_receipt')"
            // string="Vendor" />

            const default_move_type = context.default_move_type
            const move_types_in = ['in_invoice', 'in_refund', 'in_receipt']

            return !move_types_in.includes(default_move_type)
          }
        },
        _col_invoice_partner_display_name__customer: {
          name: 'invoice_partner_display_name',
          string: 'Customer',
          groups: 'base.group_user',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'out_invoice', 'out_refund','out_receipt')" groups="base.group_user"
            const default_move_type = context.default_move_type
            const move_types_out = ['out_invoice', 'out_refund', 'out_receipt']
            return !move_types_out.includes(default_move_type)
          }
        },

        _col_invoice_date__vendor: {
          optional: 'show',
          name: 'invoice_date',
          string: 'Bill Date',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'in_invoice', 'in_refund','in_receipt')"
            const default_move_type = context.default_move_type
            const move_types_in = ['in_invoice', 'in_refund', 'in_receipt']
            return !move_types_in.includes(default_move_type)
          }
        },

        _col_invoice_date__customer: {
          optional: 'show',
          name: 'invoice_date',
          string: 'Invoice Date',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'out_invoice', 'out_refund','out_receipt')" groups="base.group_user"
            const default_move_type = context.default_move_type
            const move_types_out = ['out_invoice', 'out_refund', 'out_receipt']
            return !move_types_out.includes(default_move_type)
          }
        },

        date: { optional: 'hide' },
        invoice_date_due: {
          optional: 'show',
          widget: 'remaining_days',
          invisible({ record }) {
            // 'invisible': [['payment_state', 'in', (
            // 'paid', 'in_payment', 'reversed')]]
            const { payment_state } = record
            return ['paid', 'in_payment', 'reversed'].includes(payment_state)
          }
        },
        invoice_origin: { optional: 'hide' },
        payment_reference: {
          optional: 'hide',
          invisible({ context }) {
            // invisible="context.get('default_move_type') in ('out_invoice', 'out_refund','out_receipt')"
            const default_move_type = context.default_move_type
            return ['out_invoice', 'out_refund', 'out_receipt'].includes(
              default_move_type
            )
          }
        },
        ref: { optional: 'hide' },
        invoice_user_id: {
          optional: 'hide',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'out_invoice', 'out_refund','out_receipt')"
            const move_types = ['out_invoice', 'out_refund', 'out_receipt']
            const default_move_type = context.default_move_type
            return !move_types.includes(default_move_type)
          },

          widget: 'many2one_avatar_user'
        },
        // activity_ids: { widget: 'list_activity', optional: 'show' },
        company_id: { optional: 'hide' },
        amount_untaxed_signed: { string: 'Tax Excluded', optional: 'show' },
        amount_tax_signed: { string: 'Tax', optional: 'hide' },
        amount_total_signed: { string: 'Total', optional: 'show' },
        amount_total_in_currency_signed: {
          string: 'Total in Currency',
          optional: 'show'
        },
        amount_residual_signed: { string: 'Amount Due', optional: 'hide' },
        currency_id: { optional: 'hide' },
        company_currency_id: { invisible: '1' },
        to_check: { widget: 'boolean_toggle', optional: 'hide' },
        payment_state: {
          optional: 'show',
          widget: 'badge',
          // decoration-danger="payment_state == 'not_paid'"
          // decoration-warning="payment_state in ('partial', 'in_payment')"
          // decoration-success="payment_state in ('paid', 'reversed')"

          invisible({ record }) {
            // 'invisible': [('payment_state', 'in', ('invoicing_legacy'))]
            const { payment_state } = record
            return ['invoicing_legacy'].includes(payment_state)
          }
        },
        state: {
          widget: 'badge',
          optional: 'show'
          // decoration-success="state == 'posted'"
          // decoration-info="state == 'draft'"
        },

        move_type: {
          invisible({ context }) {
            // invisible="context.get('default_move_type', True)"
            return context.default_move_type
          }
        }
      }
    }
  },

  view_account_invoice_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Invoice',
          filter_domain: self => {
            return [
              '|',
              '|',
              '|',
              '|',
              ['name', 'ilike', self],
              ['invoice_origin', 'ilike', self],
              ['ref', 'ilike', self],
              ['payment_reference', 'ilike', self],
              ['partner_id', 'ilike', self]
            ]
          }
        },
        journal_id: {},
        partner_id: { operator: 'child_of' },
        invoice_user_id: {
          string: 'Salesperson',
          domain: [['share', '=', false]]
        }
        // date:{ string: 'Period' },
        // line_ids: {string: 'Invoice Line'}
      },
      filters: {
        group_me: {
          myinvoices: {
            name: 'myinvoices',
            help: 'My Invoices',
            domain: ({ env }) => {
              // domain="[('invoice_user_id', '=', uid)]"
              const uid = env.uid
              return [['invoice_user_id', '=', uid]]
            }
          }
        },

        group_state: {
          __title: 'state',
          draft: {
            name: 'draft',
            string: 'Draft',
            domain: [['state', '=', 'draft']]
          },
          posted: {
            name: 'posted',
            string: 'Posted',
            domain: [['state', '=', 'posted']]
          },
          cancel: {
            name: 'cancel',
            string: 'Cancelled',
            domain: [['state', '=', 'cancel']]
          }
        },
        group_to_check: {
          __title: 'to_check',
          to_check: {
            name: 'to_check',
            string: 'To Check',
            domain: [['to_check', '=', true]]
          }
        },
        group_payment: {
          __title: 'payment_state',
          open: {
            name: 'open',
            string: 'Unpaid',
            domain: [
              ['state', '=', 'posted'],
              ['payment_state', 'in', ['not_paid', 'partial']]
            ]
          },
          closed: {
            name: 'closed',
            string: 'Paid',
            domain: [
              ['state', '=', 'posted'],
              ['payment_state', 'in', ['in_payment', 'paid']]
            ]
          },
          late: {
            name: 'late',
            string: 'Overdue',
            domain: ({ env }) => {
              return [
                ['invoice_date_due', '<', env.date_tools.today],
                ['state', '=', 'posted'],
                ['payment_state', 'in', ['not_paid', 'partial']]
              ]
            }
          }
        },
        group_date: {
          invoice_date: {
            name: 'invoice_date',
            string: 'Invoice Date',
            date: 'invoice_date'
          },
          date: {
            name: 'date',
            string: 'Accounting Date',
            date: 'date',
            invisible: ({ context }) => {
              return ['out_invoice', 'out_refund', 'out_receipt'].includes(
                context.default_move_type
              )
            }
          },
          due_date: {
            name: 'due_date',
            string: 'Due Date',
            date: 'invoice_date_due'
          }
        }
      }
    }
  },

  action_move_out_invoice_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Invoices',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_invoice']],
    context: { default_move_type: 'out_invoice' },
    views: {
      tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  },

  action_move_out_refund_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Credit Notes',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_refund']],
    context: { default_move_type: 'out_refund' },
    views: {
      // tree: 'view_out_credit_note_tree',
      form: 'view_out_invoice_form'
    }
  },

  action_move_in_invoice_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bills',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_invoice']],
    context: { default_move_type: 'in_invoice' },
    views: {
      tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  },

  action_move_in_refund_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Refunds',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_refund']],
    context: { default_move_type: 'in_refund' },
    views: {
      // tree: 'view_in_invoice_refund_tree',
      form: 'view_move_form'
    }
  },

  action_move_out_receipt_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Out Receipts',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'out_receipt']],
    context: { default_move_type: 'out_receipt' },
    views: {
      // tree: 'view_in_invoice_bill_tree',
      form: 'view_move_form'
    }
  },

  action_move_in_receipt_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'In Receipts',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    search_view_id: 'view_account_invoice_filter',
    domain: [['move_type', '=', 'in_receipt']],
    context: { default_move_type: 'in_receipt' },
    views: {
      // tree: 'view_invoice_tree',
      form: 'view_move_form'
    }
  }
}
