export default {
  view_account_payment_register_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.payment.register',
    type: 'form',
    arch: {
      sheet: {
        line_ids: {
          invisible: '1'
        },
        can_edit_wizard: {
          invisible: '1',
          force_save: '1'
        },
        can_group_payments: {
          invisible: '1',
          force_save: '1'
        },
        early_payment_discount_mode: {
          invisible: '1',
          force_save: '1'
        },
        payment_type: {
          invisible: '1',
          force_save: '1'
        },
        partner_type: {
          invisible: '1',
          force_save: '1'
        },
        source_amount: {
          invisible: '1',
          force_save: '1'
        },
        source_amount_currency: {
          invisible: '1',
          force_save: '1'
        },
        source_currency_id: {
          invisible: '1',
          force_save: '1'
        },
        company_id: {
          invisible: '1',
          force_save: '1'
        },
        partner_id: {
          invisible: '1',
          force_save: '1'
        },
        country_code: {
          invisible: '1',
          force_save: '1'
        },
        show_partner_bank_account: {
          invisible: '1'
        },
        require_partner_bank_account: {
          invisible: '1'
        },
        available_journal_ids: {
          invisible: '1'
        },
        available_payment_method_line_ids: {
          invisible: '1'
        },
        available_partner_bank_ids: {
          invisible: '1'
        },
        company_currency_id: {
          invisible: '1'
        },
        hide_writeoff_section: {
          invisible: '1'
        },
        _div: {
          _attr: {
            invisible: [['hide_writeoff_section', '=', false]],
            class: 'alert alert-info'
          },
          _p: {
            _b: 'Early Payment Discount applied.'
          }
        },
        _group: {
          _group_group1: {
            _attr: {
              name: 'group1'
            },
            journal_id: {
              no_open: true,
              no_create: true
            },
            payment_method_line_id: {
              no_create: true,
              no_open: true
            },
            partner_bank_id: {
              invisible: ['|', ['show_partner_bank_account', '=', false], '|', ['can_edit_wizard', '=', false], '&', ['can_group_payments', '=', true], ['group_payment', '=', false]],
              required: [['require_partner_bank_account', '=', true], ['can_edit_wizard', '=', true], '|', ['can_group_payments', '=', false], ['group_payment', '=', false]],
              readonly: [['payment_type', '=', 'inbound']],
              context: {
                default_allow_out_payment: true
              }
            },
            group_payment: {
              invisible: [['can_group_payments', '=', false]]
            }
          },
          _group_group2: {
            _attr: {
              name: 'group2'
            },
            _label_amount: {
              for: 'amount',
              invisible: ['|', ['can_edit_wizard', '=', false], '&', ['can_group_payments', '=', true], ['group_payment', '=', false]]
            },
            _div_amount_div: {
              _attr: {
                name: 'amount_div',
                invisible: ['|', ['can_edit_wizard', '=', false], '&', ['can_group_payments', '=', true], ['group_payment', '=', false]],
                class: 'o_row'
              },
              amount: {},
              currency_id: {
                groups: 'base.group_multi_currency',
                no_create: true,
                no_open: true
              }
            },
            payment_date: {},
            communication: {
              invisible: ['|', ['can_edit_wizard', '=', false], '&', ['can_group_payments', '=', true], ['group_payment', '=', false]]
            }
          },
          _group_group3: {
            _attr: {
              name: 'group3',
              invisible: ['|', ['payment_difference', '=', 0.0], '|', ['can_edit_wizard', '=', false], '&', ['can_group_payments', '=', true], ['group_payment', '=', false]]
            },
            _label_payment_difference: {
              for: 'payment_difference'
            },
            _div: {
              payment_difference: {},
              payment_difference_handling: {
                widget: 'radio'
              },
              _div: {
                _attr: {
                  invisible: ['|', ['hide_writeoff_section', '=', true], ['payment_difference_handling', '=', 'open']]
                },
                _label_writeoff_account_id: {
                  for: 'writeoff_account_id',
                  string: 'Post Difference In',
                  class: 'oe_edit_only'
                },
                writeoff_account_id: {
                  string: 'Post Difference In',
                  required: [['payment_difference_handling', '=', 'reconcile'], ['early_payment_discount_mode', '=', false]],
                  no_create: true
                },
                _label_writeoff_label: {
                  for: 'writeoff_label',
                  string: 'Label',
                  class: 'oe_edit_only'
                },
                writeoff_label: {
                  required: [['payment_difference_handling', '=', 'reconcile']]
                }
              }
            }
          }
        },
        _footer: {
          _button_action_create_payments: {
            _attr: {
              name: 'action_create_payments',
              string: 'Create Payment',
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn btn-secondary'
            }
          }
        }
      }
    }
  }
}
