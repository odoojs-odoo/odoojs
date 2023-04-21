export default {
  payment_transaction_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    type: 'form',
    arch: {
      header: {
        _button_action_capture: {
          _attr: {
            name: 'action_capture',
            type: 'object',
            string: 'Capture Transaction',
            states: 'authorized',
            class: 'oe_highlight'
          }
        },
        _button_action_void: {
          _attr: {
            name: 'action_void',
            type: 'object',
            string: 'Void Transaction',
            states: 'authorized'
          }
        },
        state: { widget: 'statusbar' }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_view_refunds: {
            _attr: {
              name: 'action_view_refunds',
              type: 'object',
              icon: 'fa-money',
              invisible: [['refunds_count', '=', 0]],
              class: 'oe_stat_button'
            },
            refunds_count: {
              string: 'Refunds',
              widget: 'statinfo'
            }
          }
        },
        _group: {
          _group_transaction_details: {
            _attr: { name: 'transaction_details' },
            reference: {},
            source_transaction_id: { invisible: [['source_transaction_id', '=', false]] },
            amount: {},
            fees: { invisible: [['fees', '=', 0.0]] },
            currency_id: { invisible: '1' },
            provider_id: {},
            company_id: { groups: 'base.group_multi_company' },
            provider_code: { invisible: '1' },
            provider_reference: {},
            token_id: { invisible: [['token_id', '=', false]] },
            create_date: {},
            last_state_change: {}
          },
          _group_transaction_partner: {
            _attr: { name: 'transaction_partner' },
            partner_id: { widget: 'res_partner_many2one' },
            _label_partner_address: {
              for: 'partner_address',
              string: 'Address'
            },
            _div: {
              _attr: { class: 'o_address_format' },
              partner_address: {
                class: 'o_address_street',
                placeholder: 'Address'
              },
              partner_city: {
                class: 'o_address_city',
                placeholder: 'City'
              },
              partner_state_id: {
                class: 'o_address_state',
                placeholder: 'State',
                no_open: true
              },
              partner_zip: {
                class: 'o_address_zip',
                placeholder: 'ZIP'
              },
              partner_country_id: {
                class: 'o_address_country',
                placeholder: 'Country',
                no_open: true
              }
            },
            partner_email: { widget: 'email' },
            partner_phone: { widget: 'phone' },
            partner_lang: {}
          }
        },
        _group_414: {
          _attr: {
            string: 'Message',
            invisible: [['state_message', '=', false]]
          },
          state_message: {}
        }
      }
    }
  },

  payment_transaction_list: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    type: 'tree',
    arch: {
      sheet: {
        reference: {},
        create_date: {},
        provider_id: {},
        partner_id: {},
        partner_name: {},
        currency_id: { invisible: '1' },
        amount: {},
        fees: {},
        state: {},
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        }
      }
    }
  },

  payment_transaction_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    type: 'otherview',
    arch: {}
  },

  payment_transaction_search: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.transaction',
    type: 'search',
    arch: {
      reference: {},
      provider_id: {},
      partner_id: {},
      partner_name: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_provider_id: {
          _attr: {
            name: 'provider_id',
            string: 'Provider',
            context: { group_by: 'provider_id' }
          }
        },
        _filter_partner_id: {
          _attr: {
            name: 'partner_id',
            string: 'Partner',
            context: { group_by: 'partner_id' }
          }
        },
        _filter_state: {
          _attr: {
            name: 'state',
            string: 'Status',
            context: { group_by: 'state' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            context: { group_by: 'company_id' }
          }
        }
      }
    }
  },

  action_payment_transaction: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Transactions',
    res_model: 'payment.transaction',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_payment_transaction_linked_to_token: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Transactions Linked To Token',
    res_model: 'payment.transaction',
    search_view_id: 'tooooooodoooooo',
    domain: "[['token_id','=', active_id]]",
    context: { create: false },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
