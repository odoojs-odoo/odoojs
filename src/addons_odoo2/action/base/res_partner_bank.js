export default {
  view_partner_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'form',
    arch: {
      sheet: {
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _group: {
          _group: {
            sequence: {
              invisible: '1'
            },
            acc_type: {
              invisible: '1'
            },
            acc_number: {},
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            partner_id: {},
            acc_holder_name: {}
          },
          _group_144: {
            bank_id: {},
            currency_id: {
              groups: 'base.group_multi_currency',
              no_create: true
            },
            allow_out_payment: {
              widget: 'boolean_toggle'
            },
            active: {
              invisible: '1'
            }
          }
        }
      }
    }
  },

  view_partner_bank_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        acc_number: {},
        bank_name: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        partner_id: {},
        acc_holder_name: {
          invisible: '1'
        },
        allow_out_payment: {
          widget: 'boolean_toggle'
        }
      }
    }
  },

  view_partner_bank_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'search',
    arch: {
      bank_name: {
        string: 'Bank Name',
        filter_domain: {
          todo_ctx: "['|', ('bank_name','ilike',self), ('acc_number','ilike',self)]"
        }
      },
      company_id: {
        invisible: "context.get['company_hide', True]"
      },
      partner_id: {}
    }
  },

  action_res_partner_bank_account_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bank Accounts',
    res_model: 'res.partner.bank',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}
