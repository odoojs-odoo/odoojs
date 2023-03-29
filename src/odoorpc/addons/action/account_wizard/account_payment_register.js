export default {
  view_account_payment_register_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.register',
    type: 'form',

    arch: {
      buttons: [
        {
          name: 'action_create_payments',
          string: 'Create Payment',
          type: 'object',
          btn_type: 'primary'
        }
      ],

      sheet: {
        _group_invisible: {
          _span: 2,
          _invisible: 1,
          line_ids: { invisible: 1 },
          can_edit_wizard: { invisible: 1 },
          can_group_payments: { invisible: 1 },
          early_payment_discount_mode: { invisible: 1 },
          payment_type: { invisible: 1 },
          partner_type: { invisible: 1 },
          source_amount: { invisible: 1 },
          source_amount_currency: { invisible: 1 },
          source_currency_id: { invisible: 1 },
          company_id: { invisible: 1 },
          partner_id: { invisible: 1 },
          country_code: { invisible: 1 },

          show_partner_bank_account: { invisible: 1 },
          require_partner_bank_account: { invisible: 1 },
          available_journal_ids: { invisible: 1 },
          available_payment_method_line_ids: { invisible: 1 },
          available_partner_bank_ids: { invisible: 1 },
          company_currency_id: { invisible: 1 },
          hide_writeoff_section: { invisible: 1 }
        },

        _group_1: {
          journal_id: {
            required: '1',
            domain({ record }) {
              // domain="[('id', 'in', available_journal_ids)]")
              const { available_journal_ids } = record
              return [['id', 'in', available_journal_ids]]
            }
          },
          payment_method_line_id: { required: '1' },
          partner_bank_id: {
            //  context="{'default_allow_out_payment': True}"/>
            context: { default_allow_out_payment: true },
            invisible({ record }) {
              // 'invisible': ['|',
              //   ('show_partner_bank_account', '=', False),
              //   '|', ('can_edit_wizard', '=', False),
              //   '&amp;', ('can_group_payments', '=', True),
              //   ('group_payment', '=', False)],
              const {
                show_partner_bank_account,
                can_edit_wizard,
                can_group_payments,
                group_payment
              } = record
              return (
                !show_partner_bank_account ||
                !can_edit_wizard ||
                (can_group_payments && !group_payment)
              )
            },

            readonly({ record }) {
              // 'readonly': [('payment_type', '=', 'inbound')]
              const { payment_type } = record
              return payment_type === 'inbound'
            },

            required({ record }) {
              // 'required': [('require_partner_bank_account', '=', True),
              // ('can_edit_wizard', '=', True), '|',
              // ('can_group_payments', '=', False), ('group_payment', '=', False)],
              const {
                require_partner_bank_account,
                can_edit_wizard,
                can_group_payments,
                group_payment
              } = record
              return (
                require_partner_bank_account &&
                can_edit_wizard &&
                (!can_group_payments || !group_payment)
              )
            }
          },
          group_payment: {
            invisible({ record }) {
              // 'invisible': [('can_group_payments', '=', False)]
              const { can_group_payments } = record
              return !can_group_payments
            }
          }
        },

        _group_2: {
          amount: {
            invisible({ record }) {
              // 'invisible': ['|',
              //   ('can_edit_wizard', '=', False),
              //   '&amp;', ('can_group_payments', '=', True),
              //   ('group_payment', '=', False)]
              const { can_edit_wizard, can_group_payments, group_payment } =
                record
              return !can_edit_wizard || (can_group_payments && !group_payment)
            }
          },
          currency_id: {
            required: '1',
            invisible({ record }) {
              // 'invisible': ['|',
              //   ('can_edit_wizard', '=', False),
              //   '&amp;', ('can_group_payments', '=', True),
              //   ('group_payment', '=', False)]
              const { can_edit_wizard, can_group_payments, group_payment } =
                record
              return !can_edit_wizard || (can_group_payments && !group_payment)
            }
          },

          payment_date: {},
          communication: {
            invisible({ record }) {
              // 'invisible': ['|',
              //   ('can_edit_wizard', '=', False),
              //   '&amp;', ('can_group_payments', '=', True),
              //   ('group_payment', '=', False)]
              const { can_edit_wizard, can_group_payments, group_payment } =
                record
              return !can_edit_wizard || (can_group_payments && !group_payment)
            }
          }
        },

        _group_3: {
          _invisible({ record }) {
            // 'invisible': ['|',
            // ('payment_difference', '=', 0.0),
            // '|', ('can_edit_wizard', '=', False),
            // '&amp;', ('can_group_payments', '=', True),
            // ('group_payment', '=', False)]}">
            const {
              payment_difference,
              can_edit_wizard,
              can_group_payments,
              group_payment
            } = record
            return (
              !payment_difference ||
              !can_edit_wizard ||
              (can_group_payments && !group_payment)
            )
          },
          payment_difference: {},
          payment_difference_handling: { widget: 'radio' },
          writeoff_account_id: {
            invisible({ record }) {
              // 'invisible': [
              // '|', ('hide_writeoff_section', '=', True),
              //   ('payment_difference_handling','=','open')]}">
              const { hide_writeoff_section, payment_difference_handling } =
                record
              return (
                hide_writeoff_section || payment_difference_handling === 'open'
              )
            },
            required({ record }) {
              // 'required':
              //   [('payment_difference_handling', '=', 'reconcile'),
              //   ('early_payment_discount_mode', '=', False)]}"/>
              const {
                payment_difference_handling,
                early_payment_discount_mode
              } = record
              return (
                payment_difference_handling === 'reconcile' &&
                !early_payment_discount_mode
              )
            }
          },
          writeoff_label: {
            invisible({ record }) {
              // 'invisible': [
              // '|', ('hide_writeoff_section', '=', True),
              //   ('payment_difference_handling','=','open')]}">
              const { hide_writeoff_section, payment_difference_handling } =
                record
              return (
                hide_writeoff_section || payment_difference_handling === 'open'
              )
            },
            required({ record }) {
              // 'required':
              //   [('payment_difference_handling', '=', 'reconcile')]
              const { payment_difference_handling } = record
              return payment_difference_handling === 'reconcile'
            }
          }
        }
      }
    }
  },

  action_payment_register_wizard: {
    _odoo_model: 'ir.actions',
    name: 'Register Payment',
    type: 'ir.actions.act_window',
    res_model: 'account.payment.register',
    domain: [],

    context: {
      active_model: 'account.move'
    },
    views: {
      form: 'view_account_payment_register_form'
    }
  }
}
