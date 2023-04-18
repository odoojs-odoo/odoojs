export default {
  payment_token_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.token',
    type: 'form',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_payment_transaction_linked_to_token: {
            _attr: {
              name: 'action_payment_transaction_linked_to_token',
              type: 'action',
              string: 'Payments',
              icon: 'fa-money',
              class: 'oe_stat_button'
            }
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
          _group_general_information: {
            _attr: {
              name: 'general_information'
            },
            payment_details: {},
            partner_id: {}
          },
          _group_technical_information: {
            _attr: {
              name: 'technical_information'
            },
            provider_id: {},
            provider_ref: {},
            company_id: {
              groups: 'base.group_multi_company'
            }
          }
        }
      }
    }
  },

  payment_token_list: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.token',
    type: 'tree',
    arch: {
      sheet: {
        payment_details: {},
        partner_id: {},
        provider_id: {
          readonly: '1'
        },
        provider_ref: {
          readonly: '1'
        },
        company_id: {
          groups: 'base.group_multi_company',
          optional: 'show'
        }
      }
    }
  },

  payment_token_search: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.token',
    type: 'search',
    arch: {
      partner_id: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_provider_id: {
          _attr: {
            name: 'provider_id',
            string: 'Provider',
            context: {
              group_by: 'provider_id'
            }
          }
        },
        _filter_partner_id: {
          _attr: {
            name: 'partner_id',
            string: 'Partner',
            context: {
              group_by: 'partner_id'
            }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            context: {
              group_by: 'company_id'
            }
          }
        }
      }
    }
  },

  action_payment_token: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Tokens',
    res_model: 'payment.token',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
